import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';

const MovieCard = ({ event }) => {
    return (
        <Link to={`/event/${event._id}`} className="block group">
            <div className="relative rounded-lg overflow-hidden h-[360px] shadow-card transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-card-hover">
                {/* Image */}
                <img
                    src={event.image || 'https://via.placeholder.com/300x450'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                    <div>
                        <div className="flex items-center gap-1 text-yellow-400 mb-1">
                            <FaStar size={14} />
                            <span className="text-sm font-bold">{event.rating || '8.5'}/10</span>
                            <span className="text-xs text-secondary-300 ml-1">({event.votes || '2K'} Votes)</span>
                        </div>
                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">{event.title}</h3>
                        <p className="text-secondary-300 text-sm mt-1 capitalize">{event.category} • {event.language || 'English'}</p>
                    </div>
                </div>

                {/* Hover Play/Book Action */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                    <button className="btn btn-primary rounded-full px-8 py-3 shadow-glow font-bold tracking-wide transform scale-95 group-hover:scale-100 transition-transform">
                        Book Now
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
