const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const repairEvents = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const events = await Event.find({});
        console.log(`Found ${events.length} events to check.`);

        for (const event of events) {
            let changed = false;

            // 1. Calculate Total Seats from Categories
            let calculatedTotal = 0;
            if (event.ticketCategories && event.ticketCategories.length > 0) {
                calculatedTotal = event.ticketCategories.reduce((acc, cat) => acc + (cat.totalSeats || 0), 0);
            } else {
                // Fallback if no categories (shouldn't happen based on analysis, but safe to keep)
                calculatedTotal = event.totalSeats || 0;
            }

            if (event.totalSeats !== calculatedTotal) {
                console.log(`- Updating Total Seats for '${event.title}': ${event.totalSeats} -> ${calculatedTotal}`);
                event.totalSeats = calculatedTotal;
                changed = true;
            }

            // 2. Calculate Available Seats
            // bookedSeats might be undefined, handle that
            const bookedCount = event.bookedSeats ? event.bookedSeats.length : 0;
            const calculatedAvailable = calculatedTotal - bookedCount;

            if (event.availableSeats === undefined || event.availableSeats !== calculatedAvailable) {
                console.log(`- Updating Available Seats for '${event.title}': ${event.availableSeats} -> ${calculatedAvailable}`);
                event.availableSeats = calculatedAvailable;
                changed = true;
            }

            if (changed) {
                await event.save();
                console.log(`  Saved updates for '${event.title}'`);
            } else {
                console.log(`- No changes needed for '${event.title}'`);
            }
        }

        console.log('Repair complete.');
        process.exit();
    } catch (error) {
        console.error('Error repairing DB:', error);
        process.exit(1);
    }
};

repairEvents();
