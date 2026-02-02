const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminEmail = 'admin@eventify.com';
        const adminExists = await User.findOne({ email: adminEmail });

        if (adminExists) {
            console.log('Admin user already exists. Updating role...');
            adminExists.role = 'admin';
            adminExists.isAdmin = true; // Legacy support just in case
            await adminExists.save();
            console.log('Admin role updated to "admin"');
        } else {
            console.log('Creating new admin user...');
            const adminUser = await User.create({
                name: 'System Admin',
                email: adminEmail,
                password: 'admin123', // Will be hashed by pre-save hook
                role: 'admin',
                isAdmin: true
            });
            console.log(`Admin user created: ${adminUser.email}`);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
