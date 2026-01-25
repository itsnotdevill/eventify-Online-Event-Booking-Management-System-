import React, { useState, useContext } from 'react';
import { BiUser, BiEnvelope, BiPhone, BiMap, BiSave, BiCamera } from 'react-icons/bi';
import apiClient from '../services/apiClient';
import AuthContext from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        try {
            await apiClient.put('/auth/profile', formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong' });
        } finally {
            setIsLoading(false);
        }
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U';
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                    <p className="text-secondary-400">Manage your personal information and preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* User Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-secondary-900/50 backdrop-blur-sm border border-secondary-800 rounded-2xl p-6 text-center shadow-lg">
                            <div className="relative inline-block mb-4 group cursor-pointer">
                                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-primary-500/20 border-4 border-secondary-900">
                                    {getInitials(user?.name)}
                                </div>
                                <div className="absolute bottom-0 right-2 bg-secondary-800 p-2 rounded-full border border-secondary-700 text-secondary-300 group-hover:text-primary-400 transition-colors">
                                    <BiCamera size={20} />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-1">{user?.name || 'User'}</h2>
                            <p className="text-sm text-secondary-400 mb-6">{user?.email}</p>

                            <div className="w-full bg-secondary-950/50 rounded-xl p-4 border border-secondary-800 text-left space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-secondary-500">Member Since</span>
                                    <span className="text-secondary-300">Jan 2024</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-secondary-500">Account Type</span>
                                    <span className="text-primary-400 font-medium capitalize">{user?.role || 'Personal'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor Form */}
                    <div className="md:col-span-2">
                        <div className="bg-secondary-900/50 backdrop-blur-sm border border-secondary-800 rounded-2xl p-8 shadow-lg">
                            {message && (
                                <div className={`p-4 mb-6 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider ml-1">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-500">
                                                <BiUser size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-secondary-950 border border-secondary-800 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-secondary-600"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider ml-1">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-500">
                                                <BiEnvelope size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                disabled
                                                className="w-full bg-secondary-950/50 border border-secondary-800 text-secondary-400 rounded-xl pl-11 pr-4 py-3 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider ml-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-500">
                                            <BiPhone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-secondary-950 border border-secondary-800 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-secondary-600"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider ml-1">Address</label>
                                    <div className="relative">
                                        <div className="absolute top-3.5 left-4 flex items-start pointer-events-none text-secondary-500">
                                            <BiMap size={18} />
                                        </div>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full bg-secondary-950 border border-secondary-800 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-secondary-600 resize-none"
                                            placeholder="123 Event St, City, Country"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-secondary-800">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full md:w-auto px-8 py-3 flex items-center justify-center gap-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : (
                                            <>
                                                <BiSave size={20} />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;
