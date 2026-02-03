import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BookingWidget = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('2 Гостя');
    const [status, setStatus] = useState('idle');

    const handleSearch = async () => {
        if (!checkIn || !checkOut) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('loading');
        try {
            const response = await axios.post('/api/book', {
                checkIn,
                checkOut,
                guests: guests === '2 Гостя' ? '2 Guests' : guests // Simple mapping for backend
            });
            setStatus('success');
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Booking API Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="relative z-20 -mt-24 container mx-auto px-4 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden"
            >
                {/* Status Overlays */}
                {status === 'loading' && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
                        <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                {status === 'success' && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-green-600">
                        <CheckCircle className="w-12 h-12 mb-2" />
                        <span className="font-heading text-xl">Заявка отправлена</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="relative group">
                        <label className="block text-xs uppercase tracking-widest text-gold-600 mb-2 font-medium">Заезд</label>
                        <div className="relative flex items-center">
                            <Calendar className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-gold-500 transition-colors" />
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className={`w-full bg-white border ${status === 'error' && !checkIn ? 'border-red-400' : 'border-gray-200'} rounded-lg py-3 pl-10 pr-3 text-gray-800 focus:outline-none focus:border-gold-500 transition-all font-light`}
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block text-xs uppercase tracking-widest text-gold-600 mb-2 font-medium">Выезд</label>
                        <div className="relative flex items-center">
                            <Calendar className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-gold-500 transition-colors" />
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className={`w-full bg-white border ${status === 'error' && !checkOut ? 'border-red-400' : 'border-gray-200'} rounded-lg py-3 pl-10 pr-3 text-gray-800 focus:outline-none focus:border-gold-500 transition-all font-light`}
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block text-xs uppercase tracking-widest text-gold-600 mb-2 font-medium">Гости</label>
                        <div className="relative flex items-center">
                            <Users className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-gold-500 transition-colors" />
                            <select
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-3 text-gray-800 focus:outline-none focus:border-gold-500 transition-all font-light appearance-none"
                            >
                                <option>1 Гость</option>
                                <option>2 Гостя</option>
                                <option>3 Гостя</option>
                                <option>4+ Гостей</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={handleSearch}
                            disabled={status === 'loading'}
                            className="w-full bg-gold-500 text-white font-bold py-3 rounded-lg hover:bg-gold-600 shadow-lg hover:shadow-gold-500/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Search className="w-4 h-4" />
                            <span>НАЙТИ</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BookingWidget;
