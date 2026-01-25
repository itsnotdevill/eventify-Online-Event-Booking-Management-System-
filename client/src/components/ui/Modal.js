import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full m-4',
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-secondary-100">
                    <h3 className="text-xl font-semibold text-secondary-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-secondary-400 hover:text-secondary-600 transition-colors p-1 rounded-full hover:bg-secondary-50"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
