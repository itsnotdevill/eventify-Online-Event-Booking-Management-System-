const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Booking = require('./models/Booking');
const User = require('./models/User'); // Required for populate if needed

dotenv.config();

const checkBookings = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const bookings = await Booking.find({});
        console.log(`Found ${bookings.length} bookings.`);

        bookings.forEach((b, i) => {
            console.log(`Booking #${i + 1} ID: ${b._id}`);
            console.log(`  User: ${b.user}`);
            console.log(`  Event: ${b.event}`);
            console.log(`  Seats: ${b.seats} (Type: ${Array.isArray(b.seats) ? 'Array' : typeof b.seats})`);
            if (!b.seats) {
                console.warn('  WARNING: Seats field is missing or null!');
            }
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkBookings();
