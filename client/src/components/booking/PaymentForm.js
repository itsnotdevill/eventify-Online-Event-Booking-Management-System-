import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { BiCreditCard, BiLockAlt, BiUser, BiCalendar } from 'react-icons/bi';

const PaymentForm = ({
    paymentDetails,
    onChange,
    onSubmit,
    loading,
    amount,
    bookingSummary
}) => {

    // Formatting Logic
    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === 'cardNumber') {
            // Remove non-digits
            const rawValue = value.replace(/\D/g, '');
            // Limit to 16 digits
            const truncated = rawValue.slice(0, 16);
            // Add space every 4 digits
            value = truncated.replace(/(\d{4})(?=\d)/g, '$1 ');
        } else if (name === 'expiry') {
            // Remove non-digits
            const rawValue = value.replace(/\D/g, '');
            // Limit to 4 digits (MMYY)
            const truncated = rawValue.slice(0, 4);
            // Add slash after MM
            if (truncated.length >= 3) {
                value = `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
            } else {
                value = truncated;
            }
        } else if (name === 'cvv') {
            // Numbers only, max 3
            value = value.replace(/\D/g, '').slice(0, 3);
        } else if (name === 'name') {
            // Letters and spaces only, upper case standard
            value = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        }

        // Call parent handler with formatted value
        onChange({ target: { name, value } });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white">Payment & Confirm</h3>

            {/* Order Summary */}
            <div className="bg-secondary-900/50 p-6 rounded-2xl border border-secondary-800 space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary-500/20 transition-all"></div>

                <div className="flex justify-between items-center z-10 relative">
                    <span className="text-secondary-400">{bookingSummary.count} x {bookingSummary.category} Seat(s)</span>
                    <span className="font-medium text-white">₹{bookingSummary.subtotal}</span>
                </div>
                <div className="flex justify-between items-center z-10 relative">
                    <span className="text-secondary-400">Convenience Fee</span>
                    <span className="font-medium text-white">₹{bookingSummary.fee}</span>
                </div>
                <div className="border-t border-secondary-800 pt-3 flex justify-between items-end text-lg z-10 relative mt-2">
                    <span className="font-bold text-white">Total Payable</span>
                    <span className="font-bold text-3xl text-primary-500 leading-none">₹{bookingSummary.total}</span>
                </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={onSubmit} className="space-y-5">

                {/* Visual Card Preview (Simplified) */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-secondary-700 shadow-xl relative overflow-hidden mb-6">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <BiCreditCard size={48} className="text-white/20" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-8 w-12 bg-white/20 rounded"></div>
                            <span className="text-xs text-white/50 tracking-widest uppercase">Credit Card</span>
                        </div>
                        <div className="text-2xl text-white font-mono tracking-widest text-shadow">
                            {paymentDetails.cardNumber || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-[10px] text-white/50 uppercase mb-1">Card Holder</div>
                                <div className="text-sm text-white font-bold tracking-wider uppercase">{paymentDetails.name || 'YOUR NAME'}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-white/50 uppercase mb-1">Expires</div>
                                <div className="text-sm text-white font-bold tracking-wider">{paymentDetails.expiry || 'MM/YY'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-400 group-focus-within:text-primary-500 transition-colors">
                        <BiCreditCard size={20} />
                    </div>
                    <Input
                        className="pl-12 font-mono tracking-widest"
                        placeholder="0000 0000 0000 0000"
                        label="Card Number"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-400 group-focus-within:text-primary-500 transition-colors pt-6">
                            <BiCalendar size={20} />
                        </div>
                        <Input
                            className="pl-12"
                            placeholder="MM/YY"
                            label="Expiry Date"
                            name="expiry"
                            value={paymentDetails.expiry}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-secondary-400 pt-6">
                            <BiLockAlt size={18} />
                        </div>
                        <Input
                            placeholder="123"
                            label="CVV"
                            name="cvv"
                            type="password"
                            maxLength="3"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-400 group-focus-within:text-primary-500 transition-colors pt-6">
                        <BiUser size={20} />
                    </div>
                    <Input
                        className="pl-12 uppercase"
                        placeholder="JOHN DOE"
                        label="Cardholder Name"
                        name="name"
                        value={paymentDetails.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full flex justify-center items-center py-4 text-lg font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all rounded-xl mt-4"
                    isLoading={loading}
                    disabled={!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv || !paymentDetails.name}
                >
                    {loading ? 'Processing Payment...' : `Pay ₹${amount} Securely`}
                </Button>
            </form>
            <p className="text-[10px] text-center text-secondary-500 uppercase tracking-widest flex items-center justify-center gap-2 opacity-60">
                <BiLockAlt /> 256-bit SSL Encrypted Payment
            </p>
        </div>
    );
};

export default PaymentForm;
