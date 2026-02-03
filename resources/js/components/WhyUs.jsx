import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Coffee, Wifi } from 'lucide-react';

const features = [
    {
        icon: <Shield className="w-8 h-8 text-gold-500" />,
        title: 'Безопасность',
        description: '24/7 охрана и приватный доступ для вашего спокойствия.'
    },
    {
        icon: <Star className="w-8 h-8 text-gold-500" />,
        title: 'Сервис 5 Звезд',
        description: 'Персональный консьерж сервис для любых ваших пожеланий.'
    },
    {
        icon: <Coffee className="w-8 h-8 text-gold-500" />,
        title: 'Высокая Кухня',
        description: 'Изысканные блюда от лучших шеф-поваров мира.'
    },
    {
        icon: <Wifi className="w-8 h-8 text-gold-500" />,
        title: 'High-Speed Wi-Fi',
        description: 'Бесшовное покрытие на всей территории отеля.'
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const WhyUs = () => {
    return (
        <section className="py-20 bg-bg-main relative overflow-hidden">
            <div className="w-[70%] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="lg:w-1/2 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block">Преимущества</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main mb-6 leading-tight">
                            Почему выбирают <br />
                            <span className="text-gold-500 font-serif italic">Hotel Bella</span>
                        </h2>
                        <p className="text-text-muted text-lg font-light leading-relaxed max-w-lg">
                            Мы создаем не просто отдых, а впечатления. Каждая деталь нашего отеля в сердце Адыгеи продумана
                            для того, чтобы вы чувствовали себя особенными на фоне величественных гор.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div key={index} variants={item} className="flex gap-4">
                                <div className="shrink-0 p-3 bg-white rounded-xl shadow-sm border border-stone-100 h-fit">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-main mb-2">{feature.title}</h3>
                                    <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Image Section (Replaced 3D) */}
                <div className="lg:w-1/2 w-full relative order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-gold-500/10 active:scale-[0.99] transition-transform"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <img
                            src="/images/pool-view.jpg"
                            alt="Hotel Bella Pool View"
                            className="w-full h-[600px] object-cover"
                        />
                        {/* Floating Badge */}
                        <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                            <p className="font-heading text-xl">Даховская, Адыгея</p>
                            <p className="text-xs opacity-80 uppercase tracking-widest">Сердце Гор</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
