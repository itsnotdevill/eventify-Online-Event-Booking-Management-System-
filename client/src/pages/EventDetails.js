import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import AuthContext from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { RiCalendarLine, RiMapPinLine, RiTimeLine } from 'react-icons/ri';
import { BiChair, BiCheckCircle, BiCreditCard, BiLockAlt } from 'react-icons/bi';
import toast from 'react-hot-toast';
import SeatSelector from '../components/booking/SeatSelector';
import PaymentForm from '../components/booking/PaymentForm';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Booking State
    const [step, setStep] = useState(1); // 1: People, 2: Category, 3: Seats, 4: Payment
    const [peopleCount, setPeopleCount] = useState(2);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Payment Form State (Simulated)
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await apiClient.get(`/events/${id}`);
                setEvent(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setStep(3);
    };

    const toggleSeat = (seatId) => {
        if (event.bookedSeats && event.bookedSeats.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            if (selectedSeats.length < peopleCount) {
                setSelectedSeats([...selectedSeats, seatId]);
            } else {
                toast.error(`You can only select ${peopleCount} seats.`);
            }
        }
    };

    const handlePaymentChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handleBook = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }

        // Simulate Payment Processing
        setBookingLoading(true);

        // Calculate Total Amount
        const subtotal = selectedSeats.length * selectedCategory.price;
        const convenienceFee = Math.round(subtotal * 0.05); // 5% fee
        const totalAmount = subtotal + convenienceFee;

        // 2 Second Delay to simulate Gateway
        setTimeout(async () => {
            try {
                await apiClient.post('/bookings', {
                    eventId: event._id,
                    seatsBooked: selectedSeats.length,
                    seatNumbers: selectedSeats,
                    totalAmount
                });

                setPaymentSuccess(true);
                setTimeout(() => {
                    navigate('/my-bookings');
                }, 2000); // Wait for success animation

            } catch (error) {
                toast.error(error.response?.data?.message || 'Booking failed');
                setBookingLoading(false);
            }
        }, 2000);
    };

    // Render Steps
    const renderStep = () => {
        if (paymentSuccess) {
            return (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                    <BiCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h3 className="text-2xl font-bold text-white">Booking Confirmed!</h3>
                    <p className="text-secondary-400 mt-2">Redirecting to your tickets...</p>
                </div>
            );
        }

        switch (step) {
            case 1: // How many people?
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-white">How many people?</h3>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setPeopleCount(num)}
                                    className={`w-12 h-12 rounded-full font-bold flex-shrink-0 transition-all ${peopleCount === num
                                        ? 'bg-primary-600 text-white scale-110 shadow-lg ring-2 ring-primary-900'
                                        : 'bg-secondary-800 border border-secondary-700 text-secondary-300 hover:border-primary-500 hover:text-white'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <Button className="w-full mt-4" onClick={() => setStep(2)}>
                            Select Category
                        </Button>
                    </div>
                );
            case 2: // Select Category
                return (
                    <div className="space-y-4 animate-fade-in">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-white">Select Category</h3>
                            <button onClick={() => setStep(1)} className="text-sm text-primary-500 hover:underline">Edit Count</button>
                        </div>
                        {event.ticketCategories?.length > 0 ? (
                            event.ticketCategories.map((cat, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleCategorySelect(cat)}
                                    className="p-4 border border-secondary-800 bg-secondary-900/50 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-secondary-800 transition flex justify-between items-center group"
                                >
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-primary-500">{cat.name}</h4>
                                        <p className="text-sm text-secondary-400">{cat.totalSeats} seats total</p>
                                    </div>
                                    <span className="font-bold text-primary-500 text-lg">₹{cat.price}</span>
                                </div>
                            ))
                        ) : (
                            // Fallback if no categories seeded
                            <div className="p-4 border border-red-900/50 rounded-lg bg-red-900/10 text-red-500">
                                No ticket categories available.
                            </div>
                        )}
                    </div>
                );
            case 3: // Select Seats
                return (
                    <div>
                        <SeatSelector
                            event={event}
                            selectedSeats={selectedSeats}
                            onSeatClick={toggleSeat}
                            peopleCount={peopleCount}
                            category={selectedCategory}
                        />
                        <div className="flex justify-between gap-4 pt-4">
                            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                            <Button
                                variant="primary"
                                className="flex-1"
                                disabled={selectedSeats.length !== peopleCount}
                                onClick={() => setStep(4)}
                            >
                                Proceed to Pay
                            </Button>
                        </div>
                    </div>
                );
            case 4: // Payment
                const subtotal = selectedSeats.length * selectedCategory.price;
                const convenienceFee = Math.round(subtotal * 0.05); // 5% simulated fee
                const grandTotal = subtotal + convenienceFee;

                return (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <button onClick={() => setStep(3)} className="text-sm text-primary-500 hover:underline">Edit Seats</button>
                        </div>
                        <PaymentForm
                            paymentDetails={paymentDetails}
                            onChange={handlePaymentChange}
                            onSubmit={handleBook}
                            loading={bookingLoading}
                            amount={grandTotal}
                            bookingSummary={{
                                count: selectedSeats.length,
                                category: selectedCategory.name,
                                subtotal,
                                fee: convenienceFee,
                                total: grandTotal
                            }}
                        />
                    </div>
                );
            default: return null;
        }
    }

    if (loading) return (
        <MainLayout>
            <div className="flex justify-center items-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        </MainLayout>
    );

    if (!event) return <div className="p-8 text-center text-red-500">Event not found</div>;

    return (
        <MainLayout>
            {/* Background Blur Effect */}
            <div className="absolute inset-0 h-[500px] overflow-hidden -z-10">
                <img src={event.image} alt="bg" className="w-full h-full object-cover blur-3xl opacity-20 scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Event Info - Left Col */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                            <img src={event.image || 'https://via.placeholder.com/800'} alt={event.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/40 to-transparent flex items-end p-6 md:p-8">
                                <div className="text-white w-full">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-wider mb-3 bg-primary-600 inline-block px-3 py-1 rounded-md shadow-sm">{event.category}</div>
                                            <h1 className="text-3xl md:text-5xl font-bold mb-2 leading-tight">{event.title}</h1>
                                            {/* Rating Placeholder */}
                                            <div className="flex items-center gap-2 text-yellow-400 mb-0">
                                                <span className="text-lg">★★★★☆</span>
                                                <span className="text-white/70 text-sm">(8.4/10)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-6 flex flex-col md:flex-row gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-sm"><RiCalendarLine size={24} /></div>
                                <div>
                                    <p className="text-xs text-secondary-400 uppercase font-bold tracking-wide">Date</p>
                                    <p className="font-semibold text-white text-lg">{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-sm"><RiTimeLine size={24} /></div>
                                <div>
                                    <p className="text-xs text-secondary-400 uppercase font-bold tracking-wide">Time</p>
                                    <p className="font-semibold text-white text-lg">{event.showTime || '19:00'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-sm"><RiMapPinLine size={24} /></div>
                                <div>
                                    <p className="text-xs text-secondary-400 uppercase font-bold tracking-wide">Venue</p>
                                    <p className="font-semibold text-white text-lg">{event.venue}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-primary-500 pl-3">About the Event</h3>
                            <p className="text-secondary-300 leading-relaxed whitespace-pre-line text-lg">{event.description}</p>
                        </div>
                    </div>

                    {/* Booking Flow - Right Col */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-secondary-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-secondary-800">
                            {renderStep()}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default EventDetails;
