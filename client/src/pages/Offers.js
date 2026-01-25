import React from 'react';
import { BiCreditCard, BiCopy, BiPurchaseTag } from 'react-icons/bi';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

const Offers = () => {
    const offers = [
        {
            bank: "HDFC Bank",
            title: "20% Off on Movie Tickets",
            desc: "Get up to ₹200 off on booking 2 or more movie tickets with HDFC Credit Cards.",
            code: "HDFC20",
            bg: "from-blue-900 to-blue-950",
            icon: <BiCreditCard size={40} />
        },
        {
            bank: "ICICI Bank",
            title: "Buy 1 Get 1 Free",
            desc: "Valid on Saturday & Sunday shows for ICICI Coral and Rubyx Credit Cards.",
            code: "ICICIBOGO",
            bg: "from-orange-900 to-red-950",
            icon: <BiCreditCard size={40} />
        },
        {
            bank: "Eventify Special",
            title: "Flat ₹100 Off",
            desc: "Use code WELCOME100 on your first booking of ₹500 or more.",
            code: "WELCOME100",
            bg: "from-primary-900 to-purple-950",
            icon: <BiPurchaseTag size={40} />
        },
        {
            bank: "Axis Bank",
            title: "5X Reward Points",
            desc: "Earn 5X reward points on all entertainment bookings via Axis Mobile App.",
            code: "AXIS5X",
            bg: "from-red-900 to-pink-950",
            icon: <BiCreditCard size={40} />
        }
    ];

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Coupen ${code} Copied!`);
    };

    return (
        <MainLayout>
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Exclusive Offers</h1>
                <p className="text-secondary-400 max-w-2xl mx-auto">
                    Save more on your entertainment! Explore the best deals, discounts, and credit card offers available on Eventify.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {offers.map((offer, idx) => (
                    <div key={idx} className={`relative overflow-hidden rounded-2xl border border-white/10 p-1`}>
                        <div className={`h-full bg-gradient-to-br ${offer.bg} p-6 rounded-xl flex flex-col justify-between`}>
                            <div className="flex justify-between items-start mb-6 align-top">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white mb-3">
                                        {offer.bank}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white leading-tight mb-2">{offer.title}</h3>
                                    <p className="text-white/70 text-sm">{offer.desc}</p>
                                </div>
                                <div className="text-white/80 p-2 bg-white/10 rounded-lg">
                                    {offer.icon}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-2">
                                <div className="flex-1 bg-black/30 rounded-lg px-4 py-3 border border-white/5 border-dashed flex justify-between items-center group cursor-pointer" onClick={() => copyCode(offer.code)}>
                                    <span className="text-white font-mono tracking-widest font-bold">{offer.code}</span>
                                    <BiCopy className="text-white/50 group-hover:text-white transition-colors" />
                                </div>
                                <Button className="px-6 py-3 bg-white text-secondary-900 hover:bg-white/90 font-bold border-none">
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-secondary-900/50 border border-secondary-800 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold text-white mb-2">Have a Gift Card?</h3>
                <p className="text-secondary-400 mb-6">Redeem your Eventify Gift Card during checkout for instant savings.</p>
                <div className="inline-flex bg-secondary-950 p-1 rounded-lg border border-secondary-800">
                    <input type="text" placeholder="Enter Gift Card Code" className="bg-transparent px-4 py-2 text-white focus:outline-none w-64" />
                    <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-md font-medium transition-colors">Check Balance</button>
                </div>
            </div>
        </MainLayout>
    );
};

export default Offers;
