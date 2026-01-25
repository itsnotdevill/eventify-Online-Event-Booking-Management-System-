import React from 'react';

const SeatSelector = ({ event, selectedSeats, onSeatClick, peopleCount, category }) => {

    // Simulate rows/cols based on total seats for the category
    // Assuming 10 seats per row for layout simplicity
    const totalSeats = category.totalSeats || 50;
    const seatsPerRow = 10;
    const rows = Math.ceil(totalSeats / seatsPerRow);

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center mb-2 px-2">
                <h3 className="text-xl font-bold text-white">Select Seats</h3>
                <div className="text-sm text-secondary-400 bg-secondary-900 px-3 py-1 rounded-full border border-secondary-800">
                    <span className="font-bold text-primary-500">{selectedSeats.length}</span> / {peopleCount} selected
                </div>
            </div>

            <div className="bg-gradient-to-br from-secondary-900 to-secondary-950 p-6 rounded-2xl overflow-hidden shadow-2xl border border-secondary-800 relative">

                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                {/* Screen */}
                <div className="w-full flex flex-col items-center mb-10 perspective-1000">
                    {/* The Screen Bar */}
                    <div className="w-3/4 h-1.5 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent rounded-full shadow-[0_0_25px_4px_rgba(96,165,250,0.5)] mb-3"></div>
                    <p className="text-center text-[10px] text-blue-300/50 uppercase tracking-[0.5em] font-medium">Screen This Way</p>

                    {/* Light Cone Effect */}
                    <div className="w-2/3 h-16 bg-gradient-to-b from-blue-500/10 to-transparent clip-path-trapezoid mask-image-faded pointer-events-none"></div>
                </div>

                {/* Seats Grid */}
                <div className="flex justify-center overflow-x-auto pb-4 custom-scrollbar">
                    <div className="flex flex-col gap-3 min-w-max px-4">
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center gap-2 sm:gap-3">
                                <span className="w-4 text-[10px] text-secondary-600 font-mono mt-1 opacity-50 absolute left-8">{String.fromCharCode(65 + rowIndex)}</span>
                                {Array.from({ length: seatsPerRow }).map((_, colIndex) => {
                                    const seatIndex = rowIndex * seatsPerRow + colIndex;
                                    if (seatIndex >= totalSeats) return null;

                                    const seatId = `${category.name.charAt(0)}${seatIndex + 1}`;
                                    const isBooked = event.bookedSeats?.includes(seatId);
                                    const isSelected = selectedSeats.includes(seatId);

                                    // Curve effect by translating Y based on distance from center
                                    const centerOffset = Math.abs(colIndex - (seatsPerRow / 2));
                                    const translateY = centerOffset * 2;

                                    return (
                                        <button
                                            key={colIndex}
                                            disabled={isBooked}
                                            onClick={() => onSeatClick(seatId)}
                                            style={{ transform: `translateY(${translateY}px)` }}
                                            className={`
                                                relative w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg rounded-b-md text-[10px] sm:text-xs flex items-center justify-center transition-all duration-300
                                                group shadow-md border-b-2
                                                ${isBooked
                                                    ? 'bg-secondary-800 text-secondary-600 border-secondary-900 cursor-not-allowed opacity-50'
                                                    : isSelected
                                                        ? 'bg-green-500 text-white border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.5)] scale-110 z-10'
                                                        : 'bg-white text-secondary-900 border-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-700 hover:scale-110 hover:z-10 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                                                }
                                            `}
                                            title={`Seat ${seatId}`}
                                        >
                                            {/* Armrests visual */}
                                            <div className="absolute -left-[2px] bottom-1 w-[2px] h-3 bg-black/20 rounded-full"></div>
                                            <div className="absolute -right-[2px] bottom-1 w-[2px] h-3 bg-black/20 rounded-full"></div>

                                            {isSelected && <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>}

                                            {seatIndex + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-12 pt-6 border-t border-secondary-800/50">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white rounded border-b-2 border-gray-300"></div>
                        <span className="text-xs text-secondary-400">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded border-b-2 border-green-700 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                        <span className="text-xs text-white font-medium">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-secondary-800 rounded border-b-2 border-secondary-900 opacity-50"></div>
                        <span className="text-xs text-secondary-500">Sold Out</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelector;
