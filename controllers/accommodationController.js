const Accommodation = require('../models/Accommodation');

const createAccommodation = async (req, res) => {
    try {
        const newAccommodation = await Accommodation.create({
            ...req.body,
            host: req.user.userId,
        });

        res.status(201).json(newAccommodation);
    } catch (error){
        res.status(500).json({message: 'Failed to create accommodation', error: error.message});
    }
};

module.exports = { createAccommodation };