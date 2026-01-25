import React, { useState, useRef, useEffect } from 'react';
import { BiBot, BiSend, BiX, BiMessageSquareDots } from 'react-icons/bi';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Eva, your Eventify assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            let botText = "I'm still learning! Try asking about 'movies', 'support', or 'booking'.";
            const lowerInput = userMessage.text.toLowerCase();

            if (lowerInput.includes('movie') || lowerInput.includes('suggest')) {
                botText = "I recommend watching 'Dune: Part Two' or 'Kung Fu Panda 4'. They are trending right now! Check the Home page for more.";
            } else if (lowerInput.includes('book') || lowerInput.includes('ticket')) {
                botText = "You can book tickets by selecting an event from the Home page and clicking 'Book Now'. Need help finding an event?";
            } else if (lowerInput.includes('support') || lowerInput.includes('help')) {
                botText = "Our support team is available 24/7 at support@eventify.com. Or you can ask me basic questions!";
            } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
                botText = "Hello! Ready to explore some amazing events?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-secondary-800 rotate-90 text-white' : 'bg-primary-600 text-white animate-bounce'}`}
            >
                {isOpen ? <BiX size={28} /> : <BiBot size={28} />}
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-24 right-6 w-80 md:w-96 bg-secondary-900 border border-secondary-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-primary-600 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                        <BiBot size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Eva AI</h3>
                        <p className="text-primary-100 text-xs flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-secondary-950/50 scrollbar-thin scrollbar-thumb-secondary-700">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-secondary-800 text-secondary-200 rounded-tl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-secondary-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-secondary-900 border-t border-secondary-800 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 bg-secondary-950 border border-secondary-800 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                    <button
                        onClick={handleSend}
                        className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
                        disabled={!input.trim()}
                    >
                        <BiSend size={20} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AiAssistant;
