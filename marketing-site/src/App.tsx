import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import ContactUs from './pages/ContactUs';
import BarbadosMarketing from './pages/BarbadosMarketing';
import BarbadosStitch from './pages/BarbadosStitch';
import Launchpad from './pages/services/Launchpad';
import ScrollToTop from './components/ScrollToTop';
import Catalyst from './pages/services/Catalyst';
import Partnership from './pages/services/Partnership';
import MediaIgnition from './pages/services/MediaIgnition';
import Ollie from './pages/Ollie';
import TourismLanding from './TourismLanding';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* Legacy / Direct Access for Tourism */}
                <Route path="/tourism" element={<TourismLanding onBack={() => window.location.href = '/'} />} />

                {/* Main Website Structure */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="ollie" element={<Ollie />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/digital-launchpad" element={<Launchpad />} />
                    <Route path="services/conversion-catalyst" element={<Catalyst />} />
                    <Route path="services/proactive-partnership" element={<Partnership />} />
                    <Route path="services/paid-media-ignition" element={<MediaIgnition />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="barbados" element={<BarbadosMarketing />} />
                    <Route path="barbados-stitch" element={<BarbadosStitch />} />
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
