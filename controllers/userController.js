const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        ); // Generate JWT token

        res.status(200).json({ token, username: user.username, role: user.role});
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message});
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Reject incomplete requests
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email and password are required' });
        }

        // 2. Basic password rule
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // 3. Refuse duplicates (the model marks both username and email as unique)
        const existing = await User.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(409).json({ message: 'Username or email already in use' });
        }

        // 4. Hash the password once. The model has no hashing hook, so it happens here.
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create the user. The role is set here, never taken from req.body.
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user',
        });

        // 6. Same token payload as login
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ token, username: user.username, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

module.exports = { login, register };