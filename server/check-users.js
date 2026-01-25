const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Fix path to User model if running from server root
const User = require('./models/User');

dotenv.config();

const checkUsers = async () => {
    try {
        console.log('Attempting to connect to MongoDB...', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const users = await User.find({});
        console.log('Users found:', users.length);
        users.forEach(user => {
            console.log(`- ${user.email} (Role: ${user.role})`);
        });

        process.exit();
    } catch (error) {
        console.error('Connection Error Message:', error.message);
        // console.error('Full Error:', error);
        process.exit(1);
    }
};

checkUsers();
