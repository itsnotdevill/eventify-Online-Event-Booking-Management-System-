const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const checkEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const events = await Event.find({}).limit(3);
        console.log('--- Checking first 3 events ---');
        events.forEach(e => {
            console.log(`Title: ${e.title}`);
            console.log(`ID: ${e._id}`);
            console.log(`Total Seats: ${e.totalSeats} (Type: ${typeof e.totalSeats})`);
            console.log(`Available Seats: ${e.availableSeats} (Type: ${typeof e.availableSeats})`);
            console.log(`Ticket Categories:`, e.ticketCategories);
            console.log('---------------------------');
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkEvents();
