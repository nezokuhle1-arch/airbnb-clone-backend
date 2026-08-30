require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        await User.deleteMany({});

        const hashedUserPassword = await bcrypt.hash('password123', 10);
        const hashedHostPassword = await bcrypt.hash('password321', 10);

        await User.create([
            {
                username: 'Nezira',
                email: 'nezira@example.com',
                password: hashedUserPassword,
                role: 'user',
            },
            {
                username: 'Max',
                email: 'max@example.com',
                password: hashedHostPassword,
                role: 'host',
            },
        ]);

        console.log('Users seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }

};

seedUsers();