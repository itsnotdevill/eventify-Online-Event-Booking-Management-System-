import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-secondary-300 mb-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={`input-field ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

export default Input;
