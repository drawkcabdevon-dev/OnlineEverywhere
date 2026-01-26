import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TourismLanding from './TourismLanding';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Legacy / Direct Access for Tourism */}
                <Route path="/tourism" element={<TourismLanding onBack={() => window.location.href = '/'} />} />

                {/* Main Website Structure */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="services" element={<Services />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="contact" element={<ContactUs />} />

                    {/* Utility Routes */}
                    <Route path="privacy" element={<div className="py-24 max-w-3xl mx-auto px-6 h-screen">Institutional Privacy Policy coming soon.</div>} />
                    <Route path="terms" element={<div className="py-24 max-w-3xl mx-auto px-6 h-screen">Terms of Service coming soon.</div>} />
                    <Route path="security" element={<div className="py-24 max-w-3xl mx-auto px-6 h-screen">Infrastructure Security Protocols.</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
