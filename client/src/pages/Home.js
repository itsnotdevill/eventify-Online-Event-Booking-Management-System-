import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import MainLayout from '../layouts/MainLayout';
import MovieCard from '../components/common/MovieCard';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        "/assets/hero-banner.png"
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await apiClient.get('/events');
                setEvents(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

    const movies = events.filter(e => e.category === 'Movies');
    const sports = events.filter(e => e.category === 'Sports');
    const concerts = events.filter(e => e.category === 'Concerts');
    const plays = events.filter(e => e.category === 'Plays');
    const activities = events.filter(e => e.category === 'Activities');
    const streams = events.filter(e => e.category === 'Stream');

    const Section = ({ title, data, linkTo }) => (
        <div className="py-12 border-b border-secondary-800 last:border-0 border-opacity-50">
            <div className="flex justify-between items-end mb-8 px-2 border-l-4 border-primary-500 pl-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
                <a href={linkTo} className="text-primary-500 hover:text-primary-400 text-sm font-bold uppercase tracking-wider flex items-center gap-1 group transition-colors">
                    See All <BiChevronRight className="transform group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="bg-secondary-900 rounded-lg aspect-[2/3] animate-pulse"></div>
                    ))}
                </div>
            ) : (
                data.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {data.slice(0, 5).map(event => (
                            <MovieCard key={event._id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-secondary-500 text-center py-10 bg-secondary-900/30 rounded-xl">Coming Soon</div>
                )
            )}
        </div>
    );

    return (
        <MainLayout showContainer={false}>
            {/* Hero Carousel */}
            <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden bg-secondary-950 group">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={banner}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover opacity-60 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-950/80 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl animate-slide-up">
                            <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-widest mb-4 inline-block shadow-lg shadow-primary-500/30">Trending Now</span>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none drop-shadow-2xl">Experience the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-pink-500">Extraordinary</span></h1>
                            <p className="text-gray-300 text-lg md:text-xl mb-8 font-light max-w-xl">Book tickets for the biggest movies, electric concerts, and thrilling sports matches happening in your city.</p>
                            <button className="btn btn-primary px-8 py-4 rounded-full text-lg shadow-2xl hover:scale-105 transition-transform">Get Started</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Navigation Bar */}
            <div className="container mx-auto px-4 -mt-10 relative z-10 mb-12">
                <div className="bg-secondary-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex justify-between md:justify-around overflow-x-auto gap-4 custom-scrollbar">
                    {[
                        { name: 'Movies', icon: '🍿', link: '#movies' },
                        { name: 'Concerts', icon: '🎸', link: '#events' },
                        { name: 'Sports', icon: '⚽', link: '#sports' },
                        { name: 'Plays', icon: '🎭', link: '#plays' },
                        { name: 'Activities', icon: '🎨', link: '#activities' },
                    ].map((cat, i) => (
                        <a href={cat.link} key={i} className="flex flex-col items-center gap-2 min-w-[80px] group transition-all hover:scale-110 isolate">
                            <div className="w-14 h-14 rounded-2xl bg-secondary-800 flex items-center justify-center text-2xl shadow-lg border border-white/5 group-hover:bg-primary-600 group-hover:border-primary-400 group-hover:shadow-primary-500/50 transition-all duration-300">
                                {cat.icon}
                            </div>
                            <span className="text-xs font-bold text-secondary-400 uppercase tracking-wider group-hover:text-white transition-colors">{cat.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Event Sections */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-20 space-y-8">
                <div id="movies"><Section title="Recommended Movies" data={movies} linkTo="/movies" /></div>
                <div id="streams" className="scroll-mt-32"><Section title="Online Events & Streams" data={streams} linkTo="/streams" /></div>
                <div id="concerts" className="scroll-mt-32"><Section title="Concerts & Gigs" data={concerts} linkTo="/concerts" /></div>
                <div id="sports" className="scroll-mt-32"><Section title="Top Sports Games" data={sports} linkTo="/sports" /></div>
                <div id="plays" className="scroll-mt-32"><Section title="Curated Plays & Theatre" data={plays} linkTo="/plays" /></div>
                <div id="activities" className="scroll-mt-32"><Section title="Activities Near You" data={activities} linkTo="/activities" /></div>
            </div>

            {/* Newsletter / Promo Strip */}
            <div className="bg-secondary-900 py-16 mt-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Available for Exclusive Offers</h2>
                    <p className="text-secondary-400 mb-8 max-w-2xl mx-auto">Get 10% off your first booking when you sign up for our newsletter. Be the first to know about new movie releases and special events.</p>
                    <div className="flex justify-center max-w-md mx-auto gap-2">
                        <input type="email" placeholder="Enter your email" className="input-field rounded-full px-6" />
                        <button className="btn btn-primary rounded-full px-8">Subscribe</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
