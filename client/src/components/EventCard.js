import React from 'react';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import { RiCalendarEventLine, RiMapPinLine } from 'react-icons/ri';

const EventCard = ({ event }) => {
    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Date TBA';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Calculate starting price
    const getPrice = () => {
        if (!event.ticketCategories || event.ticketCategories.length === 0) return 'Free';
        const prices = event.ticketCategories.map(cat => cat.price);
        const minPrice = Math.min(...prices);
        return `₹${minPrice}`; // Using Rupee symbol as per context (Indian cities/events)
    };

    return (
        <Link to={`/event/${event._id}`} className="block group h-full">
            <div className="bg-secondary-900 rounded-xl overflow-hidden shadow-lg border border-secondary-800 transition-all duration-300 hover:shadow-primary-900/20 hover:border-primary-500/50 hover:-translate-y-1 h-full flex flex-col">
                <div className="relative overflow-hidden aspect-[2/3]">
                    <img
                        src={event.image || '/assets/placeholder.png'}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent opacity-60"></div>

                    <div className="absolute top-3 right-3">
                        <span className="bg-secondary-950/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-secondary-800 shadow-xl uppercase tracking-wider">
                            {event.category || 'Event'}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Book Now
                        </button>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary-400 transition-colors">
                        {event.title}
                    </h3>

                    <div className="mt-auto space-y-3 pt-4 border-t border-secondary-800/50">
                        <div className="flex items-center text-sm text-secondary-400">
                            <RiCalendarEventLine className="mr-2 text-primary-500 shrink-0" size={18} />
                            <span>{event.date ? formatDate(event.date) : 'Upcoming'}</span>
                        </div>
                        <div className="flex items-center text-sm text-secondary-400">
                            <RiMapPinLine className="mr-2 text-primary-500 shrink-0" size={18} />
                            <span className="truncate">{event.venue || event.location || 'Online'}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-2">
                            <span className="text-xs text-secondary-500 uppercase tracking-wider font-medium">Starting from</span>
                            <span className="text-white font-bold text-lg text-primary-400">
                                {getPrice()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
