const mongoose = require('mongoose');

/**
 * Reservation Schema notes
 * Reservation is a schema that represents a reservation for an accommodation.
 * It contains the accommodation, user, check-in date, check-out date, number of guests, and total cost.
 * @typedef {Object} Reservation
 * @property {ObjectId} accommodation - The accommodation of the reservation.
 * @property {ObjectId} user - The user of the reservation.
 * @property {Date} checkIn - The check-in date of the reservation.
 * @property {Date} checkOut - The check-out date of the reservation.
 * @property {number} guests - The number of guests in the reservation.
 * @property {number} totalCost - The total cost of the reservation.
 */

const reservationSchema = new mongoose.Schema({
    accommodation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodation',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Reservation', reservationSchema);