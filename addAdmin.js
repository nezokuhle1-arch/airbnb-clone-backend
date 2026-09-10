require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const addAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const hashedAdminPassword = await bcrypt.hash('password456', 10);

        await User.create({
            username: 'Admin',
            email: 'bruno@example.com',
            password: hashedAdminPassword,
            role: 'admin',
        });

        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

addAdmin();