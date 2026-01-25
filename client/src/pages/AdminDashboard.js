import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import EventContext from '../context/EventContext';
import MainLayout from '../layouts/MainLayout';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { BiPlus, BiTrash, BiCalendar, BiMap, BiTime, BiChair } from 'react-icons/bi';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const { events, fetchEvents, createEvent, deleteEvent } = useContext(EventContext);

    const [showModal, setShowModal] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Movies',
        date: '',
        venue: '',
        image: '',
        showTime: ''
    });

    // Ticket Categories State
    const [ticketCategories, setTicketCategories] = useState([
        { name: 'Standard', price: '', totalSeats: '' }
    ]);

    useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Category Changes
    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...ticketCategories];
        updatedCategories[index][field] = value;
        setTicketCategories(updatedCategories);
    };

    const addCategory = () => {
        setTicketCategories([...ticketCategories, { name: '', price: '', totalSeats: '' }]);
    };

    const removeCategory = (index) => {
        if (ticketCategories.length > 1) {
            const updatedCategories = ticketCategories.filter((_, i) => i !== index);
            setTicketCategories(updatedCategories);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        // Validation for categories
        const validCategories = ticketCategories.map(cat => ({
            name: cat.name,
            price: Number(cat.price),
            totalSeats: Number(cat.totalSeats)
        }));

        if (validCategories.some(c => !c.name || !c.price || !c.totalSeats)) {
            alert('Please fill out all ticket category fields.');
            setFormLoading(false);
            return;
        }

        const payload = {
            ...formData,
            ticketCategories: validCategories
        };

        try {
            await createEvent(payload, user.token);
            setShowModal(false);
            setFormData({
                title: '', description: '', category: 'Movies', date: '', venue: '', image: '', showTime: ''
            });
            setTicketCategories([{ name: 'Standard', price: '', totalSeats: '' }]);
            alert('Event created successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating event');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            try {
                await deleteEvent(id, user.token);
            } catch (error) {
                console.error(error);
                alert('Failed to delete event');
            }
        }
    };

    // Helper to get total capacity
    const getTotalCapacity = (event) => {
        if (event.ticketCategories && event.ticketCategories.length > 0) {
            return event.ticketCategories.reduce((acc, cat) => acc + cat.totalSeats, 0);
        }
        return event.totalSeats || 0; // Fallback
    };

    // Helper to get start price
    const getStartPrice = (event) => {
        if (event.ticketCategories && event.ticketCategories.length > 0) {
            const prices = event.ticketCategories.map(c => c.price);
            return Math.min(...prices);
        }
        return event.price || 0; // Fallback
    };

    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-secondary-900">Event Administration</h1>
                    <p className="text-secondary-500 mt-1">Create and manage your organization's events</p>
                </div>
                <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <BiPlus size={20} /> Create New Event
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
                <div className="p-5 border-b border-secondary-200 flex justify-between items-center bg-secondary-50">
                    <h2 className="font-semibold text-secondary-800">All Events</h2>
                    <div className="text-sm text-secondary-500">{events.length} Total</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-secondary-200">
                        <thead className="bg-secondary-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Event Details</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Date & Venue</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Show Info</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Starting Price</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-secondary-200">
                            {events.map(event => (
                                <tr key={event._id} className="hover:bg-secondary-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-12 w-9 flex-shrink-0 rounded-md bg-secondary-100 overflow-hidden relative shadow-sm">
                                                {event.image ? (
                                                    <img className="h-full w-full object-cover" src={event.image} alt="" />
                                                ) : <span className="flex h-full w-full items-center justify-center text-xs text-secondary-500">Img</span>}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-secondary-900">{event.title}</div>
                                                <div className="text-sm text-secondary-500">{event.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-secondary-900 flex items-center gap-1"><BiCalendar className="text-secondary-400" /> {new Date(event.date).toLocaleDateString()}</div>
                                        <div className="text-sm text-secondary-500 flex items-center gap-1 mt-1"><BiMap className="text-secondary-400" /> {event.venue?.split(':')[0]}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-secondary-900 flex items-center gap-1">
                                            <BiTime className="text-secondary-400" /> {event.showTime || 'N/A'}
                                        </div>
                                        <div className="text-sm text-secondary-500 flex items-center gap-1 mt-1">
                                            <BiChair className="text-secondary-400" /> {getTotalCapacity(event)} Seats
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 font-medium">
                                        ₹{getStartPrice(event)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full hover:bg-red-100 transition">
                                            <BiTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Event Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Event" size="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Event Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Annual Tech Summit"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="Movies">Movies</option>
                                <option value="Conference">Conference</option>
                                <option value="Concert">Concert</option>
                                <option value="Sports">Sports</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Plays">Plays</option>
                            </select>
                        </div>
                        <Input
                            label="Show Time"
                            type="time"
                            name="showTime"
                            value={formData.showTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Event Date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Venue Location"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="e.g. Grand Hall, NYC"
                            required
                        />
                    </div>

                    {/* Ticket Categories Section */}
                    <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-secondary-900">Ticket Categories</label>
                            <button type="button" onClick={addCategory} className="text-xs text-primary-600 font-bold hover:underline">+ Add Category</button>
                        </div>

                        {ticketCategories.map((cat, index) => (
                            <div key={index} className="flex gap-2 mb-2 items-end">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Name (e.g. Gold)"
                                        className="input-field text-sm py-1"
                                        value={cat.name}
                                        onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-24">
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        className="input-field text-sm py-1"
                                        value={cat.price}
                                        onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-24">
                                    <input
                                        type="number"
                                        placeholder="Seats"
                                        className="input-field text-sm py-1"
                                        value={cat.totalSeats}
                                        onChange={(e) => handleCategoryChange(index, 'totalSeats', e.target.value)}
                                        required
                                    />
                                </div>
                                {ticketCategories.length > 1 && (
                                    <button type="button" onClick={() => removeCategory(index)} className="text-red-500 p-2">
                                        <BiTrash />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Describe the event..."
                            required
                        ></textarea>
                    </div>

                    <Input
                        label="Cover Image URL (Vertical Poster)"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://..."
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t border-secondary-100 mt-4">
                        <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" variant="primary" isLoading={formLoading}>Create Event</Button>
                    </div>
                </form>
            </Modal>
        </MainLayout>
    );
};

export default AdminDashboard;
