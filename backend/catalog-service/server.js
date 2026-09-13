const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yoeats';

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI).then(() => {
    console.log('Catalog Service: Connected to MongoDB');
    seedDatabase();
}).catch(err => console.error('MongoDB connection error:', err));

// Schema & Model
const MenuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    category: String,
    description: String
});
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

// Seed function to populate DB if empty
async function seedDatabase() {
    const count = await MenuItem.countDocuments();
    if (count === 0) {
        const initialData = [
            { name: "Kadai Paneer", price: 199, image: "Kadai Paneer.jpeg", category: "Vegetarian", description: "Spiced and flavorful Indian dish" },
            { name: "Chicken Curry", price: 159, image: "Chicken Curry.jpeg", category: "Non-Vegetarian", description: "Delicious chicken curry" },
            { name: "Rasgulla", price: 79, image: "Rasagulla.jpeg", category: "Desserts", description: "Spongy and sweet dessert" },
            { name: "Vada Pav", price: 59, image: "vadda pav.jpg", category: "Street Food", description: "Mumbai street food" },
            { name: "Pizza", price: 179, image: "Pizza.jpg", category: "Fast Food", description: "Delicious hot pizza" }
        ];
        await MenuItem.insertMany(initialData);
        console.log('Catalog Service: Seeded database with menu items');
    }
}

app.get('/api/menu', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch menu' });
    }
});

app.listen(PORT, () => {
    console.log(`Catalog Service is running on port ${PORT}`);
});
