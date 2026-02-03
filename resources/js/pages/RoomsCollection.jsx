import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles, ChevronRight, Star, Check, ArrowRight, Wifi, Coffee, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FloatingParticles from '../components/FloatingParticles';

const RoomsCollection = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('Все');
    const [selectedCollection, setSelectedCollection] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('/api/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading rooms:', err);
                setLoading(false);
            });
    }, []);

    const roomTypes = ['Все', 'Люкс', 'Полулюкс', 'Стандарт'];

    // Filter by both type and collection
    let filteredRooms = selectedType === 'Все'
        ? rooms
        : rooms.filter(room => room.type === selectedType);

    if (selectedCollection) {
        filteredRooms = filteredRooms.filter(room => room.collection === selectedCollection);
    }

    // Group rooms by collection for the curated section
    const collections = {
        'Вершины': rooms.filter(r => r.collection === 'Вершины'),
        'Гармония': rooms.filter(r => r.collection === 'Гармония'),
        'Минимализм': rooms.filter(r => r.collection === 'Минимализм')
    };

    const handleCollectionClick = (collectionName) => {
        setSelectedCollection(collectionName);
        setSelectedType('Все');
        // Scroll to rooms section
        document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSelectedCollection(null);
        setSelectedType('Все');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
            <SEO
                title="Номера и Люксы"
                description="Выберите идеальный номер для вашего отдыха в Hotel Bella. Роскошные люксы, панорамные виды и безупречный сервис."
                image="/images/rooms-hero.png"
            />
            {/* Hero Section with 3D Parallax & Particles */}
            <section className="relative h-[80vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/gallery-5.jpg"
                        alt="Наши номера - панорама"
                        className="w-full h-full object-cover contrast-125 saturate-110 brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* 3D Canvas Overlay */}
                <div className="absolute inset-0 z-10">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <FloatingParticles count={100} />
                    </Canvas>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="text-center w-full lg:w-[70%] mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Sparkles className="w-16 h-16 text-gold-500 mx-auto mb-8 animate-pulse" />
                            <h1 className="text-6xl md:text-8xl font-heading font-light text-white mb-6 tracking-tight drop-shadow-lg">
                                Наши Номера
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light tracking-wide mb-12 drop-shadow-md">
                                12 уникальных пространств для вашего идеального отдыха
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Curated Collections Section - SECOND POSITION */}
            <section className="py-32 bg-stone-50">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">
                            Кураторские подборки
                        </span>
                        <h2 className="text-5xl font-heading font-medium text-text-main mb-6">
                            Выберите свой стиль
                        </h2>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                            Мы создали три уникальные коллекции для разных предпочтений
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Object.entries(collections).map(([name, collectionRooms], idx) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                className="group relative bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                onClick={() => handleCollectionClick(name)}
                            >
                                <div className="h-[400px] overflow-hidden">
                                    <img
                                        src={collectionRooms[0]?.images?.[0] || '/placeholder.jpg'}
                                        alt={name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-heading font-medium text-text-main mb-3">
                                        Коллекция «{name}»
                                    </h3>
                                    <p className="text-stone-600 mb-4">
                                        {collectionRooms.length} {collectionRooms.length === 1 ? 'номер' : 'номера'}
                                    </p>
                                    <button className="text-gold-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                        Смотреть коллекцию
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Rooms Grid */}
            <section id="rooms-section" className="py-32 bg-white">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    {/* Filter Bar */}
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {selectedCollection && (
                                <div className="flex items-center gap-4 px-6 py-3 bg-gold-500 text-white rounded-full">
                                    <span>Коллекция: {selectedCollection}</span>
                                    <button
                                        onClick={clearFilters}
                                        className="hover:scale-110 transition-transform"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            <div className="flex gap-3">
                                {roomTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-6 py-3 rounded-full transition-all duration-300 ${selectedType === type
                                            ? 'bg-gold-500 text-white shadow-lg scale-105'
                                            : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:shadow-md border border-stone-200'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
                            <p className="mt-4 text-stone-600">Загрузка номеров...</p>
                        </div>
                    )}

                    {!loading && filteredRooms.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-2xl text-stone-600 mb-4">Номера не найдены</p>
                            <p className="text-stone-500">Попробуйте выбрать другую категорию</p>
                            <button
                                onClick={clearFilters}
                                className="mt-6 px-8 py-3 bg-gold-500 text-white rounded-full hover:bg-gold-600 transition-colors"
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    )}

                    {!loading && filteredRooms.length > 0 && (
                        <div className="space-y-16">
                            {filteredRooms.map((room, idx) => (
                                <motion.div
                                    key={room.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                    className="group"
                                >
                                    <Link to={`/rooms/${room.slug}`} className="block">
                                        <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 bg-gradient-to-br from-stone-50 to-white rounded-[4rem] overflow-hidden hover:shadow-2xl transition-all duration-700 border border-stone-100`}>
                                            {/* Image */}
                                            <div className="lg:w-1/2 h-[500px] relative overflow-hidden">
                                                <img
                                                    src={room.images?.[0] || '/placeholder.jpg'}
                                                    alt={room.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute top-8 left-8 bg-gold-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                                    {room.type}
                                                </div>
                                                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
                                                        <span className="font-bold text-stone-900">4.9</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
                                                <div className="mb-6">
                                                    <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-[9px] mb-2 block">
                                                        {room.collection}
                                                    </span>
                                                    <h3 className="text-4xl font-heading font-medium text-text-main mb-4">
                                                        {room.name}
                                                    </h3>
                                                    <p className="text-stone-600 leading-relaxed mb-6">
                                                        {room.description}
                                                    </p>
                                                </div>

                                                {/* Amenities Grid */}
                                                <div className="grid grid-cols-2 gap-3 mb-8">
                                                    {room.amenities?.map((amenity, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-2 text-sm text-stone-700"
                                                        >
                                                            <Check className="w-4 h-4 text-gold-500" />
                                                            <span>{amenity}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Price and CTA */}
                                                <div className="flex items-center justify-between pt-6 border-t border-stone-200">
                                                    <div>
                                                        <span className="text-stone-500 text-sm block mb-1">от</span>
                                                        <span className="text-4xl font-heading font-bold text-text-main">
                                                            {room.price?.toLocaleString('ru-RU')} ₽
                                                        </span>
                                                        <span className="text-stone-500 ml-2">/ ночь</span>
                                                    </div>
                                                    <div className="group/btn bg-stone-900 text-white px-8 py-4 rounded-full hover:bg-gold-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                                        Подробнее
                                                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-32 bg-stone-50">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">
                            Преимущества
                        </span>
                        <h2 className="text-5xl font-heading font-medium text-text-main mb-6">
                            Почему выбирают нас
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Wifi, title: 'Wi-Fi 6', desc: 'Высокоскоростной интернет во всех номерах' },
                            { icon: Coffee, title: 'Завтрак включен', desc: 'Авторская кухня от шеф-повара' },
                            { icon: Star, title: 'Консьерж 24/7', desc: 'Персональный сервис в любое время' },
                            { icon: Users, title: 'Гибкая отмена', desc: 'Бесплатная отмена за 48 часов' }
                        ].map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="text-center p-8 rounded-3xl bg-white hover:bg-gold-500 hover:text-white transition-all duration-300 group"
                            >
                                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-gold-500 group-hover:text-white transition-colors" />
                                <h3 className="text-xl font-heading font-medium mb-2">{benefit.title}</h3>
                                <p className="text-sm text-stone-600 group-hover:text-white/90 transition-colors">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoomsCollection;
