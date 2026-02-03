import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, Check, Star, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';

const SimpleParticles = () => {
    const count = 800;
    const [positions] = useState(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            pos[i] = (Math.random() - 0.5) * 12;
        }
        return pos;
    });

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        state.camera.position.y = Math.sin(time * 0.05) * 1.5;
        state.camera.position.x = Math.cos(time * 0.05) * 1.5;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                </bufferGeometry>
                <PointMaterial transparent color="#B8860B" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
            </points>
            <points rotation={[0, Math.PI / 4, 0]}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                </bufferGeometry>
                <PointMaterial transparent color="#B8860B" size={0.01} sizeAttenuation={true} depthWrite={false} opacity={0.15} />
            </points>
        </group>
    );
};

import SEO from '../components/SEO';

const ServiceDetails = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [relatedServices, setRelatedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, 400]);

    const rituals = {
        spa: [
            { title: "Встреча", desc: "Welcome-drink и консультация" },
            { title: "Подготовка", desc: "Ритуал омовения и хаммам" },
            { title: "Терапия", desc: "Основная процедура от мастеров" },
            { title: "Релакс", desc: "Чайная церемония и отдых" }
        ],
        dining: [
            { title: "Аперитив", desc: "Lounge зона и коктейли" },
            { title: "Подача", desc: "Презентация блюд шеф-поваром" },
            { title: "Вкус", desc: "Гастрономическое путешествие" },
            { title: "Финал", desc: "Дижестив и авторский десерт" }
        ],
        sport: [
            { title: "Старт", desc: "Инструктаж и разминка" },
            { title: "Энергия", desc: "Интенсивная тренировка" },
            { title: "Баланс", desc: "Растяжка и восстановление" },
            { title: "Фито-бар", desc: "Витаминный коктейль" }
        ],
        concierge: [
            { title: "Идея", desc: "Брифинг ваших пожеланий" },
            { title: "План", desc: "Детальная разработка маршрута" },
            { title: "Событие", desc: "Идеальная реализация заказа" },
            { title: "Забота", desc: "Поддержка в любой момент" }
        ]
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`/api/services/${slug}`),
            axios.get('/api/services')
        ])
            .then(([resService, resAll]) => {
                setService(resService.data);
                const others = resAll.data.filter(s => s.slug !== slug);
                setRelatedServices(others.sort(() => 0.5 - Math.random()).slice(0, 3));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message || 'Failed');
                setLoading(false);
            });
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error || !service) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <h2 className="text-xl font-heading mb-4">Ошибка загрузки</h2>
                <Link to="/services" className="text-gold-500 underline text-sm uppercase tracking-widest">Назад</Link>
            </div>
        </div>
    );

    const features = Array.isArray(service.features) ? service.features : [];
    const gallery = Array.isArray(service.gallery) ? service.gallery : [];
    const currentRitual = rituals[service.category] || rituals.spa;

    const faqs = {
        spa: [
            { q: "Нужно ли бронировать заранее?", a: "Мы рекомендуем бронировать минимум за 24 часа." },
            { q: "Что входит в стоимость?", a: "Все необходимые аксессуары, халат и доступ в лаундж-зону." },
            { q: "Есть ли ограничения?", a: "Пожалуйста, сообщите нам о любых медицинских противопоказаниях." }
        ],
        dining: [
            { q: "Предусмотрен ли дресс-код?", a: "Мы рекомендуем элегантный повседневный стиль (Smart Casual)." },
            { q: "Можно ли заказать столик у окна?", a: "Да, укажите это в комментариях при бронировании." }
        ]
    };
    const currentFaqs = faqs[service.category] || faqs.spa;

    return (
        <div ref={containerRef} className="bg-white min-h-screen selection:bg-gold-500/30">
            <SEO
                title={service.title}
                description={service.description}
                image={service.image}
            />
            {/* Hero Section - Balanced Centering */}
            <header className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center text-center px-6">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <img src={service.image} className="w-full h-full object-cover brightness-[0.4]" alt={service.title} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />

                    <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
                        <Canvas camera={{ position: [0, 0, 5] }}>
                            <SimpleParticles />
                        </Canvas>
                    </div>
                </motion.div>

                {/* Centered Back Button */}
                <div className="absolute top-24 inset-x-0 z-20 flex justify-center">
                    <Link to="/services" className="flex items-center gap-2 text-white/60 hover:text-white transition-all uppercase text-[10px] font-bold tracking-[0.4em] px-8 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                        <ArrowLeft className="w-3 h-3" /> Вернуться к коллекции
                    </Link>
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    className="relative z-10 max-w-5xl"
                >
                    <span className="text-gold-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block drop-shadow-sm">
                        {service.category === 'spa' ? 'Soul & Body Harmony' : 'Signature Experience'}
                    </span>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-medium tracking-tighter text-white mb-12 leading-none">
                        {service.title.split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-white to-gold-500 animate-shine inline-block" : "inline-block"}>
                                {word}&nbsp;
                            </span>
                        ))}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-6">
                        {service.schedule && (
                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-10 py-5 rounded-full border border-white/10 shadow-2xl text-white text-[11px] font-bold tracking-[0.2em] uppercase">
                                <Clock className="w-4 h-4 text-gold-500" /> {service.schedule}
                            </div>
                        )}
                        {service.price && (
                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-10 py-5 rounded-full border border-white/10 shadow-2xl text-white text-[11px] font-bold tracking-[0.2em] uppercase">
                                <Star className="w-4 h-4 text-gold-500" /> {service.price}
                            </div>
                        )}
                    </div>
                </motion.div>
            </header>

            {/* Main Content - No Dark Blocks */}
            <main className="relative z-10 bg-white pb-32">
                <div className="w-full lg:w-[70%] mx-auto px-6 -mt-16 relative z-30">
                    <div className="bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.03)] p-12 md:p-16 overflow-hidden border border-stone-100">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] -mr-48 -mt-48" />

                        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
                            <div className="lg:w-1/2 relative">
                                <div className="absolute -left-12 top-0 w-[1px] h-full bg-stone-100 hidden md:block" />
                                <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-[9px] mb-4 block">Essence</span>
                                <h2 className="text-5xl md:text-6xl font-heading font-medium text-text-main mb-10 tracking-tight leading-tight">
                                    Философия <br /><span className="text-stone-300">вашего отдыха</span>
                                </h2>
                                <p className="text-text-muted text-xl font-light leading-relaxed mb-10">
                                    {service.detailed_description}
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    {features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all">
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium text-text-main uppercase tracking-widest">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:w-1/2">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gold-500/5 rounded-[3rem] scale-95 group-hover:scale-100 transition-transform duration-700 blur-2xl" />
                                    <img src={service.image} className="relative rounded-[3rem] w-full h-[500px] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[0.98]" alt="Essence" />
                                    <div className="absolute bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-stone-50 hidden md:block max-w-[200px]">
                                        <Star className="w-10 h-10 text-gold-500/20 mb-4" />
                                        <p className="text-[10px] font-bold tracking-widest uppercase text-text-main">Эксклюзивно в Hotel Bella</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ritual - New Animated Timeline */}
                        <div className="relative pt-16 border-t border-stone-50">
                            <div className="text-center mb-16">
                                <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">The Ritual</span>
                                <h3 className="text-4xl font-heading font-medium text-text-main">Путешествие к гармонии</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100 hidden md:block -translate-y-12" />
                                {currentRitual.map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -10 }}
                                        className="relative p-10 bg-stone-50/50 rounded-[3rem] border border-transparent hover:border-gold-500/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-gold-500 mb-8 relative z-10 font-heading text-xl font-bold group-hover:bg-gold-500 group-hover:text-white transition-all">
                                            0{idx + 1}
                                        </div>
                                        <h4 className="text-lg font-heading font-bold text-text-main mb-3 uppercase tracking-tighter">{step.title}</h4>
                                        <p className="text-text-muted text-sm font-light leading-relaxed">{step.desc}</p>

                                        {idx < 3 && (
                                            <div className="absolute top-1/2 -right-3 text-stone-200 hidden md:block -translate-y-12">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking - Dark Accent Container but Light surroundings */}
                <section className="py-24 bg-white">
                    <div className="w-full lg:w-[70%] mx-auto px-6">
                        <div className="bg-stone-900 rounded-[4rem] p-12 md:p-20 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]" />

                            <div className="flex flex-col lg:flex-row gap-20 items-center relative z-10">
                                <div className="lg:w-1/2 text-white text-center lg:text-left">
                                    <span className="text-gold-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Reservation</span>
                                    <h3 className="text-5xl md:text-7xl font-heading font-medium mb-8 tracking-tighter leading-none">
                                        Начните <br /><span className="text-stone-500 font-serif italic font-light tracking-normal">свой день</span>
                                    </h3>
                                    <p className="text-stone-400 text-lg font-light max-w-md mx-auto lg:mx-0">
                                        Наши специалисты свяжутся с вами для уточнения всех деталей и ваших предпочтений.
                                    </p>
                                </div>
                                <div className="lg:w-1/2 w-full">
                                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest pl-2">Имя</label>
                                            <input type="text" className="w-full bg-white/5 border-b border-white/20 py-4 text-white focus:border-gold-500 outline-none transition-all placeholder:text-stone-700" placeholder="Ваше имя" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest pl-2">Телефон</label>
                                            <input type="tel" className="w-full bg-white/5 border-b border-white/20 py-4 text-white focus:border-gold-500 outline-none transition-all placeholder:text-stone-700" placeholder="+7..." />
                                        </div>
                                        <button className="md:col-span-2 mt-8 bg-gold-500 py-6 rounded-2xl text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all transform active:scale-95 shadow-2xl">
                                            Забронировать сейчас
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Atmosphere - Soft Light Parallax */}
                <section className="py-24 bg-stone-50/50 overflow-hidden relative">
                    <div className="w-full lg:w-[70%] mx-auto px-6 text-center">
                        <Star className="w-12 h-12 text-gold-500/10 mx-auto mb-8" />
                        <h2 className="text-4xl md:text-5xl font-heading font-medium text-text-main max-w-4xl mx-auto leading-tight italic opacity-80">
                            "{service.description}"
                        </h2>
                        <div className="mt-20 w-[1px] h-32 bg-gradient-to-b from-stone-200 to-transparent mx-auto" />
                    </div>
                </section>

                {/* FAQ - Full Width Alignment */}
                <section className="py-24 bg-white">
                    <div className="w-full lg:w-[70%] mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/3">
                                <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">F.A.Q.</span>
                                <h2 className="text-4xl font-heading font-medium text-text-main tracking-tight">Важная <br />информация</h2>
                                <p className="text-text-muted mt-6 font-light">Часто задаваемые вопросы о данной услуге.</p>
                            </div>
                            <div className="md:w-2/3 space-y-4">
                                {currentFaqs.map((faq, i) => (
                                    <details key={i} className="group border-b border-stone-100 pb-4">
                                        <summary className="flex justify-between items-center cursor-pointer list-none py-6 font-heading font-bold text-xl text-text-main hover:text-gold-500 transition-colors">
                                            {faq.q}
                                            <span className="w-8 h-8 rounded-full border border-stone-100 flex items-center justify-center group-open:rotate-180 transition-transform text-[10px]">▼</span>
                                        </summary>
                                        <p className="text-text-muted text-lg font-light leading-relaxed pb-8 max-w-2xl">{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery - Premium Grid */}
                {gallery.length > 0 && (
                    <section className="py-24 bg-stone-50/30">
                        <div className="w-full lg:w-[70%] mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[700px] md:h-[900px]">
                                <div className="md:col-span-8 rounded-[4rem] overflow-hidden shadow-2xl relative group cursor-pointer">
                                    <img src={gallery[0]} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Gallery" />
                                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="md:col-span-4 grid grid-rows-2 gap-8">
                                    {gallery.slice(1, 3).map((img, i) => (
                                        <div key={i} className="rounded-[3rem] overflow-hidden shadow-xl relative group cursor-pointer">
                                            <img src={img} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Gallery" />
                                            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Services - Standardized Width */}
                <section className="py-24 bg-white">
                    <div className="w-full lg:w-[70%] mx-auto px-6">
                        <div className="mb-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
                            <div>
                                <span className="text-gold-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Collection</span>
                                <h2 className="text-5xl font-heading font-medium text-text-main">Вам может понравиться</h2>
                            </div>
                            <Link to="/services" className="text-text-main font-bold tracking-widest uppercase text-[10px] border-b border-stone-400 pb-2 hover:text-gold-500 hover:border-gold-500 transition-all">Смотреть все</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {relatedServices.map((item) => (
                                <Link key={item.id} to={`/services/${item.slug}`} className="group block">
                                    <div className="relative h-[400px] rounded-[3rem] overflow-hidden mb-8 shadow-lg">
                                        <img src={item.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" alt={item.title} />
                                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="px-4 text-center md:text-left">
                                        <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-[9px] mb-3 block">{item.category}</span>
                                        <h3 className="text-2xl font-heading font-bold text-text-main mb-4 group-hover:text-gold-500 transition-colors uppercase tracking-tighter">{item.title}</h3>
                                        <div className="w-12 h-[1px] bg-stone-200 group-hover:w-full group-hover:bg-gold-500 transition-all duration-700" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ServiceDetails;
