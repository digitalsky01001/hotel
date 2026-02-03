import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import SEO from '../components/SEO';

const Menu = () => {
    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4 md:px-8">
            <SEO
                title="Меню | Hotel Bella"
                description="Ознакомьтесь с меню нашего ресторана. Изысканные блюда и напитки."
            />

            <div className="max-w-4xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-stone-600 hover:text-gold-500 transition-colors mb-8 font-medium"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Вернуться на главную
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-[2rem] shadow-xl overflow-hidden p-4 md:p-8"
                >
                    <h1 className="text-3xl md:text-4xl font-heading text-text-main text-center mb-8">
                        Наше Меню
                    </h1>

                    <img
                        src="/images/restaurant-menu.jpg"
                        alt="Меню ресторана Hotel Bella"
                        className="w-full h-auto rounded-xl shadow-inner border border-stone-100"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Menu;
