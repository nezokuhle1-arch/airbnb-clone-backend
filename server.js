require('dotenv').config();

// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing routes
const userRoutes = require('./routes/userRoutes');

// Importing controllers
const accommodationRoutes = require('./routes/accommodationRoutes');

// Initializing express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Mounting routes
app.use('/api/users', userRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.get('/', (req, res) => {
    res.json({message:'Airbnb Clone API is running'});
});

// Start the server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });   
