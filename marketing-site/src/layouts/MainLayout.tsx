import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { submitLead } from '../lib/firebase';

const ColorStripDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`flex h-1.5 w-full ${className}`}>
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

    return (
        <div className="bg-background text-gray-700 antialiased font-sans min-h-screen relative">
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

            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100">
                <div className="px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            <div className="w-1 h-6 bg-google-blue rounded-full"></div>
                            <div className="w-1 h-6 bg-google-red rounded-full"></div>
                            <div className="w-1 h-6 bg-google-yellow rounded-full"></div>
                            <div className="w-1 h-6 bg-google-green rounded-full"></div>
                        </div>
                        <h1 className="text-lg font-display font-bold text-[#5f6368]">OLE</h1>
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-40 transition-all duration-300 ${desktopSidebarCollapsed ? 'w-20' : 'w-64'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo & Toggle */}
                    <div className="border-b border-gray-100 flex flex-col">
                        <ColorStripDivider />
                        <div className={`p-6 flex items-center ${desktopSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                            {!desktopSidebarCollapsed ? (
                                <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="relative size-12 flex items-center justify-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="size-full rounded-full border-2 border-google-blue/20 flex items-center justify-center p-1"
                                        >
                                            <div className="size-full rounded-full border-4 border-google-blue flex items-center justify-center">
                                                <span className="material-symbols-outlined text-google-blue text-2xl font-variation-fill">ads_click</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-display font-bold text-gray-700 leading-none">
                                            Online<span className="text-google-blue">Everywhere</span>
                                        </h1>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5 font-bold">Strategic Partners</p>
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/" className="flex flex-col items-center group mb-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="size-10 rounded-full border-2 border-google-blue/30 flex items-center justify-center"
                                    >
                                        <span className="material-symbols-outlined text-google-blue text-lg">ads_click</span>
                                    </motion.div>
                                </Link>
                            )}

                            <button
                                onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
                                className={`hidden lg:flex size-8 rounded-full bg-gray-50 items-center justify-center text-gray-400 hover:text-google-blue hover:bg-blue-50 transition-all ${desktopSidebarCollapsed ? 'rotate-180' : ''}`}
                            >
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
                        {[
                            { to: '/', label: 'Overview', icon: 'home' },
                            { to: '/services', label: 'Solutions', icon: 'business_center' },
                            { to: '/portfolio', label: 'Portfolio', icon: 'work' },
                            { to: '/blog', label: 'Blog', icon: 'article' },
                            { to: '/barbados', label: 'Barbados', icon: 'location_on' },
                            { to: '/about', label: 'About Us', icon: 'info' },
                            { to: '/contact', label: 'Contact', icon: 'mail' }
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-google-blue transition-all group ${desktopSidebarCollapsed ? 'justify-center' : ''}`}
                                title={desktopSidebarCollapsed ? link.label : ''}
                            >
                                <span className={`material-symbols-outlined ${desktopSidebarCollapsed ? 'text-2xl' : 'text-xl'} group-hover:scale-110 transition-transform`}>{link.icon}</span>
                                {!desktopSidebarCollapsed && <span className="font-medium text-sm">{link.label}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={() => {
                                setModalConfig({ open: true, type: 'early-access' });
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full bg-google-blue hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center ${desktopSidebarCollapsed ? 'size-12 p-0' : 'px-6 py-3 text-sm'}`}
                            title="Get Started"
                        >
                            {desktopSidebarCollapsed ? <span className="material-symbols-outlined">rocket_launch</span> : 'Get Started'}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {
                mobileMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )
            }

            {/* Main Content */}
            <main className={`relative z-10 transition-all duration-300 ${desktopSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                <Outlet context={{ setModalOpen: (open: boolean, type: any) => setModalConfig({ open, type }) }} />
            </main>

            <footer className={`bg-white border-t border-gray-100 py-16 transition-all duration-300 ${desktopSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
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
                                <li><Link className="hover:text-google-blue transition-colors" to="/blog">Strategic Blog</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/portfolio">Case Studies</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/barbados">Barbados Services</Link></li>
                                <li><Link className="hover:text-google-blue transition-colors" to="/about">About Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Connect</h4>
                            <div className="flex gap-4">
                                <a className="size-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-blue hover:border-google-blue transition-all" href="#">
                                    <span className="material-symbols-outlined text-xl">public</span>
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
