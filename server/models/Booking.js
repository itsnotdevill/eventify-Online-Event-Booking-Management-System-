const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    seatsBooked: {
        type: Number,
        required: [true, 'Please add number of seats']
    },
    seatNumbers: {
        type: [String], // ['A1', 'A2']
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
