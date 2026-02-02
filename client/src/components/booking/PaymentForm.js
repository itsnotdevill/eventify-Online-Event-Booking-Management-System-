import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { BiCreditCard, BiLockAlt, BiUser, BiCalendar, BiMobileAlt, BiGlobe, BiWallet } from 'react-icons/bi';

const PaymentForm = ({
    paymentDetails,
    onChange,
    onSubmit,
    loading,
    amount,
    bookingSummary
}) => {
    const [method, setMethod] = useState('card'); // card, upi, netbanking, wallet

    // Formatting Logic
    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === 'cardNumber') {
            const rawValue = value.replace(/\D/g, '');
            const truncated = rawValue.slice(0, 16);
            value = truncated.replace(/(\d{4})(?=\d)/g, '$1 ');
        } else if (name === 'expiry') {
            const rawValue = value.replace(/\D/g, '');
            const truncated = rawValue.slice(0, 4);
            if (truncated.length >= 3) {
                value = `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
            } else {
                value = truncated;
            }
        } else if (name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 3);
        } else if (name === 'name') {
            value = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        }

        onChange({ target: { name, value } });
    };

    const tabs = [
        { id: 'card', label: 'Card', icon: <BiCreditCard size={20} /> },
        { id: 'upi', label: 'UPI', icon: <BiMobileAlt size={20} /> },
        { id: 'netbanking', label: 'NetBanking', icon: <BiGlobe size={20} /> },
        { id: 'wallet', label: 'Wallet', icon: <BiWallet size={20} /> },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-6">Payment & Confirm</h3>

            {/* Order Summary Card */}
            <div className="bg-secondary-900/50 p-6 rounded-2xl border border-secondary-800 space-y-3 relative overflow-hidden group shadow-lg">
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

            {/* Payment Method Tabs */}
            <div className="flex gap-2 bg-secondary-900/40 p-1 rounded-xl overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setMethod(tab.id)}
                        className={`
                            flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all
                            ${method === tab.id
                                ? 'bg-secondary-800 text-white shadow-md border border-primary-500/30'
                                : 'text-secondary-400 hover:bg-secondary-800/50 hover:text-white'}
                        `}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Payment Forms based on Method */}
            <form onSubmit={onSubmit} className="space-y-5 min-h-[300px]">

                {method === 'card' && (
                    <div className="animate-fade-in space-y-5">
                        {/* Visual Card Preview */}
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

                        <div className="space-y-4">
                            <Input
                                className="pl-4 font-mono tracking-widest"
                                placeholder="0000 0000 0000 0000"
                                label="Card Number"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                required
                            />

                            <div className="grid grid-cols-2 gap-5">
                                <Input
                                    placeholder="MM/YY"
                                    label="Expiry Date"
                                    name="expiry"
                                    value={paymentDetails.expiry}
                                    onChange={handleInputChange}
                                    required
                                />
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

                            <Input
                                className="uppercase"
                                placeholder="JOHN DOE"
                                label="Cardholder Name"
                                name="name"
                                value={paymentDetails.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                )}

                {method === 'upi' && (
                    <div className="animate-fade-in flex flex-col items-center justify-center py-8 space-y-6">
                        <div className="w-48 h-48 bg-white p-2 rounded-xl">
                            {/* Placeholder QR Code */}
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=eventify@oksbi&pn=Eventify&am=${bookingSummary.total}`} alt="UPI QR" className="w-full h-full" />
                        </div>
                        <div className="text-center space-y-2 w-full max-w-xs">
                            <p className="text-white font-medium">Scan QR or Enter VPA</p>
                            <div className="flex items-center gap-2 justify-center">
                                <div className="h-px bg-secondary-700 w-12"></div>
                                <span className="text-secondary-500 text-xs uppercase">OR</span>
                                <div className="h-px bg-secondary-700 w-12"></div>
                            </div>
                            <Input
                                placeholder="Enter UPI ID (e.g. user@oksbi)"
                                className="text-center"
                                name="vpa"
                                value={paymentDetails.vpa || ''}
                                onChange={handleInputChange}
                            />
                            <Button type="button" variant="secondary" className="w-full mt-2" onClick={() => alert('VPA Verified!')}>Verify VPA</Button>
                        </div>
                    </div>
                )}

                {method === 'netbanking' && (
                    <div className="animate-fade-in space-y-4">
                        <label className="text-sm text-secondary-400 block mb-2">Select Bank</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'Others'].map(bank => (
                                <div
                                    key={bank}
                                    onClick={() => handleInputChange({ target: { name: 'bank', value: bank } })}
                                    className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentDetails.bank === bank ? 'border-primary-500 bg-secondary-800' : 'border-secondary-700 bg-secondary-800/50 hover:border-primary-500'}`}
                                >
                                    <span className={`font-bold text-sm ${paymentDetails.bank === bank ? 'text-primary-400' : 'text-white'}`}>{bank}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {method === 'wallet' && (
                    <div className="animate-fade-in space-y-4">
                        <label className="text-sm text-secondary-400 block mb-2">Select Wallet</label>
                        <div className="space-y-3">
                            {['Amazon Pay', 'PhonePe Wallet', 'Paytm', 'Google Pay'].map(wallet => (
                                <div
                                    key={wallet}
                                    onClick={() => handleInputChange({ target: { name: 'wallet', value: wallet } })}
                                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all group ${paymentDetails.wallet === wallet ? 'border-primary-500 bg-secondary-800' : 'border-secondary-700 bg-secondary-800/30 hover:border-primary-500'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary-700 flex items-center justify-center text-white">
                                            <BiWallet />
                                        </div>
                                        <span className="text-white font-medium">{wallet}</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentDetails.wallet === wallet ? 'border-primary-500 bg-primary-500' : 'border-secondary-600'}`}>
                                        {paymentDetails.wallet === wallet && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                <Button
                    type="submit"
                    variant="primary"
                    className="w-full flex justify-center items-center py-4 text-lg font-bold shadow-neon hover:shadow-neon/80 transition-all rounded-xl mt-8"
                    isLoading={loading}
                    // Validate only if card is selected, otherwise bypass for demo
                    disabled={method === 'card' && (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv || !paymentDetails.name)}
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
