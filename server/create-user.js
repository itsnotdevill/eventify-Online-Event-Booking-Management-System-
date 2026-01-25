const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createUser = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'mrghost@gmail.com';
        const password = 'password123';
        const name = 'Mr Ghost';

        // Check availability again just in case
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists');
            process.exit(0);
        }

        const user = await User.create({
            name,
            email,
            password,
            role: 'user'
        });

        console.log(`User created successfully: ${user.email}`);
        process.exit();
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
    }
};

createUser();
