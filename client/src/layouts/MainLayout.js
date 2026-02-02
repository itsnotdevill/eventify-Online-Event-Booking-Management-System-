import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AiAssistant from '../components/ai/AiAssistant';

const MainLayout = ({ children, showContainer = true }) => {
    return (
        <div className="flex flex-col min-h-screen bg-secondary-950 text-secondary-100 pt-32">
            <Navbar />
            <main className={`flex-grow ${showContainer ? 'container mx-auto px-4 md:px-6 py-8' : ''}`}>
                {children}
            </main>
            <Footer />
            <AiAssistant />
        </div>
    );
};

export default MainLayout;
