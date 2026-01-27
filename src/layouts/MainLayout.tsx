import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { submitLead } from '../lib/firebase';
import ScrollToTop from '../components/ScrollToTop';

const ColorStripDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`flex h-1.5 w-full ${className}`}>
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

import { APP_URL, DEMO_URLS } from '../config';

const EarlyAccessModal = ({ isOpen, onClose, initialType = 'early-access' }: { isOpen: boolean, onClose: () => void, initialType?: 'early-access' | 'audit' }) => {
    if (!isOpen) return null;

    const [type, setType] = useState(initialType);
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md" onClick={onClose}>
            <motion.div
                className="bg-white border border-gray-200 p-8 md:p-12 rounded-[2.5rem] w-full max-w-lg shadow-2xl relative overflow-hidden"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-google-blue via-google-red to-google-green"></div>

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900">
                            {submitted ? 'Access Granted' : (type === 'audit' ? 'Infrastructure Audit' : 'Join the Inner Circle')}
                        </h2>
                        <p className="text-gray-500 mt-2 leading-relaxed">
                            {submitted
                                ? 'Your request is registered. While we review it, why not test our AI core?'
                                : (type === 'audit'
                                    ? 'Schedule a 36-point technical and strategic digital health check.'
                                    : 'Be the first to experience the AI-native marketing revolution.')}
                        </p>
                    </div>
                    <button onClick={onClose} className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {submitted ? (
                    <div className="space-y-4">
                        <a
                            href={DEMO_URLS.PERSONA_LAB}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-google-blue text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-google-blue/30 transition-all transform hover:scale-[1.02]"
                        >
                            <span className="material-symbols-outlined">face</span>
                            Try PersonaLab Demo
                        </a>
                        <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-medium">No account required for limited demo</p>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={async e => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data = {
                            name: formData.get('name'),
                            email: formData.get('email'),
                            business: formData.get('business'),
                        };
                        const res = await submitLead(type, data);
                        if (res.success) {
                            setSubmitted(true);
                        } else {
                            alert('Submission failed. Please try again.');
                        }
                    }}>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                                <input name="name" type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Business Email</label>
                                <input name="email" type="email" placeholder="john@company.com" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Company / Industry</label>
                                <input name="business" type="text" placeholder="Endeavor Tourism" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all" />
                            </div>
                        </div>
                        <button type="submit" className={`w-full ${type === 'audit' ? 'bg-google-red hover:bg-red-600 shadow-google-red/20' : 'bg-google-blue hover:bg-blue-600 shadow-google-blue/20'} text-white py-5 rounded-2xl font-bold transition-all transform hover:scale-[1.02] shadow-xl`}>
                            {type === 'audit' ? 'Confirm Audit Request' : 'Request Early Access'}
                        </button>
                        <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-medium text-gray-300">Secured by OnLineEverywhere Protocols</p>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

