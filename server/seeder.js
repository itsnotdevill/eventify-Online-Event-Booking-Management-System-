const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Event = require('./models/Event');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Event.deleteMany();

        const salt = await bcrypt.genSalt(10);
        // Set password to 'password123' as per user expectation
        const adminPassword = await bcrypt.hash('password123', salt);
        const userPassword = await bcrypt.hash('password123', salt);

        const users = [
            {
                name: 'Admin User',
                email: 'admin@eventify.com',
                password: adminPassword,
                role: 'admin'
            },
            {
                name: 'John Doe',
                email: 'john@gmail.com',
                password: userPassword,
                role: 'user'
            },
            {
                name: 'Mr Ghost',
                email: 'mrghost@gmail.com',
                password: userPassword,
                role: 'user'
            }
        ];

        const createdUsers = await User.insertMany(users);

        // Helper to calculate seats
        const addSeats = (event) => {
            const total = event.ticketCategories.reduce((acc, cat) => acc + cat.totalSeats, 0);
            return {
                ...event,
                totalSeats: total,
                availableSeats: total
            };
        };

        const rawEvents = [
            // Stream
            {
                title: 'Tomorrowland Digital',
                description: 'Join the world\'s most magical digital festival. Experience exclusive sets from top DJs, mesmerizing visual effects, and a global community of music lovers, all from the comfort of your home.',
                category: 'Stream',
                date: new Date('2025-07-20'),
                showTime: '18:00',
                venue: 'Online / Global Stream',
                image: '/assets/events/poster_tomorrowland.png',
                ticketCategories: [
                    { name: 'Full Access', price: 999, totalSeats: 10000 },
                    { name: 'Day Pass', price: 499, totalSeats: 20000 }
                ],
                bookedSeats: []
            },
            {
                title: 'Global Tech Summit 2025',
                description: 'The future is here. Tune in to watch keynotes from industry leaders, product launches, and panel discussions on AI, Quantum Computing, and Sustainable Tech.',
                category: 'Stream',
                date: new Date('2025-10-10'),
                showTime: '09:00',
                venue: 'Online / Global Stream',
                image: '/assets/events/poster_techsummit.png',
                ticketCategories: [
                    { name: 'Virtual PRO', price: 299, totalSeats: 5000 },
                    { name: 'Student', price: 99, totalSeats: 10000 }
                ],
                bookedSeats: []
            },

            // Movies
            {
                title: 'Kingdom of the Planet of the Apes',
                description: 'Director Wes Ball breathes new life into the global, epic franchise set several generations in the future following Caesar\'s reign. A young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.',
                category: 'Movies',
                date: new Date('2025-05-10'),
                showTime: '15:30',
                venue: 'PVR: Phoenix Market City, Mumbai',
                image: '/assets/events/poster_apes.png',
                ticketCategories: [
                    { name: 'IMAX', price: 900, totalSeats: 50 },
                    { name: 'Classic', price: 400, totalSeats: 150 }
                ],
                bookedSeats: []
            },
            {
                title: 'Srikanth',
                description: 'The inspiring story of Srikanth Bolla, a visually impaired industrialist who defied all odds to establish Bollant Industries. A tale of resilience, vision, and the indomitable human spirit starring Rajkummar Rao.',
                category: 'Movies',
                date: new Date('2025-05-12'),
                showTime: '18:00',
                venue: 'INOX: R-City, Ghatkopar',
                image: '/assets/events/poster_srikanth.png',
                ticketCategories: [
                    { name: 'Premium', price: 600, totalSeats: 40 },
                    { name: 'Executive', price: 300, totalSeats: 120 }
                ],
                bookedSeats: []
            },
            {
                title: 'Furiosa: A Mad Max Saga',
                description: 'As the world falls, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by The Immortan Joe.',
                category: 'Movies',
                date: new Date('2025-05-23'),
                showTime: '20:30',
                venue: 'Cinepolis: Viviana Mall, Thane',
                image: '/assets/events/poster_furiosa.png',
                ticketCategories: [
                    { name: '4DX', price: 1100, totalSeats: 60 },
                    { name: 'Normal', price: 500, totalSeats: 120 }
                ],
                bookedSeats: []
            },

            // Concerts & Events
            {
                title: 'Sunburn Arena ft. Alan Walker',
                description: 'Get ready for the biggest EDM night of the year! Alan Walker returns to India for an electrifying performance featuring his greatest hits and new tracks. Experience world-class production, lasers, and bass.',
                category: 'Concerts',
                date: new Date('2025-09-15'),
                showTime: '16:00',
                venue: 'Jio World Garden, Mumbai',
                image: '/assets/events/poster_sunburn.png',
                ticketCategories: [
                    { name: 'VIP', price: 2500, totalSeats: 500 },
                    { name: 'GA', price: 1200, totalSeats: 5000 }
                ],
                bookedSeats: []
            },
            {
                title: 'Arijit Singh Live',
                description: 'Join the melody king Arijit Singh for a magical evening of soulful music. From romantic ballads to heart-touching numbers, experience the voice that has captivated millions.',
                category: 'Concerts',
                date: new Date('2025-10-02'),
                showTime: '19:00',
                venue: 'DY Patil Stadium',
                image: '/assets/events/poster_arijit.png',
                ticketCategories: [
                    { name: 'Diamond', price: 5000, totalSeats: 200 },
                    { name: 'Silver', price: 1500, totalSeats: 3000 }
                ],
                bookedSeats: []
            },

            // Sports
            {
                title: 'Mumbai City FC vs Mohun Bagan',
                description: 'The ISL Final Showdown! Witness the titans of Indian football clash at the Mumbai Football Arena. High stakes, intense action, and the roar of the fans. Who will lift the cup?',
                category: 'Sports',
                date: new Date('2025-11-10'),
                showTime: '19:30',
                venue: 'Mumbai Football Arena',
                image: '/assets/events/poster_football.png',
                ticketCategories: [
                    { name: 'West Block', price: 800, totalSeats: 500 },
                    { name: 'East Block', price: 500, totalSeats: 500 }
                ],
                bookedSeats: []
            },
            {
                title: 'IPL 2026: MI vs CSK',
                description: 'The El Clasico of Cricket! Mumbai Indians take on Chennai Super Kings at the Wankhede. Expect a sea of blue and yellow as the two most successful teams battle it out.',
                category: 'Sports',
                date: new Date('2026-04-14'),
                showTime: '20:00',
                venue: 'Wankhede Stadium, Mumbai',
                image: '/assets/events/poster_ipl.png',
                ticketCategories: [
                    { name: 'Garware Pavilion', price: 4500, totalSeats: 200 },
                    { name: 'North Stand', price: 2500, totalSeats: 800 }
                ],
                bookedSeats: []
            },
            {
                title: 'Wimbledon Live Screening',
                description: 'Experience the prestige and drama of Wimbledon on the big screen. Strawberries, cream, and world-class tennis. The next best thing to being on Centre Court.',
                category: 'Sports',
                date: new Date('2025-07-14'),
                showTime: '14:00',
                venue: 'British Council, Mumbai',
                image: '/assets/events/poster_wimbledon.png',
                ticketCategories: [
                    { name: 'VIP Seating', price: 1200, totalSeats: 50 },
                    { name: 'General', price: 500, totalSeats: 150 }
                ],
                bookedSeats: []
            },

            // Plays
            {
                title: 'Mughal-e-Azam: The Musical',
                description: 'Experience the grandeur of the Mughal era in this award-winning Broadway-style musical. With spectacular sets, lavish costumes, and live singing, this is Indian theatre at its finest.',
                category: 'Plays',
                date: new Date('2025-06-20'),
                showTime: '19:30',
                venue: 'Nita Mukesh Ambani Cultural Centre',
                image: '/assets/events/poster_mughaleazam.png',
                ticketCategories: [
                    { name: 'Royal Box', price: 8000, totalSeats: 20 },
                    { name: 'Platinum', price: 5000, totalSeats: 100 },
                    { name: 'Gold', price: 2500, totalSeats: 300 }
                ],
                bookedSeats: []
            },
            {
                title: 'The Phantom of the Opera',
                description: 'The longest-running show in Broadway history comes to Mumbai. Witness the tragic love story of a disfigured musical genius and a young soprano.',
                category: 'Plays',
                date: new Date('2025-07-15'),
                showTime: '20:00',
                venue: 'Jamshed Bhabha Theatre, NCPA',
                image: '/assets/events/poster_phantom.png',
                ticketCategories: [
                    { name: 'Stalls', price: 3000, totalSeats: 250 },
                    { name: 'Balcony', price: 1500, totalSeats: 150 }
                ],
                bookedSeats: []
            },
            {
                title: 'Hamilton',
                description: 'The story of America then, told by America now. Featuring a score that blends hip-hop, jazz, R&B, and Broadway, Hamilton has taken the story of American founding father Alexander Hamilton and created a revolutionary moment in theatre.',
                category: 'Plays',
                date: new Date('2025-08-01'),
                showTime: '19:00',
                venue: 'Royal Opera House, Mumbai',
                image: '/assets/events/poster_hamilton.png',
                ticketCategories: [
                    { name: 'Orchestra', price: 6000, totalSeats: 100 },
                    { name: 'Mezzanine', price: 3500, totalSeats: 200 }
                ],
                bookedSeats: []
            },
            {
                title: 'Macbeth',
                description: 'A gripping retelling of Shakespeare\'s tragedy of ambition and power. Bold, visceral, and unmissable. Starring celebrated stage actors in a production that explores the darkest corners of the human psyche.',
                category: 'Plays',
                date: new Date('2025-08-15'),
                showTime: '20:00',
                venue: 'Prithvi Theatre, Juhu',
                image: '/assets/events/poster_macbeth.png',
                ticketCategories: [
                    { name: 'Standard', price: 1000, totalSeats: 100 }
                ],
                bookedSeats: []
            },

            // Activities
            {
                title: 'Pottery Workshop',
                description: 'Get your hands dirty and unleash your creativity! A 3-hour guided session on the pottery wheel. Take home your own handcrafted souvenir.',
                category: 'Activities',
                date: new Date('2025-05-18'),
                showTime: '11:00',
                venue: 'The Art Studio, Bandra',
                image: '/assets/events/poster_pottery.png',
                ticketCategories: [
                    { name: 'Single Entry', price: 1500, totalSeats: 15 }
                ],
                bookedSeats: []
            },
            {
                title: 'Stand-up Comedy: Life is a Joke',
                description: 'An evening of non-stop laughter with India\'s top comics. Featured acts include Zakir Khan, Vir Das, and more. Warning: Content may be relatable.',
                category: 'Activities',
                date: new Date('2025-05-25'),
                showTime: '20:00',
                venue: 'The Habitat, Khar',
                image: '/assets/events/poster_comedy.png',
                ticketCategories: [
                    { name: 'Front Row', price: 999, totalSeats: 20 },
                    { name: 'General', price: 499, totalSeats: 60 }
                ],
                bookedSeats: []
            }
        ];

        // Process events to include pre-calculated seat data
        const events = rawEvents.map(addSeats);

        await Event.insertMany(events);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
