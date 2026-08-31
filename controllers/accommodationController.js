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

const getAllAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find().populate('host', 'username email');
        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get accommodations', error: error.message});
    }
};

const deleteAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);

        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found'});
        }

        if (accommodation.host.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this accommodation'});
        }

        await accommodation.deleteOne();
        res.status(200).json({ message: 'Accommodation deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete accommodation', error: error.message});
    }
};


module.exports = { createAccommodation, getAllAccommodations, deleteAccommodation };