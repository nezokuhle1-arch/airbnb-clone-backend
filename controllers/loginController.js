const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Reject incomplete requests: 400 = "your request is malformed"
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user. Same message whether the email or the password is wrong,
        //    so attackers can't discover which emails exist.
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the typed password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Sign the token. The payload is what ends up in req.user.
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send the token plus safe user details. Never send the password hash.
        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };