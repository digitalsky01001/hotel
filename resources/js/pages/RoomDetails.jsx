import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronRight, Star, Check, Users, Maximize, Wifi,
    Coffee, Wind, Tv, Bath, Calendar, Clock, X, Sparkles,
    Home, Droplet, Zap, Shield
} from 'lucide-react';

import SEO from '../components/SEO';

const RoomDetails = () => {
    const { slug } = useParams();
    const [room, setRoom] = useState(null);
    const [allRooms, setAllRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Booking state
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    const [nights, setNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Form state
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: ''
    });

    // UI state
    const [isAvailable, setIsAvailable] = useState(null);
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch('/api/rooms')
            .then(res => res.json())
            .then(data => {
                setAllRooms(data);
                const foundRoom = data.find(r => r.slug === slug);
                setRoom(foundRoom);
                if (foundRoom) {
                    setTotalPrice(foundRoom.price);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading room:', err);
                setLoading(false);
            });
    }, [slug]);

    // Calculate price dynamically
    useEffect(() => {
        if (!room || !checkIn || !checkOut) {
            setNights(0);
            setTotalPrice(room?.price || 0);
            setIsAvailable(null);
            return;
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setNights(diffDays);

        // Base price per night
        let pricePerNight = room.price;

        // Extra guest surcharge (after 2 guests)
        const extraGuests = Math.max(0, guests - 2);
        const guestSurcharge = extraGuests * 2000; // 2000₽ per extra guest

        const total = (pricePerNight + guestSurcharge) * diffDays;
        setTotalPrice(total);

        // Check availability
        checkAvailability();
    }, [checkIn, checkOut, guests, room]);

    const checkAvailability = async () => {
        if (!room || !checkIn || !checkOut) return;

        setIsCheckingAvailability(true);
        setError(null);

        try {
            const response = await fetch('/api/bookings/check-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room_id: room.id,
                    check_in: checkIn,
                    check_out: checkOut
                })
            });

            const data = await response.json();
            setIsAvailable(data.available);

            if (!data.available) {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error checking availability:', err);
            setError('Ошибка при проверке доступности');
        } finally {
            setIsCheckingAvailability(false);
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!isAvailable) {
            setError('Номер недоступен на выбранные даты');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room_id: room.id,
                    check_in: checkIn,
                    check_out: checkOut,
                    guests: guests,
                    name: bookingForm.name,
                    email: bookingForm.email,
                    phone: bookingForm.phone,
                    total_price: totalPrice
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setBookingSuccess(data.booking);
                setShowConfirmModal(true);
                // Reset form
                setBookingForm({ name: '', email: '', phone: '' });
                setCheckIn('');
                setCheckOut('');
                setGuests(2);
            } else {
                setError(data.message || 'Ошибка при создании бронирования');
            }
        } catch (err) {
            console.error('Error creating booking:', err);
            setError('Ошибка при отправке данных');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormChange = (e) => {
        setBookingForm({
            ...bookingForm,
            [e.target.name]: e.target.value
        });
    };

    // Categorize amenities with icons
    const categorizeAmenities = (amenities) => {
        const categories = {
            'Технологии': { icon: Zap, items: [] },
            'Комфорт': { icon: Home, items: [] },
            'Ванная': { icon: Droplet, items: [] },
            'Развлечения': { icon: Tv, items: [] },
            'Безопасность': { icon: Shield, items: [] },
            'Прочее': { icon: Sparkles, items: [] }
        };

        amenities?.forEach(amenity => {
            const lower = amenity.toLowerCase();
            if (lower.includes('smart') || lower.includes('wi-fi') || lower.includes('usb') || lower.includes('зарядка') || lower.includes('голосов')) {
                categories['Технологии'].items.push(amenity);
            } else if (lower.includes('душ') || lower.includes('джакузи') || lower.includes('сауна') || lower.includes('ванн')) {
                categories['Ванная'].items.push(amenity);
            } else if (lower.includes('тв') || lower.includes('кино') || lower.includes('apple') || lower.includes('акустика')) {
                categories['Развлечения'].items.push(amenity);
            } else if (lower.includes('бронир') || lower.includes('сейф') || lower.includes('безопас')) {
                categories['Безопасность'].items.push(amenity);
            } else if (lower.includes('бар') || lower.includes('кофе') || lower.includes('кухня') || lower.includes('мини-бар')) {
                categories['Комфорт'].items.push(amenity);
            } else {
                categories['Прочее'].items.push(amenity);
            }
        });

        return Object.entries(categories).filter(([_, cat]) => cat.items.length > 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
                    <p className="mt-4 text-stone-600">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-3xl font-heading text-text-main mb-4">Номер не найден</h2>
                    <Link to="/rooms" className="text-gold-500 hover:underline">Вернуться к списку номеров</Link>
                </div>
            </div>
        );
    }

    const relatedRooms = allRooms
        .filter(r => r.collection === room.collection && r.id !== room.id)
        .slice(0, 3);

    const categorizedAmenities = categorizeAmenities(room.amenities);

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title={room.name}
                description={room.description}
                image={room.images?.[0]}
            />
            {/* Hero Section with 3D Parallax */}
            <section className="relative h-screen overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <img
                        src={room.images?.[0]}
                        alt={room.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </motion.div>

                {/* Floating 3D Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 right-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"
                        animate={{
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-40 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                        animate={{
                            y: [0, 40, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="relative h-full flex items-end">
                    <div className="w-full lg:w-[70%] mx-auto px-6 pb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-6 py-2 bg-gold-500 text-white rounded-full text-sm font-bold">
                                    {room.type}
                                </span>
                                <span className="px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm">
                                    {room.collection}
                                </span>
                                <div className="flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full">
                                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                                    <span className="font-bold">4.9</span>
                                </div>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-heading font-light text-white mb-6">
                                {room.name}
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mb-8">
                                {room.description}
                            </p>
                            <div className="flex items-center gap-8">
                                <div>
                                    <span className="text-white/70 text-sm block mb-1">от</span>
                                    <span className="text-5xl font-heading font-bold text-white">
                                        {room.price?.toLocaleString('ru-RU')} ₽
                                    </span>
                                    <span className="text-white/70 ml-2">/ ночь</span>
                                </div>
                                <button
                                    onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-gold-500 text-white px-10 py-5 rounded-full hover:bg-gold-600 transition-all shadow-2xl hover:shadow-gold-500/50 flex items-center gap-3 group"
                                >
                                    Забронировать
                                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-32 bg-stone-50">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">
                            Галерея
                        </span>
                        <h2 className="text-5xl font-heading font-medium text-text-main">
                            Интерьер номера
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {room.images?.map((image, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group"
                                onClick={() => {
                                    setSelectedImage(idx);
                                    setIsGalleryOpen(true);
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`${room.name} ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <Maximize className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Section with Categories */}
            <section className="py-32 bg-white">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">
                            Удобства
                        </span>
                        <h2 className="text-5xl font-heading font-medium text-text-main mb-6">
                            Всё для вашего комфорта
                        </h2>
                    </motion.div>

                    <div className="space-y-12">
                        {categorizedAmenities.map(([category, data], catIdx) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: catIdx * 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                                        <data.icon className="w-6 h-6 text-gold-500" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-medium text-text-main">{category}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {data.items.map((amenity, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl hover:bg-gold-50 transition-colors"
                                        >
                                            <Check className="w-5 h-5 text-gold-500 flex-shrink-0" />
                                            <span className="text-stone-700">{amenity}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section with Dynamic Pricing */}
            <section id="booking-section" className="py-32 bg-stone-50">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <div className="bg-white rounded-[4rem] p-12 shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-3xl font-heading font-medium text-text-main mb-6">
                                    Забронировать номер
                                </h3>
                                <p className="text-stone-600 mb-8">
                                    Выберите даты и количество гостей
                                </p>

                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    {/* Personal Info Fields */}
                                    <div>
                                        <label className="text-sm text-stone-600 mb-2 block">Ваше имя *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={bookingForm.name}
                                            onChange={handleFormChange}
                                            required
                                            className="w-full px-4 py-4 border border-stone-200 rounded-2xl focus:outline-none focus:border-gold-500"
                                            placeholder="Иван Иванов"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-stone-600 mb-2 block">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={bookingForm.email}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-4 border border-stone-200 rounded-2xl focus:outline-none focus:border-gold-500"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-stone-600 mb-2 block">Телефон *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={bookingForm.phone}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-4 border border-stone-200 rounded-2xl focus:outline-none focus:border-gold-500"
                                                placeholder="+7 (999) 123-45-67"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-sm text-stone-600 mb-2 block">Заезд *</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                                <input
                                                    type="date"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    required
                                                    className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl focus:outline-none focus:border-gold-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-sm text-stone-600 mb-2 block">Выезд *</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                                <input
                                                    type="date"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                                    required
                                                    className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl focus:outline-none focus:border-gold-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-stone-600 mb-2 block">Гости *</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(Number(e.target.value))}
                                                className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl focus:outline-none focus:border-gold-500 appearance-none"
                                            >
                                                <option value={1}>1 гость</option>
                                                <option value={2}>2 гостя</option>
                                                <option value={3}>3 гостя</option>
                                                <option value={4}>4 гостя</option>
                                                <option value={5}>5 гостей</option>
                                                <option value={6}>6 гостей</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Availability Indicator */}
                                    {checkIn && checkOut && (
                                        <div className={`p-4 rounded-2xl ${isAvailable === true ? 'bg-green-50 text-green-700' : isAvailable === false ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                                            {isCheckingAvailability ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                    Проверка доступности...
                                                </span>
                                            ) : isAvailable === true ? (
                                                <span className="flex items-center gap-2">
                                                    <Check className="w-5 h-5" />
                                                    Номер доступен для бронирования
                                                </span>
                                            ) : isAvailable === false ? (
                                                <span>❌ Номер занят на выбранные даты</span>
                                            ) : null}
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {error && (
                                        <div className="p-4 bg-red-50 text-red-700 rounded-2xl">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isAvailable || isCheckingAvailability}
                                        className={`w-full py-5 rounded-2xl font-bold text-lg mt-6 transition-all ${isSubmitting || !isAvailable || isCheckingAvailability
                                            ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                            : 'bg-gold-500 text-white hover:bg-gold-600'
                                            }`}
                                    >
                                        {isSubmitting ? 'Отправка...' : 'Забронировать'}
                                    </button>
                                </form>
                            </div>

                            <div className="bg-stone-50 rounded-3xl p-8">
                                <h4 className="text-xl font-heading font-medium text-text-main mb-6">
                                    Детали бронирования
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                                        <span className="text-stone-600">Цена за ночь</span>
                                        <span className="font-bold text-text-main">{room.price?.toLocaleString('ru-RU')} ₽</span>
                                    </div>

                                    {nights > 0 && (
                                        <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                                            <span className="text-stone-600">Количество ночей</span>
                                            <span className="font-bold text-text-main">{nights}</span>
                                        </div>
                                    )}

                                    {guests > 2 && (
                                        <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                                            <span className="text-stone-600">Доплата за гостей ({guests - 2})</span>
                                            <span className="font-bold text-text-main">{((guests - 2) * 2000).toLocaleString('ru-RU')} ₽/ночь</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                                        <span className="text-stone-600">Сервисный сбор</span>
                                        <span className="font-bold text-text-main">Бесплатно</span>
                                    </div>

                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-xl font-heading font-medium">Итого</span>
                                        <span className="text-2xl font-heading font-bold text-gold-500">
                                            {totalPrice.toLocaleString('ru-RU')} ₽
                                        </span>
                                    </div>

                                    {nights > 0 && (
                                        <p className="text-sm text-stone-500 text-center pt-4">
                                            {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'} × {((room.price + Math.max(0, guests - 2) * 2000)).toLocaleString('ru-RU')} ₽
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8 pt-8 border-t border-stone-200">
                                    <div className="flex items-center gap-3 text-sm text-stone-600">
                                        <Clock className="w-5 h-5" />
                                        <span>Заезд: 14:00 | Выезд: 12:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Rooms */}
            {relatedRooms.length > 0 && (
                <section className="py-32 bg-white">
                    <div className="w-full lg:w-[70%] mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16 text-center"
                        >
                            <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">
                                Похожие номера
                            </span>
                            <h2 className="text-5xl font-heading font-medium text-text-main">
                                Из коллекции «{room.collection}»
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedRooms.map((relatedRoom, idx) => (
                                <Link
                                    key={relatedRoom.id}
                                    to={`/rooms/${relatedRoom.slug}`}
                                    className="group block bg-stone-50 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="h-64 overflow-hidden">
                                            <img
                                                src={relatedRoom.images?.[0]}
                                                alt={relatedRoom.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-8">
                                            <span className="text-gold-500 text-sm font-bold">{relatedRoom.type}</span>
                                            <h3 className="text-2xl font-heading font-medium text-text-main mt-2 mb-3">
                                                {relatedRoom.name}
                                            </h3>
                                            <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                                {relatedRoom.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-heading font-bold text-text-main">
                                                    {relatedRoom.price?.toLocaleString('ru-RU')} ₽
                                                </span>
                                                <ChevronRight className="w-5 h-5 text-gold-500 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                    <button
                        onClick={() => setIsGalleryOpen(false)}
                        className="absolute top-8 right-8 text-white hover:text-gold-500 transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="max-w-6xl w-full">
                        <img
                            src={room.images?.[selectedImage]}
                            alt={room.name}
                            className="w-full h-auto rounded-3xl"
                        />
                        <div className="flex gap-4 mt-8 justify-center overflow-x-auto pb-4">
                            {room.images?.map((image, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === idx ? 'border-gold-500 scale-110' : 'border-white/20'
                                        }`}
                                >
                                    <img src={image} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Confirmation Modal */}
            {showConfirmModal && bookingSuccess && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-12 max-w-2xl w-full"
                    >
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-4xl font-heading font-medium text-text-main mb-4">
                                Бронирование подтверждено!
                            </h2>
                            <p className="text-lg text-stone-600 mb-8">
                                Мы отправили подтверждение на вашу почту
                            </p>

                            <div className="bg-stone-50 rounded-3xl p-8 mb-8 text-left">
                                <h3 className="text-xl font-heading font-medium text-text-main mb-6">
                                    Детали бронирования
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Номер бронирования</span>
                                        <span className="font-bold text-text-main">#{bookingSuccess.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Номер</span>
                                        <span className="font-bold text-text-main">{bookingSuccess.room_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Даты</span>
                                        <span className="font-bold text-text-main">
                                            {bookingSuccess.check_in} - {bookingSuccess.check_out}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Гости</span>
                                        <span className="font-bold text-text-main">{bookingSuccess.guests}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-stone-200">
                                        <span className="text-xl font-heading font-medium">Итого</span>
                                        <span className="text-2xl font-heading font-bold text-gold-500">
                                            {bookingSuccess.total_price?.toLocaleString('ru-RU')} ₽
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setBookingSuccess(null);
                                }}
                                className="bg-gold-500 text-white px-12 py-4 rounded-full hover:bg-gold-600 transition-all font-bold"
                            >
                                Отлично!
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;
