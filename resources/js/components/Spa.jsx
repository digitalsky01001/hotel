import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Waves, Trees } from 'lucide-react';

const spaImages = {
    sauna: '/images/sauna.png',
    pool: '/images/pool.jpg',
    territory: '/images/territory.jpg'
};

const Spa = () => {
    const [activeImage, setActiveImage] = useState(spaImages.sauna);
    const [activeTitle, setActiveTitle] = useState('Русская Баня');
    const [activeDesc, setActiveDesc] = useState('Традиционный пар и уютная атмосфера.');

    const handleHover = (img, title, desc) => {
        setActiveImage(img);
        setActiveTitle(title);
        setActiveDesc(desc);
    };

    return (
        <section className="py-16 bg-white relative">
            <div className="w-[70%] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block">Территория Отдыха</span>
                    <h2 className="text-5xl md:text-6xl font-heading font-medium text-text-main">
                        Атмосфера <span className="italic font-serif text-gold-500">Релакса</span>
                    </h2>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">

                    {/* Main Dynamic Visual - Spans 7 cols */}
                    <div className="lg:col-span-7 h-[400px] lg:h-full relative rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer" onMouseLeave={() => handleHover(spaImages.sauna, 'Русская Баня', 'Традиционный пар и уютная атмосфера.')}>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage}
                                src={activeImage}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                alt="Spa Visual"
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-10 z-10 pointer-events-none">
                            <motion.div
                                key={activeTitle}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3 className="text-3xl font-heading text-white mb-2">{activeTitle}</h3>
                                <p className="text-white/90 font-light text-lg">{activeDesc}</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Feature Cards - Spans 5 cols (Stack of 3) */}
                    <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">

                        {/* Sauna */}
                        <div
                            className="flex-1 bg-stone-50 rounded-[2rem] p-8 flex items-center gap-6 border border-stone-100 hover:shadow-xl hover:border-gold-500/30 transition-all group cursor-pointer hover:bg-white"
                            onMouseEnter={() => handleHover(spaImages.sauna, 'Русская Баня', 'Традиционный пар и уютная атмосфера.')}
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gold-500 shadow-sm group-hover:scale-110 transition-transform group-hover:bg-gold-500 group-hover:text-white">
                                <Flame className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Русская Баня</h3>
                                <div className="h-1 w-0 bg-gold-500 group-hover:w-full transition-all duration-500 mt-1 mb-1" />
                                <p className="text-text-muted text-sm">Дровяная печь и веники.</p>
                            </div>
                        </div>

                        {/* Pool */}
                        <div
                            className="flex-1 bg-stone-50 rounded-[2rem] p-8 flex items-center gap-6 border border-stone-100 hover:shadow-xl hover:border-gold-500/30 transition-all group cursor-pointer hover:bg-white"
                            onMouseEnter={() => handleHover(spaImages.pool, 'Открытый Бассейн', 'Подогреваемый бассейн с видом.')}
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gold-500 shadow-sm group-hover:scale-110 transition-transform group-hover:bg-gold-500 group-hover:text-white">
                                <Waves className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Открытый Бассейн</h3>
                                <div className="h-1 w-0 bg-gold-500 group-hover:w-full transition-all duration-500 mt-1 mb-1" />
                                <p className="text-text-muted text-sm">Плавание под открытым небом.</p>
                            </div>
                        </div>

                        {/* Territory */}
                        <div
                            className="flex-1 bg-stone-50 rounded-[2rem] p-8 flex items-center gap-6 border border-stone-100 hover:shadow-xl hover:border-gold-500/30 transition-all group cursor-pointer hover:bg-white"
                            onMouseEnter={() => handleHover(spaImages.territory, 'Живописная Территория', 'Прогулки на свежем воздухе.')}
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gold-500 shadow-sm group-hover:scale-110 transition-transform group-hover:bg-gold-500 group-hover:text-white">
                                <Trees className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Территория</h3>
                                <div className="h-1 w-0 bg-gold-500 group-hover:w-full transition-all duration-500 mt-1 mb-1" />
                                <p className="text-text-muted text-sm">Зеленый оазис для прогулок.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Spa;
