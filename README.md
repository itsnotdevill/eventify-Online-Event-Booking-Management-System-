# 🎬 Eventify – Premium Online Event Booking System

**Eventify** is a cutting-edge MERN Stack (MongoDB, Express, React, Node.js) web application that redefines the digital booking experience. Built with a professional corporate aesthetic, it offers seamless booking for movies, concerts, theatre plays, sports matches, and exclusive online streams.

---

## 🚀 Key Features

### 🌟 Premium User Experience
- **Cinematic Dark Theme**: A sophisticated, glassmorphism-inspired dark UI designed for visual immersion.
- **Dynamic Category Explorer**: Smooth navigation between Movies, Stream, Events, Plays, Sports, and Activities.
- **Interactive Seat Mapping**: Real-time seat selection with dynamic pricing tiers (VIP, Premium, Standard).
- **Responsive Design**: Flawlessly optimized for desktop, tablet, and mobile devices.

### 💼 Business & Engagement Pages
- **ListYourShow**: A dedicated partner portal for event organizers to list their shows.
- **Exclusive Offers**: A curated section for bank discounts, credit card promos, and coupon codes.
- **Digital Gift Cards**: Customizable e-gift cards with thematic designs (Birthday, Anniversary, etc.) and personalized messaging.

### 🎟️ Booking & Ticket Management
- **Smart Booking System**: Select dates, times, and seats with an intuitive flow.
- **Digital Tickets**: "My Bookings" generates collectible digital tickets with:
    -   Holographic unique IDs
    -   Visual QR Codes for entry
    -   Simulated "Tear-off" animations
- **Secure Payments**: A polished, mock payment gateway featuring real-time input validation and card visualization.

### 🔐 Advanced Security & Tech
- **JWT Authentication**: Robust session management with secure Login/Signup.
- **AI-Powered Assistance**: Integrated AI Chatbot for user support (simulated).
- **Role-Based Access**: robust Admin Dashboard for:
    -   **Event Management**: Create, Edit, Delete events dynamically.
    -   **User Oversight**: View and manage registered users.
    -   **Booking Tracking**: Real-time view of all bookings and revenue.

---

## 🎨 Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Framer Motion, React Icons, Context API |
| **Backend** | Node.js, Express.js, REST API Architecture |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js |
| **Dev Tools** | Nodemon, Concurrently, Git |

---

## 📦 Installation & Setup Guide

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/itsnotdevill/eventify-Online-Event-Booking-Management-System-.git
cd eventify-Online-Event-Booking-Management-System-
```

### 2. Backend Configuration
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` root:
```env
MONDO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

Seed the Database (Optional but Recommended):
```bash
# Populates the DB with Movies, Plays, Sports, and Stream events
node seeder.js

# Populates the DB with Dummy Users (Recommended for Admin Dashboard demo)
node seed-dummy-users.js
```

### 🔐 Default Admin Credentials
- **Email**: `admin@eventify.com`
- **Password**: `admin123`
- **Role**: Full access to Admin Dashboard (Manage Events, Users, Bookings)
```

Start the Backend Server:
```bash
npm run dev
```

### 3. Frontend Configuration
Open a new terminal, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

Start the React Application:
```bash
npm start
```

The application will launch at `http://localhost:3000`.

---

## 📸 Usage Highlights

1.  **Explore**: Browse the "Stream" tab for online events or "Movies" for the latest blockbusters.
2.  **Filter**: Use the intelligent filter sidebar to sort by genre, language, or price.
3.  **Book**: Select the "Wimbledon Live Screening" event -> Choose VIP seats -> Checkout.
4.  **Profile**: Visit "My Profile" to see your dashboard and "My Bookings" for your tickets.
5.  **Gifts**: Navigate to "Gift Cards" to send a personalized e-card to a friend.

---

## 👨‍💻 Developer & Contribution

Developed as a comprehensive Final Year Computer Science Project demonstrating clean architecture, MVC patterns, and modern UI/UX principles.

**GitHub**: [itsnotdevill](https://github.com/itsnotdevill)
