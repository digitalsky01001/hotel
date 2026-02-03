import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Layout from './Layout';
import Home from './pages/Home';
import Services from './pages/Services';

import ServiceDetails from './pages/ServiceDetails';
import RoomsCollection from './pages/RoomsCollection';
import RoomDetails from './pages/RoomDetails';
import Menu from './pages/Menu';
import Contact from './pages/Contact';

const App = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="services" element={<Services />} />
                        <Route path="services/:slug" element={<ServiceDetails />} />
                        <Route path="rooms" element={<RoomsCollection />} />
                        <Route path="rooms/:slug" element={<RoomDetails />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="menu" element={<Menu />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(<App />);
}
