import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
    '/images/restaurant-exterior.jpg', // Interior/Exterior
    '/images/restaurant-food.jpg', // Salad/Food
    '/images/restaurant-food.jpg', // Main
];

const Restaurant = () => {
    return (
        <section className="py-16 bg-bg-main relative">
            <div className="w-[70%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Visual Side - Masonry Light */}
                    <div className="grid grid-cols-2 gap-6 h-[600px]">
                        <div className="space-y-6 pt-12">
                            <img
                                src={images[0]}
                                alt="Restaurant Exterior"
                                className="w-full h-64 object-cover rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow duration-500"
                            />
                            {/* Light Card 1 */}
                            <div className="h-40 bg-white rounded-[2rem] p-6 flex flex-col justify-center shadow-lg border border-stone-100 group hover:border-gold-500/30 transition-colors">
                                <span className="text-5xl font-heading font-bold text-gold-500 mb-2 group-hover:scale-110 transition-transform origin-left block">200+</span>
                                <span className="text-xs tracking-widest uppercase text-text-muted">Позиций вин</span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {/* Light Card 2 (Was Dark) */}
                            <div className="bg-stone-50 rounded-[2rem] p-8 text-text-main h-48 flex flex-col justify-end shadow-lg border border-stone-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-colors" />
                                <span className="text-sm tracking-widest uppercase text-gold-500 mb-2 font-bold">Шеф-Повар</span>
                                <span className="font-heading text-2xl font-bold leading-tight">Александр <br /> Новиков</span>
                            </div>
                            <img
                                src={images[1]}
                                alt="Signature Dish"
                                className="w-full h-80 object-cover rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow duration-500"
                            />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="pl-0 lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-6 block">Гастрономия</span>
                            <h2 className="text-6xl font-heading font-medium text-text-main mb-8 leading-none">
                                Вкус <br />
                                <span className="italic font-serif text-gold-500">Искусства</span>
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-transparent mb-10" />
                            <div className="space-y-6 text-xl text-text-muted font-light leading-relaxed mb-12">
                                <p>
                                    Каждое блюдо — это история, рассказанная языком вкуса.
                                    Мы используем только локальные фермерские продукты Адыгеи, создавая авангардные сочетания.
                                </p>
                            </div>

                            <div className="flex gap-6">
                                <button className="px-10 py-4 bg-text-main text-white rounded-full hover:bg-gold-500 transition-colors font-bold uppercase text-xs tracking-widest shadow-xl hover:shadow-gold-500/30">
                                    Забронировать
                                </button>
                                <Link to="/menu" className="px-10 py-4 border border-text-main text-text-main rounded-full hover:bg-text-main hover:text-white transition-colors font-bold uppercase text-xs tracking-widest inline-block">
                                    Меню
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Restaurant;
