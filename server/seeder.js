const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

// Models schema references (assuming these schemas exist in your app structure, re-defining simplified versions for seeding if needed, or better yet, just inserting to collections directly if models aren't imported. But best practice is to use the models.)
// For this script, I will assume the collections are 'users' and 'events'.
// If you have models files, it's better to import them. But to be safe and standalone:

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // Movies, Sports, Concerts, Plays, Activities
    date: { type: Date, required: true },
    showTime: { type: String, required: true }, // e.g., "18:00"
    venue: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number }, // Base price (optional if using ticketCategories)
    totalSeats: { type: Number },
    availableSeats: { type: Number },
    ticketCategories: [{
        name: { type: String }, // e.g., Gold, Silver, VIP
        price: { type: Number },
        totalSeats: { type: Number },
        bookedSeats: { type: [String], default: [] } // For seat numbers like "A1", "B2"
    }],
    votes: { type: String, default: '0' },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

const importData = async () => {
    try {
        await User.deleteMany();
        await Event.deleteMany();

        console.log('Data Destroyed...');

        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const userPassword = await bcrypt.hash('password123', salt);

        const createdUsers = await User.insertMany([
            {
                name: 'Mr Ghost',
                email: 'admin@eventify.com',
                password: adminPassword,
                role: 'admin',
            },
            {
                name: 'John Doe',
                email: 'user@eventify.com',
                password: userPassword,
                role: 'user',
            },
        ]);

        const adminUser = createdUsers[0]._id;

        const rawEvents = [
            // --- MOVIES ---
            {
                title: 'Dune: Part Two',
                description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
                category: 'Movies',
                date: new Date('2025-11-15'),
                showTime: '18:30',
                venue: 'IMAX: Palladium, Mumbai',
                image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2000&auto=format&fit=crop', // Sci-fi desert vibe
                rating: 8.8,
                votes: '25K',
                ticketCategories: [
                    { name: 'IMAX 3D', price: 950, totalSeats: 100 },
                    { name: 'Classic', price: 450, totalSeats: 200 }
                ]
            },
            {
                title: 'Interstellar',
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                category: 'Movies',
                date: new Date('2025-11-16'),
                showTime: '20:00',
                venue: 'PVR: ICON, Andheri',
                image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop', // Space/Cosmic
                rating: 9.0,
                votes: '112K',
                ticketCategories: [
                    { name: 'Gold', price: 600, totalSeats: 150 },
                    { name: 'Silver', price: 350, totalSeats: 150 }
                ]
            },
            {
                title: 'Oppenheimer',
                description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
                category: 'Movies',
                date: new Date('2025-11-18'),
                showTime: '19:00',
                venue: 'Cinepolis: Viviana, Thane',
                image: 'https://images.unsplash.com/photo-1592610686423-b68aae7aa539?q=80&w=2000&auto=format&fit=crop', // Abstract/Explosion vibe
                rating: 8.6,
                votes: '45K',
                ticketCategories: [
                    { name: 'VIP', price: 800, totalSeats: 50 },
                    { name: 'Premium', price: 500, totalSeats: 150 }
                ]
            },
            {
                title: 'Cyberpunk: Edgerunners Movie',
                description: 'A street kid tries to survive in a technology and body modification-obsessed city of the future.',
                category: 'Movies',
                date: new Date('2025-11-20'),
                showTime: '21:30',
                venue: 'Inox: R-City, Ghatkopar',
                image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2000&auto=format&fit=crop', // Cyberpunk/Neon city
                rating: 9.2,
                votes: '18K',
                ticketCategories: [
                    { name: 'Recliner', price: 1200, totalSeats: 40 },
                    { name: 'Standard', price: 400, totalSeats: 180 }
                ]
            },
            {
                title: 'Blade Runner 2049',
                description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.',
                category: 'Movies',
                date: new Date('2025-11-22'),
                showTime: '17:00',
                venue: 'PVR: Phoenix, Lower Parel',
                image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop', // Neon/Tech
                rating: 8.9,
                votes: '60K',
                ticketCategories: [
                    { name: 'IMAX 2D', price: 700, totalSeats: 120 },
                    { name: 'Regular', price: 300, totalSeats: 200 }
                ]
            },

            // --- CONCERTS ---
            {
                title: 'Coldplay: Music of the Spheres',
                description: 'Experience the magic of Coldplay live with their spectacular stadium tour featuring hits from their latest album.',
                category: 'Concerts',
                date: new Date('2026-01-25'),
                showTime: '19:00',
                venue: 'DY Patil Stadium, Navi Mumbai',
                image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000&auto=format&fit=crop', // Concert crowd/lights
                rating: 9.5,
                votes: '150K',
                ticketCategories: [
                    { name: 'Lounge', price: 15000, totalSeats: 100 },
                    { name: 'Standing', price: 4500, totalSeats: 5000 },
                    { name: 'Seating', price: 2500, totalSeats: 10000 }
                ]
            },
            {
                title: 'Sunburn Arena ft. Martin Garrix',
                description: 'Get ready for the biggest EDM night of the year with the world\'s #1 DJ, Martin Garrix.',
                category: 'Concerts',
                date: new Date('2025-12-31'),
                showTime: '16:00',
                venue: 'Jio Gardens, BKC',
                image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop', // DJ/Club vibe
                rating: 9.1,
                votes: '80K',
                ticketCategories: [
                    { name: 'VIP', price: 5000, totalSeats: 500 },
                    { name: 'General', price: 2000, totalSeats: 3000 }
                ]
            },
            {
                title: 'Jazz under the Stars',
                description: 'An evening of smooth jazz, wine, and elegance under the open sky.',
                category: 'Concerts',
                date: new Date('2025-11-20'),
                showTime: '19:30',
                venue: 'The Royal Opera House (Open Air)',
                image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2000&auto=format&fit=crop', // Jazz/Saxophone
                rating: 8.7,
                votes: '12K',
                ticketCategories: [
                    { name: 'Table Seating', price: 3000, totalSeats: 50 },
                    { name: 'Gallery', price: 1200, totalSeats: 100 }
                ]
            },
            {
                title: 'The Weeknd: After Hours Tour',
                description: 'A cinematic musical experience featuring The Weeknd\'s greatest hits in a visually stunning production.',
                category: 'Concerts',
                date: new Date('2026-02-14'),
                showTime: '20:00',
                venue: 'Jio World Centre, Mumbai',
                image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2000&auto=format&fit=crop', // Neon/Synthwave
                rating: 9.4,
                votes: '95K',
                ticketCategories: [
                    { name: 'Early Bird', price: 3500, totalSeats: 1000 },
                    { name: 'Regular', price: 5000, totalSeats: 2000 }
                ]
            },

            // --- SPORTS ---
            {
                title: 'IPL 2026: MI vs CSK',
                description: 'The El Clásico of Cricket! Mumbai Indians take on Chennai Super Kings in a high-voltage match.',
                category: 'Sports',
                date: new Date('2026-04-10'),
                showTime: '19:30',
                venue: 'Wankhede Stadium, Mumbai',
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop', // Cricket stadium
                rating: 9.6,
                votes: '200K',
                ticketCategories: [
                    { name: 'North Stand', price: 2500, totalSeats: 500 },
                    { name: 'Club House', price: 5000, totalSeats: 200 }
                ]
            },
            {
                title: 'ISL Final: Mumbai City FC vs Mohun Bagan',
                description: 'Witness the grand finale of the Indian Super League.',
                category: 'Sports',
                date: new Date('2026-03-05'),
                showTime: '19:30',
                venue: 'Mumbai Football Arena, Andheri',
                image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2000&auto=format&fit=crop', // Football
                rating: 8.5,
                votes: '35K',
                ticketCategories: [
                    { name: 'General Stand', price: 500, totalSeats: 1000 },
                    { name: 'VIP Box', price: 3000, totalSeats: 50 }
                ]
            },
            {
                title: 'Formula 1: Indian Grand Prix Screening',
                description: 'Live screening of the race with fellow F1 enthusiasts, simulators, and food.',
                category: 'Sports',
                date: new Date('2025-11-30'),
                showTime: '18:30',
                venue: 'Social, Khar',
                image: 'https://images.unsplash.com/photo-1534068590799-09895a701e3e?q=80&w=2000&auto=format&fit=crop', // Racing/Car
                rating: 8.8,
                votes: '5K',
                ticketCategories: [
                    { name: 'Entry + Cover', price: 1000, totalSeats: 100 }
                ]
            },

            // --- PLAYS ---
            {
                title: 'The Lion King: Musical',
                description: 'The world\'s #1 musical makes its way to India. A breathtaking theatrical experience.',
                category: 'Plays',
                date: new Date('2025-12-10'),
                showTime: '15:00',
                venue: 'NMACC, Bandra Kurla Complex',
                image: 'https://images.unsplash.com/photo-1544377854-3e913a4843b0?q=80&w=2000&auto=format&fit=crop', // Theatre/Stage
                rating: 9.8,
                votes: '42K',
                ticketCategories: [
                    { name: 'Diamond', price: 5000, totalSeats: 100 },
                    { name: 'Gold', price: 3000, totalSeats: 150 },
                    { name: 'Silver', price: 1500, totalSeats: 200 }
                ]
            },
            {
                title: 'Mughal-e-Azam: The Play',
                description: 'A grand tribute to the timeless love saga of Prince Salim and Anarkali.',
                category: 'Plays',
                date: new Date('2026-01-05'),
                showTime: '19:00',
                venue: 'NCPA, Nariman Point',
                image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a11d0?q=80&w=2000&auto=format&fit=crop', // Palace/Traditional
                rating: 9.3,
                votes: '28K',
                ticketCategories: [
                    { name: 'Premium', price: 4000, totalSeats: 100 },
                    { name: 'Standard', price: 1500, totalSeats: 300 }
                ]
            },
            {
                title: 'Hamlet',
                description: 'A modern adaptation of Shakespeare\'s classic tragedy.',
                category: 'Plays',
                date: new Date('2025-11-25'),
                showTime: '20:00',
                venue: 'Prithvi Theatre, Juhu',
                image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop', // Dramatic lighting
                rating: 8.2,
                votes: '8K',
                ticketCategories: [
                    { name: 'General', price: 500, totalSeats: 150 }
                ]
            },

            // --- ACTIVITIES ---
            {
                title: 'Pottery Workshop',
                description: 'Learn the art of pottery making in a relaxing weekend workshop.',
                category: 'Activities',
                date: new Date('2025-11-22'),
                showTime: '11:00',
                venue: 'The Art Studio, Bandra',
                image: 'https://images.unsplash.com/photo-1565193566173-0922d56a04a7?q=80&w=2000&auto=format&fit=crop', // Pottery
                rating: 4.8,
                votes: '2K', // Stars are usually out of 10 in your UI, adjusted
                ticketCategories: [
                    { name: 'Entry', price: 1500, totalSeats: 20 }
                ]
            },
            {
                title: 'Stand-Up Comedy: Vir Das',
                description: 'Catch Vir Das live as he performs his new special "Mind Fool".',
                category: 'Activities',
                date: new Date('2025-12-02'),
                showTime: '20:30',
                venue: 'St. Andrews Auditorium, Bandra',
                image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2000&auto=format&fit=crop', // Microphone/Comedy
                rating: 9.0,
                votes: '15K',
                ticketCategories: [
                    { name: 'Front Row', price: 2000, totalSeats: 50 },
                    { name: 'Regular', price: 999, totalSeats: 200 }
                ]
            },
            {
                title: 'Midnight Cycling Tour',
                description: 'Explore the heritage of South Mumbai on cycle under the night sky.',
                category: 'Activities',
                date: new Date('2025-11-29'),
                showTime: '23:30',
                venue: 'Colaba Causeway',
                image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2000&auto=format&fit=crop', // Cycling/Night
                rating: 8.5,
                votes: '3K',
                ticketCategories: [
                    { name: 'With Cycle', price: 800, totalSeats: 30 },
                    { name: 'Own Cycle', price: 400, totalSeats: 20 }
                ]
            },
            {
                title: 'Paint & Sip Party',
                description: 'Unleash your inner artist with guidance, canvas, and a glass of wine.',
                category: 'Activities',
                date: new Date('2025-12-05'),
                showTime: '16:00',
                venue: 'Doolally Taproom, Khar',
                image: 'https://images.unsplash.com/photo-1510931597-fa1623548981?q=80&w=2000&auto=format&fit=crop', // Painting
                rating: 8.9,
                votes: '1.5K',
                ticketCategories: [
                    { name: 'Entry', price: 1800, totalSeats: 25 }
                ]
            },

            // --- STREAM (Online Events) ---
            {
                title: 'Masterclass: Filmmaking with Christopher Nolan',
                description: 'An exclusive online masterclass on the art of non-linear storytelling and practical effects.',
                category: 'Stream',
                date: new Date('2025-11-28'),
                showTime: '10:00 (On-Demand)',
                venue: 'Online Stream',
                image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop', // Movie camera
                rating: 9.9,
                votes: '50K',
                ticketCategories: [
                    { name: 'Access Pass', price: 999, totalSeats: 10000 }
                ]
            },
            {
                title: 'Tomorrowland: Digital Festival',
                description: 'Experience the magic of Tomorrowland from the comfort of your home. Featuring 5 stages of music.',
                category: 'Stream',
                date: new Date('2026-07-20'),
                showTime: '18:00',
                venue: 'Online Stream',
                image: 'https://images.unsplash.com/photo-1571266028243-37160d7f8d48?q=80&w=2000&auto=format&fit=crop', // Digital abstract/DJ
                rating: 9.4,
                votes: '120K',
                ticketCategories: [
                    { name: 'Weekend Pass', price: 499, totalSeats: 100000 }
                ]
            },
            {
                title: 'Tech Talk: The Future of AI',
                description: 'A live panel discussion with industry leaders from Google, OpenAI, and Microsoft.',
                category: 'Stream',
                date: new Date('2025-12-15'),
                showTime: '20:00',
                venue: 'Online Stream',
                image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop', // AI/Robot
                rating: 8.8,
                votes: '10K',
                ticketCategories: [
                    { name: 'Free Registration', price: 0, totalSeats: 5000 }
                ]
            },
            {
                title: 'Lo-Fi Beats & Study Session',
                description: 'A 24/7 continuous stream of relaxing lo-fi beats for studying and working.',
                category: 'Stream',
                date: new Date('2025-11-15'),
                showTime: 'Live Now',
                venue: 'Online Stream',
                image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2000&auto=format&fit=crop', // Chill/Headphones
                rating: 9.5,
                votes: '200K',
                ticketCategories: [
                    { name: 'Free', price: 0, totalSeats: 999999 }
                ]
            }
        ];

        // Pre-calculate availableSeats because insertMany does not trigger pre-save hooks
        const eventsWithSeats = rawEvents.map(event => {
            const total = event.ticketCategories.reduce((acc, cat) => acc + (cat.totalSeats || 0), 0);
            return {
                ...event,
                totalSeats: total,
                availableSeats: total
            };
        });

        await Event.insertMany(eventsWithSeats);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();
