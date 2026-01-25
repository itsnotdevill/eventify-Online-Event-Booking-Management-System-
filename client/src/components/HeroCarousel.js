import React, { useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Button from './ui/Button';

// Professional Placeholders
const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        title: "Tech Summit 2024",
        subtitle: "Join the world's leading technology innovators."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        title: "Global Leadership Conference",
        subtitle: "Empowering the next generation of leaders."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        title: "Startup Expo 2024",
        subtitle: "Connect with investors and discover new opportunities."
    }
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === banners.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Auto-slide every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative w-full h-[500px] md:h-[600px] bg-secondary-900 overflow-hidden group">
            {/* Background Image with Overlay */}
            <div
                style={{ backgroundImage: `url(${banners[currentIndex].image})` }}
                className="w-full h-full bg-center bg-cover duration-700 ease-in-out transition-all relative"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/40 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-5 fade-in duration-700">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
                        {banners[currentIndex].title}
                    </h1>
                    <p className="text-lg md:text-2xl text-secondary-100 mb-8 max-w-2xl mx-auto font-light drop-shadow-md">
                        {banners[currentIndex].subtitle}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button variant="primary" size="lg" className="shadow-xl">Book Now</Button>
                        <Button variant="secondary" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">Learn More</Button>
                    </div>
                </div>
            </div>

            {/* Arrows */}
            <button
                className="hidden group-hover:flex absolute top-1/2 left-4 md:left-8 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
                onClick={prevSlide}
            >
                <BiChevronLeft size={32} />
            </button>
            <button
                className="hidden group-hover:flex absolute top-1/2 right-4 md:right-8 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
                onClick={nextSlide}
            >
                <BiChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
                {banners.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => setCurrentIndex(slideIndex)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'}`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
