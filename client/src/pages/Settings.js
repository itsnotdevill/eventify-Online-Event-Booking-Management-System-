import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [theme, setTheme] = useState('light');

    const handleSave = () => {
        // Save to local storage or backend
        alert('Settings saved!');
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-secondary-200">
                <h1 className="text-2xl font-bold mb-6 text-secondary-900">Settings</h1>

                <div className="space-y-8">
                    {/* Notifications */}
                    <div className="flex items-center justify-between pb-6 border-b border-secondary-100">
                        <div>
                            <h3 className="text-lg font-medium text-secondary-900">Email Notifications</h3>
                            <p className="text-sm text-secondary-500">Receive updates about your bookings and upcoming events.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                            />
                            <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>

                    {/* Theme */}
                    <div className="flex items-center justify-between pb-6 border-b border-secondary-100">
                        <div>
                            <h3 className="text-lg font-medium text-secondary-900">Appearance</h3>
                            <p className="text-sm text-secondary-500">Choose your preferred interface theme.</p>
                        </div>
                        <div className="flex bg-secondary-100 rounded-lg p-1">
                            <button
                                onClick={() => setTheme('light')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${theme === 'light' ? 'bg-white text-secondary-900 shadow-sm' : 'text-secondary-500 hover:text-secondary-900'}`}
                            >
                                Light
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${theme === 'dark' ? 'bg-secondary-800 text-white shadow-sm' : 'text-secondary-500 hover:text-secondary-900'}`}
                            >
                                Dark
                            </button>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div>
                        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
                            Delete Account
                        </Button>
                    </div>

                    <div className="pt-4">
                        <Button onClick={handleSave} variant="primary" className="w-full">
                            Save Preferences
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Settings;
