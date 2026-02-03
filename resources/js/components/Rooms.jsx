import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        fetch('/api/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch rooms', err);
                setLoading(false);
            });
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + itemsPerPage) % rooms.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - itemsPerPage + rooms.length) % rooms.length);
    };

    const currentRooms = rooms.slice(currentIndex, currentIndex + itemsPerPage);

    // Handle case where we have fewer rooms than itemsPerPage (infinite loop logic needs adjustment or just hide arrows if few rooms)
    // For simplicity, if loading or empty, show placeholders or nothing
    if (loading) return null;

    return (
        <section className="py-16 bg-bg-secondary overflow-hidden">
            <div className="w-full lg:w-[70%] mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-heading mb-4 text-text-main">Наши Номера</h2>
                        <p className="text-text-muted max-w-xl">
                            Коллекция из уникальных категорий для вашего идеального отдыха.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {currentRooms.length > 0 ? currentRooms.map((room) => (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={room.images?.[0] || '/placeholder.jpg'}
                                        alt={room.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Removed top-right price tag */}
                                </div>
                                <div className="p-8 pb-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-heading font-bold mb-2 text-text-main">{room.name}</h3>
                                    <p className="text-text-muted text-sm mb-6 line-clamp-2 flex-1">{room.description}</p>

                                    {/* Price and Button at the bottom */}
                                    <div className="mt-auto">
                                        <div className="text-2xl font-bold text-gold-500 mb-4">
                                            {Number(room.price).toLocaleString('ru-RU')} ₽ <span className="text-sm font-normal text-text-muted">/ ночь</span>
                                        </div>
                                        <button className="w-full py-3 border border-stone-200 rounded-lg text-text-main hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors uppercase text-xs tracking-widest font-bold">
                                            Подробнее
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-3 text-center py-20 text-stone-500">
                                Номера загружаются...
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Centered View All Button */}
                <div className="mt-12 flex justify-center">
                    <Link to="/rooms" className="px-8 py-3 bg-white border border-stone-200 rounded-full text-text-main hover:bg-gold-500 hover:text-white hover:border-gold-500 hover:shadow-lg transition-all font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                        Смотреть все номера
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Rooms;
