const Booking = require('../models/Booking');
const Event = require('../models/Event');

const createBooking = async (userId, bookingData) => {
    const { eventId, seatsBooked, seatNumbers, totalAmount } = bookingData;

    // Atomic Operation:
    // Only update if availableSeats >= seatsBooked.
    // This prevents race conditions where two users book the last seat simultaneously.
    const updatedEvent = await Event.findOneAndUpdate(
        {
            _id: eventId,
            availableSeats: { $gte: seatsBooked }
        },
        {
            $inc: { availableSeats: -seatsBooked },
            $push: { bookedSeats: { $each: seatNumbers || [] } }
        },
        { new: true }
    );

    if (!updatedEvent) {
        throw new Error('Booking failed: Not enough seats available or event not found.');
    }

    // Determine strict status based on payment (simulated for now)
    const status = 'confirmed';

    const booking = await Booking.create({
        user: userId,
        event: eventId,
        seatsBooked,
        seatNumbers,
        totalAmount,
        status: status
    });

    return booking;
};

const getUserBookings = async (userId) => {
    return await Booking.find({ user: userId })
        .populate('event', 'title date venue image showTime category')
        .sort({ createdAt: -1 });
};

const getAllBookings = async () => {
    return await Booking.find()
        .populate('user', 'name email')
        .populate('event', 'title date')
        .sort({ createdAt: -1 });
};

module.exports = {
    createBooking,
    getUserBookings,
    getAllBookings
};
