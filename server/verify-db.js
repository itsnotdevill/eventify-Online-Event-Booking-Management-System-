const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Event = require('./models/Event');

dotenv.config();
connectDB();

const checkData = async () => {
    try {
        const events = await Event.find({});
        console.log(`Found ${events.length} events.`);
        events.forEach(e => {
            console.log(`- ${e.title}: ${e.image} (Avail: ${e.availableSeats})`);
        });
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
