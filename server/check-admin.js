const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const admin = await User.findOne({ email: 'admin@eventify.com' });
        if (admin) {
            console.log('Admin User Found:');
            console.log(`Name: ${admin.name}`);
            console.log(`Email: ${admin.email}`);
            console.log(`Role: ${admin.role}`);
            console.log(`isAdmin (legacy): ${admin.isAdmin}`);
        } else {
            console.log('Admin user NOT found');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkAdmin();
