const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    category: {
        type: String,
        required: true,
        enum: ['Movies', 'Concerts', 'Sports', 'Plays', 'Activities', 'Stream']
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    venue: {
        type: String,
        required: [true, 'Please add a venue']
    },
    // price removed in favor of ticketCategories
    // totalSeats removed in favor of ticketCategories logic, but keeping as overall capacity? 
    // Let's keep totalSeats as a sum constraint or just remove it if categories define it. 
    // For now, I'll comment out the old simple fields to avoid validation errors if I don't migrate data immediately, 
    // but the user wants "Enhancements", so I should probably transition to the new schema.
    // I will keep them but make them optional for backward compatibility if needed, OR just remove them if I'm confident. 
    // Plan said Modify. I'll remove 'price' requirement.
    basePrice: {
        type: Number,
        // required: [true, 'Please add a price'] -> Moved to categories
    },
    totalSeats: {
        type: Number,
        // required: [true, 'Please add total seats'] -> derived from categories
    },
    availableSeats: {
        type: Number,
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    trailerUrl: {
        type: String // Youtube embed URL
    },
    cast: [{
        name: String,
        role: String,
        image: String
    }],
    crew: [{
        name: String,
        role: String,
        image: String
    }],
    ticketCategories: [{
        name: { type: String, required: true }, // e.g., 'Gold', 'Silver', 'Platinum'
        price: { type: Number, required: true },
        totalSeats: { type: Number, required: true }
    }],
    showTime: {
        type: String, // e.g., '19:00'
        required: [true, 'Please add a show time']
    },
    bookedSeats: {
        type: [String], // Array of seat IDs like 'A1', 'B2'
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate available seats before saving? 
// Actually, availableSeats should be initialized to totalSeats if not provided.
// Calculate totalSeats from ticketCategories if present
// 2. If availableSeats is undefined, initialize it to totalSeats
eventSchema.pre('save', async function () {
    if (this.ticketCategories && this.ticketCategories.length > 0) {
        this.totalSeats = this.ticketCategories.reduce((acc, cat) => acc + (cat.totalSeats || 0), 0);
    }

    if (this.availableSeats === undefined) {
        this.availableSeats = this.totalSeats;
    }
});

module.exports = mongoose.model('Event', eventSchema);
