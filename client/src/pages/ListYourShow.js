import React from 'react';
import { BiMask, BiCameraMovie, BiMicrophone, BiFootball, BiRightArrowAlt } from 'react-icons/bi';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

const ListYourShow = () => {
    const features = [
        { icon: <BiCameraMovie size={32} />, title: "Movies & Screenings", desc: "List your independent film screenings or theatre shows." },
        { icon: <BiMicrophone size={32} />, title: "Concerts & Gigs", desc: "Reach thousands of music lovers in your city." },
        { icon: <BiMask size={32} />, title: "Plays & Performances", desc: "Showcase your theatre group productions." },
        { icon: <BiFootball size={32} />, title: "Sports & Activities", desc: "Organize tournaments, treks, or workshops." }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden mb-16 bg-gradient-to-r from-secondary-900 to-secondary-950 border border-secondary-800">
                <div className="absolute inset-0 bg-primary-900/10 pattern-grid-lg opacity-20"></div>
                <div className="relative z-10 px-8 py-20 md:py-32 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
                        Host Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-500">Event</span>
                    </h1>
                    <p className="text-xl text-secondary-300 mb-10 leading-relaxed">
                        Partner with Eventify to list your shows, sell tickets, and manage your audience.
                        We provide the tools you need to make your event a success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" className="px-10 py-4 text-lg shadow-xl shadow-primary-600/20">
                            List Your Show
                        </Button>
                        <Button variant="outline" className="px-10 py-4 text-lg">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {features.map((opt, idx) => (
                    <div key={idx} className="bg-secondary-900/50 p-8 rounded-2xl border border-secondary-800 hover:border-primary-500/50 transition-all hover:transform hover:-translate-y-2 group cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-secondary-800 flex items-center justify-center text-primary-400 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                            {opt.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{opt.title}</h3>
                        <p className="text-secondary-400">{opt.desc}</p>
                    </div>
                ))}
            </div>

            {/* Why Choose Us */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Why Partner with Eventify?</h2>
                    <ul className="space-y-6">
                        {[
                            "Access to millions of entertainment seekers",
                            "Real-time sales dashboard and analytics",
                            "Secure payment processing and instant payouts",
                            "Dedicated marketing support and promotion"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-lg text-secondary-300">
                                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <BiRightArrowAlt />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-gradient-to-br from-secondary-900 to-black p-8 rounded-3xl border border-secondary-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="text-center py-12">
                        <div className="text-6xl font-bold text-white mb-2">10M+</div>
                        <p className="text-secondary-400 uppercase tracking-widest text-sm mb-8">Tickets Sold</p>

                        <div className="text-6xl font-bold text-white mb-2">500+</div>
                        <p className="text-secondary-400 uppercase tracking-widest text-sm mb-8">Live Cities</p>

                        <div className="text-6xl font-bold text-white mb-2">99.9%</div>
                        <p className="text-secondary-400 uppercase tracking-widest text-sm">Uptime Reliability</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ListYourShow;
