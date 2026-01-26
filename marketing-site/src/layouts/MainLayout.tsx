import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EarlyAccessModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                className="bg-white border border-gray-200 p-8 md:p-12 rounded-3xl w-full max-w-lg shadow-2xl"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900">Join the Inner Circle</h2>
                        <p className="text-gray-500 mt-2">Be the first to experience the AI-native marketing revolution.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Success! You are on the list for early access.'); onClose(); }}>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all" required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Business Email</label>
                        <input type="email" placeholder="john@company.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all" required />
                    </div>
                    <button type="submit" className="w-full bg-google-blue hover:bg-blue-600 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-md">
                        Request Early Access
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const Layout: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="bg-background text-gray-700 antialiased font-sans min-h-screen">
            <EarlyAccessModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="flex gap-0.5">
                            <div className="w-1.5 h-6 bg-google-blue rounded-full"></div>
                            <div className="w-1.5 h-6 bg-google-red rounded-full"></div>
                            <div className="w-1.5 h-6 bg-google-yellow rounded-full"></div>
                            <div className="w-1.5 h-6 bg-google-green rounded-full"></div>
                        </div>
                        <h1 className="text-xl font-display font-medium text-[#5f6368] ml-2">Online Everywhere</h1>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors" to="/">Overview</Link>
                        <Link className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors" to="/services">Solutions</Link>
                        <Link className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors" to="/about">About Us</Link>
                        <Link className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors" to="/contact">Contact</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-google-blue hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-all shadow-sm"
                        >
                            Get started
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <Outlet context={{ setModalOpen }} />
            </main>

            <footer className="bg-white border-t border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    <div className="w-1 h-4 bg-google-blue rounded-full"></div>
                                    <div className="w-1 h-4 bg-google-red rounded-full"></div>
                                    <div className="w-1 h-4 bg-google-yellow rounded-full"></div>
                                    <div className="w-1 h-4 bg-google-green rounded-full"></div>
                                </div>
                                <h2 className="text-lg font-display font-bold text-gray-800">Online Everywhere</h2>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Redefining digital excellence through strategic technical implementation and data-centric marketing ecosystems.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Solutions</h4>
                            <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                <li><Link className="hover:text-google-blue transition-colors" to="/services">Digital Launchpad</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/services">Conversion Catalyst</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/services">Proactive Partnership</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/services">Paid Media Ignition</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Resources</h4>
                            <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                <li><Link className="hover:text-google-blue transition-colors" to="/about">Learning Center</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/about">Case Studies</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/about">Strategic Blog</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/about">Documentation</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Connect</h4>
                            <div className="flex gap-4">
                                <a className="size-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-blue hover:border-google-blue transition-all" href="#">
                                    <span className="material-symbols-outlined text-xl">public</span>
                                </a>
                                <a className="size-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-red hover:border-google-red transition-all" href="mailto:contact@onlineverywhere.com">
                                    <span className="material-symbols-outlined text-xl">alternate_email</span>
                                </a>
                                <a className="size-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-green hover:border-google-green transition-all" href="https://maps.google.com/?q=Barbados" target="_blank" rel="noopener noreferrer">
                                    <span className="material-symbols-outlined text-xl">location_on</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">© 2026 Online Everywhere Strategic Partners. All rights reserved.</p>
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
