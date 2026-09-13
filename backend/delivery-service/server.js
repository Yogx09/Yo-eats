const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yoeats';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI).then(() => {
    console.log('Delivery Service: Connected to MongoDB');
}).catch(err => console.error('MongoDB connection error:', err));

const DeliverySchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    status: { type: String, default: 'Preparing' },
    driver: String,
    estimatedTime: String
});
const Delivery = mongoose.model('Delivery', DeliverySchema);

app.post('/api/delivery/assign', async (req, res) => {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ error: 'orderId required' });
    
    try {
        const delivery = new Delivery({
            orderId,
            driver: 'John Doe',
            estimatedTime: '30 mins'
        });
        await delivery.save();
        res.json({ message: 'Delivery assigned', delivery });
    } catch (err) {
        res.status(500).json({ error: 'Failed to assign delivery' });
    }
});

app.get('/api/delivery/:orderId', async (req, res) => {
    try {
        const delivery = await Delivery.findOne({ orderId: req.params.orderId });
        if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
        res.json(delivery);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch delivery status' });
    }
});

app.listen(PORT, () => {
    console.log(`Delivery Service is running on port ${PORT}`);
});
