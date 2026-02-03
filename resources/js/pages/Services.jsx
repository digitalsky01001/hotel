import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Utensils, Droplet, Dumbbell, Car, Star, ArrowRight, Wine, User, Loader } from 'lucide-react';
import axios from 'axios';

const categories = [
    { id: 'all', label: 'Все Услуги' },
    { id: 'spa', label: 'SPA & Wellness' },
    { id: 'dining', label: 'Гастрономия' },
    { id: 'sport', label: 'Спорт' },
    { id: 'concierge', label: 'Консьерж' }
];

import SEO from '../components/SEO';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('/api/services')
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredServices = filter === 'all'
        ? services
        : services.filter(s => s.category === filter);

    if (loading) return (
        <div className="min-h-screen pt-32 flex items-center justify-center">
            <Loader className="w-10 h-10 animate-spin text-gold-500" />
        </div>
    );

    return (
        <div className="">
            <SEO
                title="Услуги и Впечатления"
                description="Откройте для себя мир релаксации и гастрономических изысков в Hotel Bella. SPA, рестораны и консьерж-сервис."
            />
            {/* Page Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/pool-view.jpg"
                        alt="Services"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-gold-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                    >
                        Исключительный Сервис
                    </motion.span>
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-6"
                    >
                        Услуги & Впечатления
                    </motion.h1>
                    <p className="max-w-xl mx-auto text-white/80 font-light text-lg">
                        Мы заботимся о каждой детали вашего пребывания, предлагая спектр услуг премиум-класса.
                    </p>
                </div>
            </section>

            {/* Filter */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100 py-4 shadow-sm">
                <div className="w-full lg:w-[70%] mx-auto px-6 overflow-x-auto">
                    <div className="flex gap-4 md:justify-center min-w-max">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${filter === cat.id
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 bg-bg-main min-h-screen">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredServices.map((service) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={service.id}
                                    className="group relative bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="h-[300px] overflow-hidden relative">
                                        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-black">
                                            {categories.find(c => c.id === service.category)?.label}
                                        </div>
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                        <div className="absolute bottom-4 left-4 z-10 text-white">
                                            <div className="text-sm font-medium opacity-90">{service.price}</div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col grow">
                                        <h3 className="text-2xl font-heading font-medium text-text-main mb-4 group-hover:text-gold-500 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-text-muted font-light leading-relaxed mb-8 text-sm flex-grow">
                                            {service.description}
                                        </p>

                                        <Link
                                            to={`/services/${service.slug}`}
                                            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black hover:text-gold-500 transition-colors group/btn mt-auto"
                                        >
                                            Подробнее
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
