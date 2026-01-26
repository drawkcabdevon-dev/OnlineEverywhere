import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { submitLead } from '../lib/firebase';

const EarlyAccessModal = ({ isOpen, onClose, initialType = 'early-access' }: { isOpen: boolean, onClose: () => void, initialType?: 'early-access' | 'audit' }) => {
    if (!isOpen) return null;

    const [type, setType] = useState(initialType);

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
                            {type === 'audit' ? 'Infrastructure Audit' : 'Join the Inner Circle'}
                        </h2>
                        <p className="text-gray-500 mt-2 leading-relaxed">
                            {type === 'audit'
                                ? 'Schedule a 36-point technical and strategic digital health check.'
                                : 'Be the first to experience the AI-native marketing revolution.'}
                        </p>
                    </div>
                    <button onClick={onClose} className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

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
                        alert(`Success! Your ${type === 'audit' ? 'audit request' : 'early access'} has been registered.`);
                        onClose();
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
                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-medium">Secured by OnLineEverywhere Protocols</p>
                </form>
            </motion.div>
        </div>
    );
};

const Layout: React.FC = () => {
    const [modalConfig, setModalConfig] = useState<{ open: boolean, type: 'early-access' | 'audit' }>({ open: false, type: 'early-access' });

    return (
        <div className="bg-background text-gray-700 antialiased font-sans min-h-screen relative overflow-x-hidden">
            <EarlyAccessModal
                isOpen={modalConfig.open}
                onClose={() => setModalConfig({ ...modalConfig, open: false })}
                initialType={modalConfig.type}
            />

            {/* Premium Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] size-[600px] bg-google-blue/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] size-[800px] bg-google-red/5 rounded-full blur-[150px]"></div>
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] size-[1000px] bg-google-yellow/3 rounded-full blur-[200px]"></div>
            </div>

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                        <div className="flex gap-1 group-hover:gap-1.5 transition-all">
                            <div className="w-1.5 h-8 bg-google-blue rounded-full"></div>
                            <div className="w-1.5 h-8 bg-google-red rounded-full"></div>
                            <div className="w-1.5 h-8 bg-google-yellow rounded-full"></div>
                            <div className="w-1.5 h-8 bg-google-green rounded-full"></div>
                        </div>
                        <h1 className="text-2xl font-display font-bold text-[#5f6368] ml-2 tracking-tight">OnLine<span className="text-google-blue">Everywhere</span></h1>
                    </Link>
                    <nav className="hidden md:flex items-center gap-10">
                        <Link className="text-sm font-bold text-gray-500 hover:text-google-blue transition-all" to="/">Overview</Link>
                        <Link className="text-sm font-bold text-gray-500 hover:text-google-blue transition-all" to="/services">Solutions</Link>
                        <Link className="text-sm font-bold text-gray-500 hover:text-google-blue transition-all" to="/portfolio">Portfolio</Link>
                        <Link className="text-sm font-bold text-gray-500 hover:text-google-blue transition-all" to="/blog">Blog</Link>
                        <Link className="text-sm font-bold text-gray-500 hover:text-google-blue transition-all" to="/about">About Us</Link>
                        <Link className="text-sm font-bold text-gray-500 hover:text-google-blue transition-all" to="/contact">Contact</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setModalConfig({ open: true, type: 'early-access' })}
                            className="bg-google-blue hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-google-blue/20"
                        >
                            Get started
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 transition-opacity duration-500">
                <Outlet context={{ setModalOpen: (open: boolean, type: any) => setModalConfig({ open, type }) }} />
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
