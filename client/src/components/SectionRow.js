import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

const SectionRow = ({ title, children, linkTo = '#' }) => {
    return (
        <section className="py-8 bg-white md:bg-transparent">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <a href={linkTo} className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:underline">
                        See All <RiArrowRightSLine className="text-lg" />
                    </a>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default SectionRow;
