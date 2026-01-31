import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';

// Lazy Load Pages for Performance
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const BarbadosMarketing = React.lazy(() => import('./pages/BarbadosMarketing'));
const BarbadosStitch = React.lazy(() => import('./pages/BarbadosStitch'));
const Launchpad = React.lazy(() => import('./pages/services/Launchpad'));
const Catalyst = React.lazy(() => import('./pages/services/Catalyst'));
const Partnership = React.lazy(() => import('./pages/services/Partnership'));
const MediaIgnition = React.lazy(() => import('./pages/services/MediaIgnition'));
const Ollie = React.lazy(() => import('./pages/Ollie'));
const TourismLanding = React.lazy(() => import('./TourismLanding'));
const FirebaseTest = React.lazy(() => import('./pages/FirebaseTest'));

const LoadingFallback = () => (
    <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-google-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Experience...</p>
        </div>
    </div>
);

const App: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
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
                        <Route path="firebase-test" element={<FirebaseTest />} />

                        {/* Utility Routes */}
                        <Route path="privacy" element={<div className="py-24 max-w-3xl mx-auto px-6 h-screen">Institutional Privacy Policy coming soon.</div>} />
                        <Route path="terms" element={<div className="py-24 max-w-3xl mx-auto px-6 h-screen">Terms of Service coming soon.</div>} />
                        <Route path="security" element={<div className="py-24 max-w-3xl mx-auto px-6 h-screen">Infrastructure Security Protocols.</div>} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
