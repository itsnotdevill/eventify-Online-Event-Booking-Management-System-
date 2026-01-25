import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-secondary-950 text-white">
            {/* Left Side - Brand/Image */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center p-12 group">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://assets-in.bmscdn.com/promotions/cms/creatives/1706382336630_web.jpg"
                        alt="Cinema Background"
                        className="w-full h-full object-cover opacity-40 transition-transform duration-10000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-lg text-center">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8 group/logo">
                        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center transform group-hover/logo:rotate-12 transition-transform">
                            <span className="text-white font-bold text-2xl">E</span>
                        </div>
                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary-400">
                            Eventify
                        </span>
                    </Link>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Experience Entertainment <span className="text-primary-500">Like Never Before</span>
                    </h1>
                    <p className="text-secondary-300 text-lg leading-relaxed">
                        Book tickets for the latest movies, exciting events, plays, sports, and much more.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 bg-secondary-950">
                <div className="max-w-md mx-auto w-full">
                    <div className="text-center md:text-left mb-8">
                        <Link to="/" className="md:hidden flex items-center justify-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">E</span>
                            </div>
                            <span className="text-2xl font-bold text-white">Eventify</span>
                        </Link>
                        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                        {subtitle && <p className="text-secondary-400">{subtitle}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
