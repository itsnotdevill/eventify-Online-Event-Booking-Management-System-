const bookingService = require('../services/booking.service');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('User not authenticated');
        }
        const booking = await bookingService.createBooking(req.user.id || req.user._id, req.body);
        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking Controller Error:', error.message);
        // Handle specific business logic errors
        if (error.message.includes('Not enough seats') || error.message.includes('Setting availableSeats')) {
            res.status(400);
        }
        next(error);
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await bookingService.getUserBookings(req.user.id);
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getAllBookings
};
