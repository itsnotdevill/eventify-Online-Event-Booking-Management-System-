const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingService = require('./services/booking.service');
const Event = require('./models/Event');
const User = require('./models/User');

dotenv.config();

const testBooking = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // 1. Get User
        const user = await User.findOne({ email: 'mrghost@gmail.com' });
        if (!user) {
            console.error('User mrghost not found');
            process.exit(1);
        }

        // 2. Get Event
        // Using the ID from previous check-event.js output
        const eventId = '69752d780e03c2d7363acb6e';
        const event = await Event.findById(eventId);
        if (!event) {
            console.error('Event not found');
            process.exit(1);
        }
        console.log(`Event Found: ${event.title}, Available: ${event.availableSeats}`);

        // 3. Attempt Booking
        console.log('Attempting booking for 2 seats...');
        try {
            const booking = await bookingService.createBooking(user._id, {
                eventId: event._id,
                seatsBooked: 2,
                seatNumbers: ['Z1', 'Z2'],
                totalAmount: 2200
            });
            console.log('Booking Success!', booking);
        } catch (err) {
            console.error('Booking Service Error:', err.message);
        }

        process.exit();
    } catch (error) {
        console.error('Script Error:', error);
        process.exit(1);
    }
};

testBooking();
