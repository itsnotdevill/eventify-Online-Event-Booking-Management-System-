import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import apiClient from '../services/apiClient';
import MainLayout from '../layouts/MainLayout';
import EventCard from '../components/EventCard';
import EventCardSkeleton from '../components/ui/EventCardSkeleton';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { BiSearch, BiFilter } from 'react-icons/bi';

const Events = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Handle initial filter based on URL path or params
    useEffect(() => {
        const path = location.pathname.substring(1); // remove leading slash
        const catParam = searchParams.get('category');

        if (catParam) {
            setCategoryFilter(catParam);
        } else if (['movies', 'stream', 'events', 'plays', 'sports', 'activities'].includes(path)) {
            // Map path to category name (Capitalized)
            const categoryMap = {
                'movies': 'Movies',
                'stream': 'Stream',
                'events': 'Concerts', // 'Events' in navbar usually maps to Concerts/Gigs based on context, or general 'Events'
                'plays': 'Plays',
                'sports': 'Sports',
                'activities': 'Activities'
            };
            setCategoryFilter(categoryMap[path] || 'All');
        } else {
            setCategoryFilter('All');
        }
    }, [location, searchParams]);

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

    useEffect(() => {
        let result = events;

        if (searchTerm) {
            result = result.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.venue?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter !== 'All') {
            // Special case for 'Events' mapping if needed, but we use strict category names
            result = result.filter(event => event.category === categoryFilter);
        }

        setFilteredEvents(result);
    }, [searchTerm, categoryFilter, events]);

    const categories = ['All', 'Movies', 'Stream', 'Concerts', 'Sports', 'Plays', 'Activities'];

    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row gap-8 min-h-screen">
                {/* Sidebar Filters */}
                <div className="w-full md:w-72 flex-shrink-0 space-y-6">
                    <div className="bg-secondary-900/50 backdrop-blur-sm p-6 rounded-2xl border border-secondary-800 sticky top-24">
                        <div className="flex items-center gap-3 font-bold text-white text-lg mb-6 border-b border-secondary-800 pb-4">
                            <BiFilter className="text-primary-500" size={24} />
                            <span>Filters</span>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="text-xs font-bold text-secondary-500 uppercase tracking-widest block mb-4">Category</label>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat} className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all ${categoryFilter === cat ? 'bg-primary-900/30 text-primary-100 border border-primary-500/30' : 'text-secondary-400 hover:text-white hover:bg-secondary-800'}`}>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${categoryFilter === cat ? 'border-primary-500' : 'border-secondary-600'}`}>
                                                {categoryFilter === cat && <div className="w-2 h-2 bg-primary-500 rounded-full"></div>}
                                            </div>
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat}
                                                checked={categoryFilter === cat}
                                                onChange={(e) => setCategoryFilter(e.target.value)}
                                                className="hidden"
                                            />
                                            <span className="font-medium text-sm">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-secondary-500 uppercase tracking-widest block mb-4">Price Range</label>
                                <div className="px-2">
                                    <input type="range" className="w-full h-1 bg-secondary-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                                    <div className="flex justify-between text-xs text-secondary-500 mt-3 font-medium">
                                        <span>Free</span>
                                        <span>₹5000+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow">
                    {/* Header & Search */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-secondary-900/30 p-4 rounded-2xl border border-secondary-800/50">
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            {categoryFilter === 'All' ? 'Discover All Events' : `Explore ${categoryFilter}`}
                        </h1>
                        <div className="relative w-full sm:w-auto sm:min-w-[320px] group">
                            <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-500 group-focus-within:text-primary-500 transition-colors" size={20} />
                            <Input
                                placeholder="Search for movies, events, sports..."
                                className="pl-12 bg-secondary-950 border-secondary-800 text-white focus:ring-primary-500/50 focus:border-primary-500 h-12 rounded-xl w-full transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <EventCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {filteredEvents.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 animate-fade-in pb-20">
                                    {filteredEvents.map(event => (
                                        <EventCard key={event._id} event={event} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-32 bg-secondary-900/30 rounded-3xl border border-dashed border-secondary-800">
                                    <div className="mb-4 text-secondary-600 inline-block p-4 rounded-full bg-secondary-900">
                                        <BiSearch size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
                                    <p className="text-secondary-400 max-w-md mx-auto mb-8">We couldn't find any events matching your filters. Try adjusting your search or category.</p>
                                    <Button
                                        variant="outline"
                                        className="border-primary-600 text-primary-500 hover:bg-primary-600 hover:text-white transition-all px-8 py-3 rounded-xl"
                                        onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }}
                                    >
                                        Clear All Filters
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Events;
