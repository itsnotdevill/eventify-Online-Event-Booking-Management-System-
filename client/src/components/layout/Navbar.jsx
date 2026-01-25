import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearch, BiMenu, BiUser, BiChevronDown, BiMap, BiX } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState('Mumbai');
    const [showLocationModal, setShowLocationModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Movies', path: '/movies' },
        { name: 'Stream', path: '/stream' },
        { name: 'Events', path: '/events' },
        { name: 'Plays', path: '/plays' },
        { name: 'Sports', path: '/sports' },
        { name: 'Activities', path: '/activities' },
    ];

    const popularCities = ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chandigarh', 'Chennai', 'Pune', 'Kolkata', 'Kochi'];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary-950/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 md:px-6">
                {/* Top Navbar */}
                <div className="flex items-center justify-between h-20 gap-8">
                    {/* Logo & Search */}
                    <div className="flex items-center gap-8 flex-1">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                <span className="text-white font-bold text-xl">E</span>
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary-400 group-hover:from-primary-400 group-hover:to-primary-600 transition-all duration-300">
                                Eventify
                            </span>
                        </Link>

                        <div className="hidden md:flex flex-1 max-w-xl relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BiSearch className="text-secondary-400 group-hover:text-primary-500 transition-colors" size={20} />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-secondary-900/50 border border-secondary-800 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
                                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            />
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6">
                        {/* Location Selector */}
                        <div
                            className="hidden md:flex items-center gap-1 text-secondary-300 hover:text-white cursor-pointer transition-colors"
                            onClick={() => setShowLocationModal(true)}
                        >
                            <span className="text-sm font-medium">{location}</span>
                            <BiChevronDown size={16} />
                        </div>

                        {user ? (
                            <div className="relative group">
                                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20">
                                        {user.name ? user.name.charAt(0).toUpperCase() : <BiUser />}
                                    </div>
                                    <span className="hidden md:block text-white text-sm font-medium">{user.name}</span>
                                </Link>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-secondary-900 border border-secondary-800 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-secondary-300 hover:text-white hover:bg-secondary-800">Profile</Link>
                                    <Link to="/my-bookings" className="block px-4 py-2 text-sm text-secondary-300 hover:text-white hover:bg-secondary-800">My Bookings</Link>
                                    <div className="h-px bg-secondary-800 my-1"></div>
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-secondary-800">Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary px-6 text-sm">
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <BiX size={28} /> : <BiMenu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Secondary Navbar (Categories) */}
                <div className="hidden md:flex items-center justify-between py-3 border-t border-secondary-800">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm text-secondary-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-secondary-400">
                        <Link to="/list-your-show" className="hover:text-white transition-colors">ListYourShow</Link>
                        <Link to="/offers" className="hover:text-white transition-colors">Offers</Link>
                        <Link to="/gift-cards" className="hover:text-white transition-colors">Gift Cards</Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-secondary-950 border-b border-secondary-800 p-4 shadow-xl animate-slide-up">
                    <div className="space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block text-secondary-300 hover:text-white py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Location Modal */}
            {showLocationModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-secondary-900 border border-secondary-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-secondary-800">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search for your city"
                                className="w-full bg-transparent text-white placeholder-secondary-500 focus:outline-none text-lg"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-secondary-400 text-sm mb-4">Popular Cities</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                {popularCities.map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => {
                                            setLocation(city);
                                            setShowLocationModal(false);
                                        }}
                                        className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-secondary-800 transition-colors group"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-secondary-700 flex items-center justify-center group-hover:border-primary-500 group-hover:text-primary-500 transition-all">
                                            <BiMap size={20} />
                                        </div>
                                        <span className="text-sm text-secondary-300 group-hover:text-white">{city}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <button className="text-primary-500 text-sm hover:underline">View All Cities</button>
                            </div>
                        </div>
                        <div className="p-4 bg-secondary-950/50 flex justify-end">
                            <button onClick={() => setShowLocationModal(false)} className="text-secondary-400 hover:text-white">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
