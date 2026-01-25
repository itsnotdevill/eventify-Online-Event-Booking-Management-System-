import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { BiSupport, BiBarcode, BiEnvelope, BiMap } from 'react-icons/bi';

const Footer = () => {
    return (
        <footer className="bg-secondary-950 text-secondary-300 pt-16 pb-8 border-t border-secondary-900">
            <div className="container mx-auto px-4 md:px-6">
                {/* Top Section: CTA */}
                <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-secondary-900 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary-900 flex items-center justify-center text-white">
                            <BiSupport size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold">24/7 Customer Support</h4>
                            <p className="text-sm">We're here to help you</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary-900 flex items-center justify-center text-white">
                            <BiBarcode size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold">Resend Booking Confirmation</h4>
                            <p className="text-sm">Check your email</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary-900 flex items-center justify-center text-white">
                            <BiEnvelope size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold">Subscribe to Newsletter</h4>
                            <p className="text-sm">Get latest updates</p>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                    <div className="space-y-4">
                        <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Eventify</h5>
                        <p className="text-sm text-secondary-400 leading-relaxed">
                            Eventify is your global platform for booking movies, events, plays, sports, and activities. We bring the world of entertainment to your fingertips with seamless booking and exclusive experiences.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center hover:bg-primary-600 hover:text-white text-secondary-400 transition-all transform hover:-translate-y-1"><FaFacebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center hover:bg-primary-600 hover:text-white text-secondary-400 transition-all transform hover:-translate-y-1"><FaTwitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center hover:bg-primary-600 hover:text-white text-secondary-400 transition-all transform hover:-translate-y-1"><FaInstagram size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center hover:bg-primary-600 hover:text-white text-secondary-400 transition-all transform hover:-translate-y-1"><FaLinkedin size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Explore</h5>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/movies" className="text-secondary-400 hover:text-primary-500 transition-colors">Movies</Link></li>
                            <li><Link to="/stream" className="text-secondary-400 hover:text-primary-500 transition-colors">Stream</Link></li>
                            <li><Link to="/events" className="text-secondary-400 hover:text-primary-500 transition-colors">Events</Link></li>
                            <li><Link to="/plays" className="text-secondary-400 hover:text-primary-500 transition-colors">Plays</Link></li>
                            <li><Link to="/sports" className="text-secondary-400 hover:text-primary-500 transition-colors">Sports</Link></li>
                            <li><Link to="/activities" className="text-secondary-400 hover:text-primary-500 transition-colors">Activities</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Help & Legal</h5>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="text-secondary-400 hover:text-primary-500 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-secondary-400 hover:text-primary-500 transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-secondary-400 hover:text-primary-500 transition-colors">FAQs</Link></li>
                            <li><Link to="/terms" className="text-secondary-400 hover:text-primary-500 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="text-secondary-400 hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/sitemap" className="text-secondary-400 hover:text-primary-500 transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h5>
                        <ul className="space-y-4 text-sm text-secondary-400">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-primary-500"><BiMap size={18} /></span>
                                <div>
                                    <p className="font-medium text-white">Headquarters</p>
                                    <p>123 Entertainment Blvd, Tech Park,</p>
                                    <p>Mumbai, Maharashtra 400001</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500"><BiEnvelope size={18} /></span>
                                <a href="mailto:support@eventify.com" className="hover:text-white transition-colors">support@eventify.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500"><BiSupport size={18} /></span>
                                <a href="tel:+911234567890" className="hover:text-white transition-colors">+91 123 456 7890</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-secondary-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-secondary-500">
                    <p>&copy; {new Date().getFullYear()} Eventify Entertainment Pvt. Ltd. All Rights Reserved.</p>
                    <div className="mt-4 md:mt-0 flex items-center gap-1">
                        <div className="w-8 h-8 rounded bg-secondary-900 flex items-center justify-center text-white font-bold">E</div>
                        <span className="text-white font-bold text-lg tracking-tight">Eventify</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
