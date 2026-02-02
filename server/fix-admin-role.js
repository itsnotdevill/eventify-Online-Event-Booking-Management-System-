const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const fixAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Force update regardless of pre-save hooks (though simple update shouldn't trigger password hash)
        const updatedUser = await User.findOneAndUpdate(
            { email: 'admin@eventify.com' },
            { $set: { role: 'admin' } }, // Use $set to be explicit
            { new: true }
        );

        if (updatedUser) {
            console.log(`Updated ${updatedUser.email} to role: ${updatedUser.role}`);
        } else {
            console.log('Admin user not found');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixAdmin();
