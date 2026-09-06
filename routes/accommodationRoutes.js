const express = require('express');
const router = express.Router();
const { createAccommodation } = require('../controllers/accommodationController');
const { getAllAccommodations } = require('../controllers/accommodationController');
const { deleteAccommodation } = require('../controllers/accommodationController');
const { updateAccommodation } = require('../controllers/accommodationController');
const { getAccommodationById } = require('../controllers/accommodationController');
const authMiddleware = require('../middleware/auth');


router.post('/', authMiddleware, createAccommodation);
router.get('/', getAllAccommodations);
router.delete('/:id', authMiddleware, deleteAccommodation);
router.put('/:id', authMiddleware, updateAccommodation);
router.get('/:id', getAccommodationById);

module.exports = router;