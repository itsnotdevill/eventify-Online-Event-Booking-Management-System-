import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-secondary-200/80", className)}
            {...props}
        />
    );
};

export default Skeleton;
