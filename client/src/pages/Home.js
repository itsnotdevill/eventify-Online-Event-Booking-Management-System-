import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import MainLayout from '../layouts/MainLayout';
import MovieCard from '../components/common/MovieCard';
import { BiChevronRight, BiPlayCircle } from 'react-icons/bi';

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

    const movies = events.filter(e => e.category === 'Movies');
    const sports = events.filter(e => e.category === 'Sports');
    const concerts = events.filter(e => e.category === 'Concerts');
    const plays = events.filter(e => e.category === 'Plays');
    const activities = events.filter(e => e.category === 'Activities');

    const Section = ({ title, data, linkTo, vertical = false }) => (
        <div className="py-12 border-b border-secondary-800/30 last:border-0">
            <div className="flex justify-between items-end mb-8 px-2">
                <h2 className="text-3xl font-display font-bold text-white tracking-wide border-l-4 border-primary-500 pl-4">{title}</h2>
                <a href={linkTo} className="text-sm font-bold text-secondary-400 hover:text-primary-400 uppercase tracking-widest flex items-center gap-1 group transition-colors">
                    See All <BiChevronRight className="transform group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="bg-secondary-900 rounded-2xl aspect-[2/3] animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className={`grid gap-6 ${vertical ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'}`}>
                    {data.slice(0, vertical ? 3 : 5).map(event => (
                        vertical ? (
                            // Horizontal/Wide Card for Top Concerts (as per reference)
                            <div key={event._id} className="group relative bg-secondary-900 rounded-2xl overflow-hidden shadow-card hover:shadow-neon transition-all duration-300 transform hover:-translate-y-1">
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/20 to-transparent"></div>
                                    <div className="absolute top-4 right-4 bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md uppercase tracking-wide">
                                        {event.category}
                                    </div>
                                </div>
                                <div className="p-6 relative">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors truncate">{event.title}</h3>
                                    <p className="text-secondary-400 text-sm mb-4">{new Date(event.date).toLocaleDateString()} • {event.venue}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="px-3 py-1 rounded bg-secondary-800 border border-secondary-700 text-xs text-secondary-300">
                                            {event.ticketCategories?.[0]?.name}
                                        </div>
                                        <button className="text-primary-500 font-bold text-sm uppercase tracking-wider hover:underline">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <MovieCard key={event._id} event={event} />
                        )
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <MainLayout showContainer={false}>
            {/* Hero / Promo Section */}
            <div className="relative w-full h-[600px] overflow-hidden bg-secondary-950 group">
                <div className="absolute inset-0 bg-[url('/public/assets/hero-banner.png')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                {/* Animated Gradient Blob Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-600/20 rounded-full blur-[120px]"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent"></div>

                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center pt-20">
                    <span className="bg-gradient-to-r from-primary-600 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 self-start shadow-neon inline-block animate-fade-in">Trending Now</span>
                    <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight max-w-4xl drop-shadow-2xl animate-slide-up">
                        Experience the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-pink-500 to-purple-500">Extraordinary</span>
                    </h1>
                    <p className="text-secondary-200 text-lg md:text-xl mb-10 font-light max-w-xl leading-relaxed opacity-90 animate-slide-up delay-100">
                        Book tickets for the biggest movies, electric concerts, and thrilling sports matches happening in your city.
                    </p>
                    <div className="flex items-center gap-4 animate-slide-up delay-200">
                        <button className="btn btn-primary px-10 py-4 rounded-full text-lg shadow-neon hover:scale-105 transition-transform flex items-center gap-2">
                            Get Started
                        </button>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white transition-all backdrop-blur-sm flex items-center gap-2">
                            <BiPlayCircle size={24} /> Watch Trailer
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Category Navigation (Glassmorphism Pilled) */}
            <div className="container mx-auto px-4 -mt-16 relative z-20 mb-16">
                <div className="bg-secondary-900/60 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl flex justify-between md:justify-around overflow-x-auto gap-4 custom-scrollbar">
                    {[
                        { name: 'Movies', icon: '🍿', link: '#movies' },
                        { name: 'Concerts', icon: '🎸', link: '#concerts' },
                        { name: 'Sports', icon: '⚽', link: '#sports' },
                        { name: 'Plays', icon: '🎭', link: '#plays' },
                        { name: 'Activities', icon: '🎨', link: '#activities' },
                    ].map((cat, i) => (
                        <a href={cat.link} key={i} className="flex flex-col items-center gap-3 min-w-[90px] group transition-all hover:-translate-y-2 py-2">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-800 to-secondary-900 flex items-center justify-center text-3xl shadow-lg border border-white/5 group-hover:from-primary-600 group-hover:to-pink-600 group-hover:border-primary-400 group-hover:shadow-neon transition-all duration-300">
                                {cat.icon}
                            </div>
                            <span className="text-xs font-bold text-secondary-400 uppercase tracking-wider group-hover:text-white transition-colors">{cat.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Sections */}
            <div className="container mx-auto px-4 md:px-8 space-y-4 pb-20">

                {/* Top Concerts - Highlighted Section */}
                <div id="concerts" className="scroll-mt-32">
                    <Section title="Top Concerts" data={concerts} linkTo="/events" vertical={true} />
                </div>

                <div id="movies" className="scroll-mt-32"><Section title="Recommended Movies" data={movies} linkTo="/movies" /></div>
                <div id="sports" className="scroll-mt-32"><Section title="Top Sports Games" data={sports} linkTo="/sports" /></div>
                <div id="plays" className="scroll-mt-32"><Section title="Curated Plays & Theatre" data={plays} linkTo="/plays" /></div>
                <div id="activities" className="scroll-mt-32"><Section title="Activities Near You" data={activities} linkTo="/activities" /></div>
            </div>

        </MainLayout>
    );
};

export default Home;
