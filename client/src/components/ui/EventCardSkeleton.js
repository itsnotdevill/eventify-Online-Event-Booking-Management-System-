import React from 'react';

const EventCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-secondary-200 animate-pulse h-full flex flex-col">
            {/* Image Placeholder */}
            <div className="h-48 bg-secondary-200 w-full relative">
                <div className="absolute top-4 left-4 w-16 h-6 bg-secondary-300 rounded-md"></div>
            </div>

            {/* Content Placeholder */}
            <div className="p-5 flex-1 flex flex-col space-y-4">
                <div className="space-y-2">
                    <div className="h-6 bg-secondary-200 rounded w-3/4"></div>
                    <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-200"></div>
                        <div className="h-4 bg-secondary-200 rounded w-1/3"></div>
                    </div>
                </div>

                <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="h-4 bg-secondary-200 rounded w-1/4"></div>
                    <div className="h-8 bg-secondary-200 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
