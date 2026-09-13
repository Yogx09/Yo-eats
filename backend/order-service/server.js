const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yoeats';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI).then(() => {
    console.log('Order Service: Connected to MongoDB');
}).catch(err => console.error('MongoDB connection error:', err));

const OrderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    total: Number,
    status: { type: String, default: 'placed' },
    createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

app.post('/api/orders', async (req, res) => {
    const { items, total, userId } = req.body;
    
    if (!items || items.length === 0) return res.status(400).json({ error: 'Order must contain items' });

    try {
        const newOrder = new Order({ userId: userId || 'guest', items, total });
        await newOrder.save();

        // Call the delivery service
        const deliveryHost = process.env.MONGO_URI ? 'delivery-service' : 'localhost';
        fetch(`http://${deliveryHost}:3004/api/delivery/assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: newOrder._id })
        }).catch(err => console.error("Failed to notify delivery service"));

        res.status(201).json({ message: 'Order placed successfully', order: { id: newOrder._id, ...newOrder.toObject() } });
    } catch (err) {
        res.status(500).json({ error: 'Failed to place order' });
    }
});

app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
});
