import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Phone, Mail, Clock, Send, CheckCircle,
    MessageCircle, User, Calendar, ChevronDown, Instagram,
    Facebook, Twitter
} from 'lucide-react';

import SEO from '../components/SEO';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally send the form data to your backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Адрес',
            content: 'Кавказские горы, Россия',
            subContent: 'Горный курорт "Bella Vista"'
        },
        {
            icon: Phone,
            title: 'Телефон',
            content: '+7 (800) 555-35-35',
            subContent: 'Бесплатный звонок по России'
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'info@hotelbella.ru',
            subContent: 'Ответим в течение 24 часов'
        },
        {
            icon: Clock,
            title: 'Режим работы',
            content: 'Круглосуточно',
            subContent: 'Ресепшн работает 24/7'
        }
    ];

    const faqItems = [
        {
            question: 'Как добраться до отеля?',
            answer: 'Мы предоставляем трансфер от аэропорта и железнодорожного вокзала. Также можно добраться на личном автомобиле - у нас есть бесплатная парковка на 50 мест.'
        },
        {
            question: 'Какое время заезда и выезда?',
            answer: 'Заезд с 14:00, выезд до 12:00. Ранний заезд и поздний выезд возможны по предварительному согласованию.'
        },
        {
            question: 'Можно ли отменить бронирование?',
            answer: 'Да, бесплатная отмена возможна за 48 часов до заезда. При отмене позднее взимается плата за одну ночь.'
        },
        {
            question: 'Разрешены ли домашние животные?',
            answer: 'Да, мы принимаем домашних животных весом до 10 кг. Дополнительная плата 2000₽ за ночь.'
        },
        {
            question: 'Есть ли Wi-Fi в отеле?',
            answer: 'Да, высокоскоростной Wi-Fi 6 доступен бесплатно во всех номерах и общественных зонах.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Контакты"
                description="Мы всегда на связи. Свяжитесь с нами по телефону, почте или через форму на сайте."
            />
            {/* Hero Section */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/gallery-4.jpg"
                        alt="Contacts Hero"
                        className="w-full h-full object-cover contrast-125 saturate-110 brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

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
                        className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
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

                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center z-10 w-full lg:w-[70%] mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <MessageCircle className="w-16 h-16 text-gold-500 mx-auto mb-8" />
                            <h1 className="text-6xl md:text-8xl font-heading font-light text-white mb-6 tracking-tight">
                                Контакты
                            </h1>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
                                Мы всегда рады ответить на ваши вопросы
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-32 bg-stone-50">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6">
                                    <info.icon className="w-7 h-7 text-gold-500" />
                                </div>
                                <h3 className="text-lg font-heading font-medium text-text-main mb-2">
                                    {info.title}
                                </h3>
                                <p className="text-stone-900 font-medium mb-1">{info.content}</p>
                                <p className="text-sm text-stone-500">{info.subContent}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Unified Contact Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Decorative Background Blur */}
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

                <div className="w-full lg:w-[80%] mx-auto px-6 relative z-10">
                    <div className="bg-stone-50 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-stone-200/50 border border-stone-100">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Left Column: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">
                                    Напишите нам
                                </span>
                                <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main mb-6">
                                    Остались вопросы?
                                </h2>
                                <p className="text-stone-500 mb-10 font-light text-lg">
                                    Заполните форму ниже, и мы свяжемся с вами в течение часа
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-5 bg-white border border-stone-100 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-300 text-stone-700"
                                                placeholder="Ваше имя"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-5 bg-white border border-stone-100 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-300 text-stone-700"
                                                placeholder="Email"
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-6 py-5 bg-white border border-stone-100 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-300 text-stone-700"
                                                placeholder="Телефон"
                                            />
                                        </div>

                                        <div>
                                            <div className="relative">
                                                <select
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-6 py-5 bg-white border border-stone-100 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all appearance-none text-stone-600 cursor-pointer"
                                                >
                                                    <option value="">Выберите тему обращения</option>
                                                    <option value="booking">Бронирование</option>
                                                    <option value="info">Общая информация</option>
                                                    <option value="services">Услуги отеля</option>
                                                    <option value="feedback">Отзыв</option>
                                                    <option value="other">Другое</option>
                                                </select>
                                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                className="w-full px-6 py-5 bg-white border border-stone-100 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-300 text-stone-700 resize-none"
                                                placeholder="Ваше сообщение..."
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitted}
                                        className={`w-full py-5 rounded-2xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${isSubmitted
                                            ? 'bg-green-500 text-white shadow-green-500/30'
                                            : 'bg-gold-500 text-white hover:bg-black hover:shadow-black/20 shadow-gold-500/30'
                                            }`}
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Сообщение отправлено
                                            </>
                                        ) : (
                                            <>
                                                Отправить сообщение
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>

                            {/* Right Column: Info & Map */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col h-full"
                            >
                                {/* Map Container */}
                                <div className="rounded-[2rem] overflow-hidden shadow-lg border border-stone-100 h-64 lg:h-80 mb-8 relative group">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.4!2d43.6!3d43.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE4JzAwLjAiTiA0M8KwMzYnMDAuMCJF!5e0!3m2!1sru!2sru!4v1234567890"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>

                                {/* Support Info - Unified Style */}
                                <div className="bg-white rounded-[2rem] p-8 border border-stone-100 flex-grow flex flex-col justify-center">
                                    <h3 className="text-xl font-heading font-medium text-text-main mb-8">
                                        Мы всегда на связи
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gold-50 flex-shrink-0 flex items-center justify-center text-gold-500">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-text-main text-sm uppercase tracking-wider mb-1">Ресепшн 24/7</h4>
                                                <p className="text-stone-500 text-sm font-light">Круглосуточная поддержка гостей</p>
                                            </div>
                                        </div>

                                        <div className="w-full h-[1px] bg-stone-100" />

                                        <div className="flex items-center gap-4">
                                            <div className="font-bold text-text-main text-sm uppercase tracking-wider">
                                                Мы в соцсетях
                                            </div>
                                            <div className="flex gap-2">
                                                <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all">
                                                    <Instagram className="w-4 h-4" />
                                                </a>
                                                <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all">
                                                    <Facebook className="w-4 h-4" />
                                                </a>
                                                <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all">
                                                    <Twitter className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 bg-stone-50">
                <div className="w-full lg:w-[70%] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">
                            Часто задаваемые вопросы
                        </span>
                        <h2 className="text-5xl font-heading font-medium text-text-main mb-6">
                            FAQ
                        </h2>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                            Ответы на самые популярные вопросы наших гостей
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-md"
                            >
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                                >
                                    <span className="font-heading font-medium text-lg text-text-main pr-4">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-6 h-6 text-gold-500 flex-shrink-0 transition-transform ${activeAccordion === idx ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: activeAccordion === idx ? 'auto' : 0,
                                        opacity: activeAccordion === idx ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-6 text-stone-600">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
