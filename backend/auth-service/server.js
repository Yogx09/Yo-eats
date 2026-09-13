const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3003;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yoeats';
const JWT_SECRET = 'supersecretkey123';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI).then(() => {
    console.log('Auth Service: Connected to MongoDB');
}).catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Remember: In production, hash this!
});
const User = mongoose.model('User', UserSchema);

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ error: 'Username already exists' });

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});
