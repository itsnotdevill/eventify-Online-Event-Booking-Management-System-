import React from 'react';
import { Link } from 'react-router-dom';
import { RiStarFill } from 'react-icons/ri';

const PosterCard = ({ event }) => {
    return (
        <Link to={`/event/${event._id}`} className="block relative flex-shrink-0 w-[180px] md:w-[220px] group cursor-pointer">
            {/* Poster Image */}
            <div className="rounded-lg overflow-hidden h-[270px] md:h-[330px] w-full mb-3 shadow-md group-hover:shadow-xl transition-all duration-300 relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>

                {/* Rating Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white px-3 py-1 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-semibold">
                        <RiStarFill className="text-primary-500 text-sm" />
                        <span>8.5/10</span>
                        <span className="text-gray-400 font-normal ml-1">Votes</span>
                    </div>
                </div>
            </div>

            {/* Info */}
            <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 mb-1 group-hover:underline decoration-gray-900">
                {event.title}
            </h3>
            <p className="text-sm text-gray-500 truncate">{event.category} • {event.venue?.split(':')[0]}</p>
        </Link>
    );
};

export default PosterCard;
