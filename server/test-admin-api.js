const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const testApi = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const adminUser = await User.findOne({ email: 'admin@eventify.com' });

        if (!adminUser) {
            console.error('Admin user not found in DB');
            process.exit(1);
        }

        const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        console.log('generated token, fetching...');

        try {
            const res = await fetch('http://localhost:5000/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log(`Status: ${res.status}`);

            if (res.ok) {
                const data = await res.json();
                console.log('✅ API Success: /api/users');
                console.log(`Received ${data.length} users`);
            } else {
                const text = await res.text();
                console.error('❌ API Failed: /api/users');
                console.error(`Status: ${res.status}`);
                console.error(`Body: ${text}`);
            }
        } catch (err) {
            console.error('❌ Network/Fetch Error');
            console.error(err);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

testApi();
