const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const usersToSeed = [
    { name: 'Alice Smith', email: 'alice@example.com', password: 'password123', role: 'user' },
    { name: 'Bob Jones', email: 'bob@example.com', password: 'password123', role: 'user' },
    { name: 'Charlie Brown', email: 'charlie@example.com', password: 'password123', role: 'user' },
    { name: 'Diana Prince', email: 'diana@example.com', password: 'password123', role: 'user' },
    { name: 'Ethan Hunt', email: 'ethan@example.com', password: 'password123', role: 'user' },
    { name: 'Fiona Gallagher', email: 'fiona@example.com', password: 'password123', role: 'user' },
    { name: 'George Martin', email: 'george@example.com', password: 'password123', role: 'user' },
    { name: 'Hannah Baker', email: 'hannah@example.com', password: 'password123', role: 'user' },
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        for (const user of usersToSeed) {
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                // Manually hash because insertMany/create might skip pre-save hooks if not careful, 
                // but User.create USUALLY triggers it. To be safe/fast:
                // Actually User.create triggers hooks.
                await User.create(user);
                console.log(`Created user: ${user.name}`);
            } else {
                console.log(`Skipping ${user.name} (already exists)`);
            }
        }

        console.log('Seeding complete.');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUsers();
