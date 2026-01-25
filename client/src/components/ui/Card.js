import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <div
            className={`bg-white rounded-xl border border-secondary-200 shadow-card ${hover ? 'hover:shadow-card-hover transition-shadow duration-300' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
