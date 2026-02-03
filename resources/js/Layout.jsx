import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-bg-main min-h-screen text-text-main overflow-x-hidden font-body selection:bg-gold-500 selection:text-white">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center transition-all duration-300 ${scrolled || !isHome ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
                <Link to="/" className="text-2xl font-heading font-bold tracking-tighter text-white">
                    HOTEL <span className="text-gold-500">BELLA</span>
                </Link>
                <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-white/90">
                    <Link to="/" className="hover:text-gold-500 transition-colors">ГЛАВНАЯ</Link>
                    <Link to="/rooms" className="hover:text-gold-500 transition-colors">НОМЕРА</Link>
                    <Link to="/services" className="hover:text-gold-500 transition-colors">УСЛУГИ</Link>
                    <Link to="/contact" className="hover:text-gold-500 transition-colors">КОНТАКТЫ</Link>
                </div>
                <button className="px-6 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all text-xs font-bold tracking-widest text-white backdrop-blur-sm">
                    БРОНЬ
                </button>
            </nav>

            <Outlet />

            <footer className="bg-white py-12 border-t border-stone-100">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-heading font-bold tracking-tighter mb-4 md:mb-0 text-text-main">
                        HOTEL <span className="text-gold-500">BELLA</span>
                    </div>
                    <div className="text-text-muted text-sm text-center md:text-right">
                        <p>&copy; 2026 Hotel Bella. Все права защищены.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
