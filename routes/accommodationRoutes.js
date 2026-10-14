const express = require('express');
const router = express.Router();
const { createAccommodation } = require('../controllers/accommodationController');
const { getAllAccommodations } = require('../controllers/accommodationController');
const { deleteAccommodation } = require('../controllers/accommodationController');
const { updateAccommodation } = require('../controllers/accommodationController');
const { getAccommodationById } = require('../controllers/accommodationController');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/roleCheck');

router.post('/', authMiddleware, requireRole('host','admin'), createAccommodation);
router.get('/', getAllAccommodations);
router.delete('/:id', authMiddleware, requireRole('host','admin'), deleteAccommodation);
router.put('/:id', authMiddleware, requireRole('host','admin'), updateAccommodation);
router.get('/:id', getAccommodationById);

module.exports = router;