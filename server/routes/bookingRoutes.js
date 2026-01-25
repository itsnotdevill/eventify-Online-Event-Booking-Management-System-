const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getAllBookings
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);
router.get('/', protect, admin, getAllBookings);

module.exports = router;
