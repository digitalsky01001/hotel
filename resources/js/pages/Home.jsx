import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import FloatingParticles from '../components/FloatingParticles';
import { Star } from 'lucide-react';
import BookingWidget from '../components/BookingWidget';
import WhyUs from '../components/WhyUs';
import Rooms from '../components/Rooms';
import Gallery from '../components/Gallery';
import Amenities from '../components/Amenities';
import Restaurant from '../components/Restaurant';
import Spa from '../components/Spa';

import SEO from '../components/SEO';

const Home = () => {
    return (
        <main>
            <SEO
                title="Главная"
                description="Добро пожаловать в Hotel Bella. Роскошный отдых, спа-центр и незабываемые впечатления."
            />
            {/* Hero Section */}
            <header className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/home-hero-main.jpg"
                        alt="Hotel Bella Main View"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* 3D Canvas Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <FloatingParticles count={60} />
                    </Canvas>
                </div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium mb-6 tracking-tight text-white drop-shadow-lg">
                            Добро пожаловать в <br />
                            <span className="font-serif italic text-gold-500">
                                Hotel Bella
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light tracking-wide drop-shadow-md">
                            Где гравитация исчезает, а элегантность возвышается.
                        </p>
                    </motion.div>
                </div>

                {/* Floating Badge - Repositioned */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute top-32 right-8 md:right-16 z-20 hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white shadow-xl"
                >
                    <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
                    <span className="font-medium tracking-wide">-15% на Раннее Бронирование</span>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full z-20 translate-y-1/3">
                    <BookingWidget />
                </div>
            </header>

            {/* Content Sections */}
            <div className="mt-24">
                <WhyUs />
                <Amenities />
                <Rooms />
                <Restaurant />
                <Spa />
                <Gallery />

                {/* CTA */}
                <section className="py-16 bg-white relative overflow-hidden">
                    <div className="w-[70%] mx-auto relative z-10">
                        <div className="bg-stone-50 rounded-[3rem] p-16 md:p-24 text-center border border-stone-100 shadow-2xl shadow-stone-200/50 relative overflow-hidden">
                            {/* Decorative subtle background element */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

                            <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block relative z-10">Не упустите момент</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-text-main mb-8 relative z-10">
                                Ваш идеальный отдых <br /> начинается здесь
                            </h2>

                            <div className="max-w-lg mx-auto relative flex items-center z-10">
                                <input
                                    type="email"
                                    placeholder="Ваш Email"
                                    className="w-full bg-white border border-stone-200 rounded-full py-5 pl-8 pr-36 text-text-main focus:outline-none focus:border-gold-500 shadow-lg placeholder:text-stone-400 transition-all font-light"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-text-main text-white px-8 rounded-full hover:bg-gold-500 transition-all font-bold text-xs tracking-widest uppercase shadow-md hover:shadow-lg transform active:scale-95">
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
