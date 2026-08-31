const express = require('express');
const router = express.Router();
const { createAccommodation } = require('../controllers/accommodationController');
const { getAllAccommodations } = require('../controllers/accommodationController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createAccommodation);
router.get('/', getAllAccommodations);

module.exports = router;