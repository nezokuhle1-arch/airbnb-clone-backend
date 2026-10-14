const Accommodation = require('../models/Accommodation');

const createAccommodation = async (req, res) => {
    try {
        const newAccommodation = await Accommodation.create({
            ...req.body,
            host: req.user.userId,
        });

        res.status(201).json(newAccommodation);
    } catch (error){
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Invalid listing data', error: error.message});
        }
        res.status(500).json({message: 'Failed to create accommodation'});
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
            return res.status(404).json({ message: 'Accommodation not found' });
        }

        const isOwner = accommodation.host.toString() === req.user.userId;
        const isAdmin = req.user.role === 'admin';
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this listing' });
        }

        await accommodation.deleteOne();
        res.json({ message: 'Accommodation deleted' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid accommodation id' });
        }
        res.status(500).json({ message: 'Failed to delete accommodation' });
    }
};

const updateAccommodation = async (req, res) => {
    try {
        // 1. Find first
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }

        // 2. Check ownership. Admins may edit any listing.
        const isOwner = accommodation.host.toString() === req.user.userId;
        const isAdmin = req.user.role === 'admin';
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Not authorized to modify this listing' });
        }

        // 3. Never let the client reassign the host
        delete req.body.host;

        // 4. Act
        const updated = await Accommodation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updated);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid accommodation id' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Failed to update accommodation' });
    }
};

const getAccommodationById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id).populate('host', 'username email');

        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found'});
        }

        res.status(200).json(accommodation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get accommodation', error: error.message});
    }
};

module.exports = { createAccommodation, getAllAccommodations, deleteAccommodation, updateAccommodation, getAccommodationById };