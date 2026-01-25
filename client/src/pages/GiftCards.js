import React, { useState } from 'react';
import { BiGift, BiCheckCircle } from 'react-icons/bi';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

const GiftCards = () => {
    const [selectedAmount, setSelectedAmount] = useState(1000);
    const amounts = [500, 1000, 2000, 5000];

    const [selectedDesign, setSelectedDesign] = useState(0);
    const designs = [
        { name: "Generic", color: "from-primary-600 to-indigo-600" },
        { name: "Birthday", color: "from-pink-500 to-rose-600" },
        { name: "Anniversary", color: "from-purple-500 to-violet-600" },
        { name: "Congratulations", color: "from-yellow-400 to-orange-500" }
    ];

    return (
        <MainLayout>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Preview */}
                <div>
                    <h1 className="text-4xl font-bold text-white mb-6">Eventify E-Gift Cards</h1>
                    <p className="text-secondary-400 mb-8 text-lg">
                        Give the gift of entertainment. Perfect for birthdays, anniversaries, or just to say thank you.
                    </p>

                    <div className="relative group perspective-1000">
                        <div className={`w-full max-w-md mx-auto aspect-video rounded-2xl bg-gradient-to-br ${designs[selectedDesign].color} p-8 shadow-2xl shadow-${designs[selectedDesign].color.split('-')[1]}-500/20 flex flex-col justify-between transform transition-all duration-500 hover:scale-105`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-3xl font-extrabold text-white tracking-tight mb-1">Eventify</h3>
                                    <p className="text-white/80 font-medium tracking-widest uppercase text-xs">Gift Card</p>
                                </div>
                                <BiGift className="text-white/50" size={48} />
                            </div>

                            <div>
                                <p className="text-white font-mono text-2xl font-bold mb-2">₹ {selectedAmount}</p>
                                <p className="text-white/70 text-sm">Valid for 12 months from issue</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Configuration Form */}
                <div className="bg-secondary-900/50 border border-secondary-800 p-8 rounded-2xl">
                    <h2 className="text-xl font-bold text-white mb-6">Customize Your Gift Card</h2>

                    <div className="mb-8">
                        <label className="block text-secondary-400 text-sm font-bold mb-3 uppercase">Select Occasion</label>
                        <div className="grid grid-cols-2 gap-4">
                            {designs.map((d, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedDesign(idx)}
                                    className={`p-3 rounded-lg border text-sm font-medium transition-all text-left flex items-center justify-between ${selectedDesign === idx ? 'bg-primary-600 border-primary-500 text-white' : 'bg-secondary-950 border-secondary-800 text-secondary-400 hover:border-secondary-600'}`}
                                >
                                    {d.name}
                                    {selectedDesign === idx && <BiCheckCircle />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-secondary-400 text-sm font-bold mb-3 uppercase">Select Amount</label>
                        <div className="flex gap-4">
                            {amounts.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => setSelectedAmount(amt)}
                                    className={`flex-1 py-3 rounded-lg border text-sm font-bold transition-all ${selectedAmount === amt ? 'bg-white text-black border-white' : 'bg-secondary-950 border-secondary-800 text-secondary-400 hover:border-secondary-600'}`}
                                >
                                    ₹{amt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div>
                            <label className="block text-secondary-400 text-xs font-bold mb-2 uppercase">Recipient's Email</label>
                            <input type="email" className="w-full bg-secondary-950 border border-secondary-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500" placeholder="friend@example.com" />
                        </div>
                        <div>
                            <label className="block text-secondary-400 text-xs font-bold mb-2 uppercase">Your Name</label>
                            <input type="text" className="w-full bg-secondary-950 border border-secondary-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500" placeholder="John Doe" />
                        </div>
                    </div>

                    <Button variant="primary" className="w-full py-4 text-lg">
                        Proceed to Pay ₹{selectedAmount}
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default GiftCards;