const Layout: React.FC = () => {
    const [modalConfig, setModalConfig] = useState<{ open: boolean, type: 'early-access' | 'audit' }>({ open: false, type: 'early-access' });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { to: '/', label: 'Overview' },
        { to: '/ollie', label: 'Ollie Co-Pilot' },
        { to: '/services', label: 'Solutions', hasDropdown: true },
        { to: '/portfolio', label: 'Work' },
        { to: '/blog', label: 'Insights' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' }
    ];

    return (
        <div className="bg-background text-gray-700 antialiased font-sans min-h-screen relative">
            <ScrollToTop />
            <EarlyAccessModal
                isOpen={modalConfig.open}
                onClose={() => setModalConfig({ ...modalConfig, open: false })}
                initialType={modalConfig.type}
            />

            {/* Top Navigation */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo Block */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative size-10 flex items-center justify-center">
                            <motion.div
                                animate={{ scale: scrolled ? 0.9 : 1 }}
                                className="size-full rounded-full border-2 border-google-blue/20 flex items-center justify-center p-0.5"
                            >
                                <div className="size-full rounded-full border-[3px] border-google-blue flex items-center justify-center">
                                    <span className="material-symbols-outlined text-google-blue text-xl font-variation-fill">ads_click</span>
                                </div>
                            </motion.div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg lg:text-xl font-display font-bold text-gray-800 leading-none">
                                Online<span className="text-google-blue">Everywhere</span>
                            </h1>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 font-bold">Strategic AI Partners</p>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
                        {navLinks.map((link) => (
                            <div key={link.to} className="relative group/item">
                                <Link
                                    to={link.to}
                                    className="text-gray-600 hover:text-google-blue transition-colors flex items-center gap-1 py-2"
                                >
                                    {link.label}
                                    {link.hasDropdown && <span className="material-symbols-outlined text-xs">expand_more</span>}
                                </Link>
                                {link.hasDropdown && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-200">
                                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 w-64 overflow-hidden">
                                            {[
                                                { to: '/services/digital-launchpad', label: 'Digital Launchpad', color: 'google-blue' },
                                                { to: '/services/conversion-catalyst', label: 'Conversion Catalyst', color: 'google-red' },
                                                { to: '/services/proactive-partnership', label: 'Proactive Partnership', color: 'google-green' }
                                            ].map((sub) => (
                                                <Link
                                                    key={sub.to}
                                                    to={sub.to}
                                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-navy-deep transition-all"
                                                >
                                                    <div className={`size-2 rounded-full bg-${sub.color}`}></div>
                                                    <span className="text-sm font-semibold">{sub.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={() => setModalConfig({ open: true, type: 'early-access' })}
                            className="bg-google-blue text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-google-blue/20 hover:scale-105 transition-all text-xs"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600"
                    >
                        <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[49] bg-white pt-24 px-6 lg:hidden"
                    >
                        <div className="space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.to}>
                                    <Link
                                        to={link.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-display font-bold text-gray-800 block"
                                    >
                                        {link.label}
                                    </Link>
                                    {link.hasDropdown && (
                                        <div className="mt-4 ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
                                            {[
                                                { to: '/services/digital-launchpad', label: 'Launchpad' },
                                                { to: '/services/conversion-catalyst', label: 'Catalyst' },
                                                { to: '/services/proactive-partnership', label: 'Partnership' }
                                            ].map((sub) => (
                                                <Link
                                                    key={sub.to}
                                                    to={sub.to}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="text-lg font-medium text-gray-500 block"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    setModalConfig({ open: true, type: 'early-access' });
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full bg-google-blue text-white py-4 rounded-2xl font-bold text-lg mt-8 shadow-xl"
                            >
                                Get Started Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="transition-all duration-300">
                <Outlet context={{ setModalOpen: (open: boolean, type: any) => setModalConfig({ open, type }) }} />
            </main>

            <footer className="bg-white border-t border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="relative size-10 flex items-center justify-center">
                                    <div className="size-full rounded-full border-2 border-google-blue/20 flex items-center justify-center p-0.5">
                                        <div className="size-full rounded-full border-[3px] border-google-blue flex items-center justify-center">
                                            <span className="material-symbols-outlined text-google-blue text-xl font-variation-fill">ads_click</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-display font-bold text-gray-800 leading-none">Online Everywhere</h2>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">Strategic AI Partners</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Redefining digital excellence through strategic technical implementation and generative AI ecosystems.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Solutions</h4>
                            <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                <li><Link className="hover:text-google-blue transition-colors" to="/ollie">Ollie Co-Pilot</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/services/digital-launchpad">Digital Launchpad</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/services/conversion-catalyst">Conversion Catalyst</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/services/proactive-partnership">Proactive Partnership</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Resources</h4>
                            <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                <li><Link className="hover:text-google-blue transition-colors" to="/blog">Strategic Blog</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/portfolio">Case Studies</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/barbados">Barbados Growth</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/about">Our Strategy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Connect</h4>
                            <div className="flex gap-4">
                                <a className="size-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-blue hover:border-google-blue transition-all" href="https://linkedin.com">
                                    <span className="material-symbols-outlined text-xl">share</span>
                                </a>
                                <a className="size-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-red hover:border-google-red transition-all" href="mailto:devon@onlineverywhere.com">
                                    <span className="material-symbols-outlined text-xl">alternate_email</span>
                                </a>
                                <a className="size-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-green hover:border-google-green transition-all" href="https://maps.google.com/?q=Barbados" target="_blank" rel="noopener noreferrer">
                                    <span className="material-symbols-outlined text-xl">location_on</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">© 2026 Online Everywhere. AI Marketing Intelligence.</p>
                        <div className="flex items-center gap-8 text-xs text-gray-400 font-medium uppercase tracking-widest">
                            <Link className="hover:text-gray-900 transition-colors" to="/privacy">Privacy</Link>
                            <Link className="hover:text-gray-900 transition-colors" to="/terms">Terms</Link>
                            <Link className="hover:text-gray-900 transition-colors" to="/security">Security</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
