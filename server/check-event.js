const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const checkEvent = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // ID from the user screenshot URL
        const eventId = '69752d780e03c2d7363acb6e';

        const event = await Event.findById(eventId);
        if (!event) {
            console.log('Event NOT found!');
        } else {
            console.log('Event found:', event.title);
            console.log('Available Seats (Root):', event.availableSeats);
            console.log('Total Seats (Root):', event.totalSeats);
            console.log('Ticket Categories:', JSON.stringify(event.ticketCategories, null, 2));
            console.log('Booked Seats:', event.bookedSeats);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkEvent();
