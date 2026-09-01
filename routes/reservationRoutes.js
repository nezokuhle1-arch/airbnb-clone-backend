const express = require('express');
const router = express.Router();
const { createReservation, getReservationByUser, getReservationByHost, deleteReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createReservation);
router.get('/user', authMiddleware, getReservationByUser);
router.get('/host', authMiddleware, getReservationByHost);
router.delete('/:id', authMiddleware, deleteReservation);

module.exports = router;