import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ListYourShow from './pages/ListYourShow';
import Offers from './pages/Offers';
import GiftCards from './pages/GiftCards';

import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Router>
            <AuthProvider>
                <EventProvider>
                    <Toaster position="top-center" reverseOrder={false} />
                    <div className="font-sans text-secondary-100 bg-secondary-950 min-h-screen">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/movies" element={<Events />} />
                            <Route path="/sports" element={<Events />} />
                            <Route path="/plays" element={<Events />} />
                            <Route path="/activities" element={<Events />} />
                            <Route path="/stream" element={<Events />} />
                            <Route path="/event/:id" element={<EventDetails />} />

                            {/* Private Routes (Protected logic is inside pages or wrap here) */}
                            <Route path="/my-bookings" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/list-your-show" element={<ListYourShow />} />
                            <Route path="/offers" element={<Offers />} />
                            <Route path="/gift-cards" element={<GiftCards />} />

                            {/* Catch all */}
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </div>
                </EventProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
