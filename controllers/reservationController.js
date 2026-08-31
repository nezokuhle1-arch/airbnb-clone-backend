const Accommodation = require('../models/Accommodation');
const Reservation = require('../models/Reservation');


const createReservation = async (req, res) => {
    try {
        const newReservation = await Reservation.create({
            ...req.body,
            user: req.user.userId,
        });

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create reservation', error: error.message});
    }
};


const getReservationByUser = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.userId })
            .populate('accommodation', 'title location')
            .populate('user', 'username email');

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get reservations', error: error.message});
    }
};


const getReservationByHost = async (req, res) => {
    try {
        const hostAccommodations = await Accommodation.find({ host: req.user.userId });
        const accommodationIds = hostAccommodations.map((acc) => acc._id);

        const reservations = await Reservation.find({ accommodation: { $in: accommodationIds }})
            .populate('accommodation', 'title location')
            .populate('user', 'username email');

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get reservations', error: error.message});
    }
};


const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if(!reservation) {
            return res.status(404).json({ message: 'Reservation not found'});
        }

        if (reservation.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this reservation'});
        }

        await reservation.deleteOne();
        res.status(200).json({ message: 'Reservation deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete reservation', error: error.message});
    }
};

module.exports = { createReservation, getReservationByUser, getReservationByHost, deleteReservation };
