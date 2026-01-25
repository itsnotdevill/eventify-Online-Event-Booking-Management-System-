import React, { useState, useEffect, useContext } from 'react';
import apiClient from '../services/apiClient';
import AuthContext from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import { BiMap, BiCalendarEvent, BiTime } from 'react-icons/bi';
import { BsQrCode } from 'react-icons/bs';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await apiClient.get('/bookings/mybookings');
                setBookings(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return (
        <MainLayout>
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8 animate-fade-in">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">My Digital Tickets</h1>
                    <p className="text-secondary-400">Scan these at the venue entry.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-secondary-900/30 rounded-3xl border border-secondary-800 border-dashed">
                        <h2 className="text-2xl font-bold text-white mb-4">No Bookings Found</h2>
                        <p className="text-secondary-400 mb-8">You haven't booked any events yet.</p>
                        <a href="/" className="btn btn-primary">Browse Events</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="relative group perspective-1000">
                                {/* Ticket Container */}
                                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col sm:flex-row h-auto sm:h-64 transition-transform transform hover:-translate-y-2 duration-300">

                                    {/* Left Side: Image & Date */}
                                    <div className="sm:w-1/3 relative overflow-hidden bg-black">
                                        <img
                                            src={booking.event?.image || 'https://via.placeholder.com/300x500'}
                                            alt={booking.event?.title}
                                            className="w-full h-48 sm:h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4">
                                            <div className="text-white font-bold text-2xl leading-none mb-1">
                                                {new Date(booking.event?.date).getDate()}
                                            </div>
                                            <div className="text-white/70 uppercase text-xs tracking-widest">
                                                {new Date(booking.event?.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Details */}
                                    <div className="sm:w-2/3 p-6 flex flex-col justify-between bg-white relative">
                                        {/* Perforation Line (Visual Only) */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[1px] border-l-2 border-dashed border-gray-300 hidden sm:block h-[90%] my-auto inset-y-0"></div>
                                        <div className="absolute -left-2 top-1/2 w-4 h-4 bg-secondary-950 rounded-full hidden sm:block"></div>

                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="tex-xl font-black text-gray-900 leading-tight line-clamp-2 uppercase tracking-tight">{booking.event?.title}</h3>
                                                <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                                    {booking.seatsBooked} Seat{booking.seatsBooked > 1 ? 's' : ''}
                                                </span>
                                            </div>

                                            <div className="space-y-2 mt-4">
                                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                                    <BiTime className="text-primary-600 text-lg" />
                                                    <span className="font-medium">{booking.event?.showTime || '19:00'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                                    <BiMap className="text-primary-600 text-lg" />
                                                    <span className="font-medium line-clamp-1">{booking.event?.venue}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer / Barcode Area */}
                                        <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-100 flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Booking ID</span>
                                                <span className="text-xs font-mono font-bold text-gray-800">{booking._id.slice(-8).toUpperCase()}</span>
                                            </div>
                                            <div className="opacity-90">
                                                {/* Simulated QR Code using Icon */}
                                                <BsQrCode size={48} className="text-gray-900" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Dashboard;
