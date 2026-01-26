import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TourismLanding from './TourismLanding';

const Typewriter = ({ terms }: { terms: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % terms.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [terms]);

    return (
        <span className="text-primary inline-block min-w-[200px]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                >
                    {terms[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const EarlyAccessModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                className="bg-[#1c2127] border border-white/10 p-8 md:p-12 rounded-2xl w-full max-w-lg shadow-2xl"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-white">Join the Inner Circle</h2>
                        <p className="text-slate-400 mt-2">Be the first to experience the AI-native marketing revolution.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Success! You are on the list for early access.'); onClose(); }}>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Business Email</label>
                        <input type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02]">
                        Request Early Access
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const App: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<'main' | 'tourism'>('main');

    useEffect(() => {
        // Ensure dark mode is active to match the design
        document.documentElement.classList.add('dark');
    }, []);

    if (currentPage === 'tourism') return <TourismLanding onBack={() => setCurrentPage('main')} />;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white transition-colors duration-300 min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

            <EarlyAccessModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-[#101922]/80 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">rocket_launch</span>
                        </div>
                        <h1 className="text-xl font-black tracking-tight">OnLine<span className="text-primary">Everywhere</span></h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#hero">Home</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#services">All Services</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#process">Our Process</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#philosophy">Philosophy</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#packages">Solutions</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="https://app.onlineverywhere.com">Launch App</a>
                    </nav>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
                    >
                        Request Access
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div id="hero" className="mb-24 pt-12">
                    <div className="flex flex-wrap justify-between items-end gap-6 border-l-4 border-primary pl-6">
                        <div className="max-w-3xl">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block italic">Institutional Digital Transformation Frameworks</span>
                            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
                                Bridge the Gap to <br />
                                <Typewriter terms={["Global Markets.", "International Traffic.", "Digital Maturity.", "Tourism Growth.", "Enterprise Power."]} />
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed max-w-2xl">
                                We specialize in <strong>Digital Transformation</strong> for industries targeting the global tourism economy. We provide the technical leverage necessary to capture sophisticated international audiences who already live online.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                onClick={() => setModalOpen(true)}
                                className="flex items-center gap-2 bg-slate-200 dark:bg-[#1c2127] hover:bg-slate-300 dark:hover:bg-[#283039] text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
                            >
                                <span className="material-symbols-outlined text-xl">event</span>
                                Request a Free Audit
                            </button>
                            <button
                                onClick={() => setCurrentPage('tourism')}
                                className="flex items-center gap-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
                            >
                                <span className="material-symbols-outlined text-xl">travel_explore</span>
                                Explore Tourism Solutions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comprehensive Services Section */}
                <div id="services" className="mb-32">
                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12 border-l-4 border-primary pl-6">
                        <div>
                            <h2 className="text-4xl font-black tracking-tight">Our Full Spectrum of Services</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg mt-2">Beyond bundles—individual expertise tailored to your growth.</p>
                        </div>
                        <div className="text-primary font-bold text-sm tracking-widest uppercase">Everything you need to dominate</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Graphic Design",
                                icon: "palette",
                                services: ["Brand Identity & Logo", "High-Conversion Ad Assets", "Digital Visual Assets", "Video Thumbnail Design", "Custom QR Code Solutions", "Product & Service Showcases"]
                            },
                            {
                                title: "Strategic Research",
                                icon: "travel_explore",
                                services: ["Direct vs Indirect Attribution", "Customer Journey Mapping", "Deep Persona Development", "Competitive Business Analysis", "GA4 Behavioral Audits", "E-commerce Performance Data"]
                            },
                            {
                                title: "Web Engineering",
                                icon: "code",
                                services: ["AI-Native Infrastructure", "Data-First Content Strategy", "Technical SEO Audits", "Core Web Vitals Mastery", "CRM & API Orchestration", "Security & Uptime Monitoring"]
                            },
                            {
                                title: "Marketing Analysis",
                                icon: "query_stats",
                                services: ["GSC & Search Console", "GTM Tag Management", "Google Maps & My Business", "Looker Studio Dashboards", "Social Paid Attribution", "Unified Growth Reporting"]
                            }
                        ].map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-2xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] hover:border-primary transition-all duration-300 shadow-xl"
                            >
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                                </div>
                                <h3 className="text-xl font-black mb-4">{cat.title}</h3>
                                <ul className="space-y-3">
                                    {cat.services.map((item, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                            <span className="size-1 rounded-full bg-primary/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Our Process Section */}
                <div id="process" className="mb-40 pt-16">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">The OLE Methodology</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Execution as an Endeavor</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
                            We don't just "run ads"—we embark on strategic endeavors to multiply your search traffic and conversion power.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2 hidden lg:block" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                            {[
                                { step: "01", title: "Discovery & Mapping", desc: "We analyze your digital presence, identifying direct vs. indirect traffic flows and mapping the current customer journey." },
                                { step: "02", title: "Infrastructure Audit", desc: "A rigorous technical audit of your website health, Core Web Vitals, and GA4 tracking variable enablement." },
                                { step: "03", title: "Strategic Execution", desc: "From Google My Business optimization to high-fidelity AI-assisted web development and ad creation." },
                                { step: "04", title: "Unified Attribution", desc: "We deliver comprehensive Looker Studio dashboards that track every click to client, closing the loop on your ROI." }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left group relative bg-background-dark/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                                    <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-black mb-6 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform relative z-10">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-black mb-4">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mission/Philosophy Section */}
                <div id="philosophy" className="mb-40 pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-white dark:bg-[#1c2127] rounded-[40px] p-12 md:p-20 border border-slate-200 dark:border-white/5 shadow-2xl">
                        <div className="space-y-8">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase block">Our Philosophy</span>
                            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                Bridging Local Excellence <br />
                                <span className="text-slate-500">to Global Demand.</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
                                We believe that true growth in the modern era requires more than just marketing; it requires a fundamental transition to a digital-first, data-driven institutional culture.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { title: "Institutional Integrity", desc: "We provide frameworks, not just fixes." },
                                    { title: "Global Reach", desc: "We target the world, not just the neighborhood." },
                                    { title: "Data Sovereignty", desc: "We enable businesses to own and act on their data." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="material-symbols-outlined text-primary">verified</span>
                                        <div>
                                            <h4 className="font-bold text-lg">{step.title}</h4>
                                            <p className="text-sm text-slate-500">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-primary/20 flex flex-col items-center justify-center p-12 text-center space-y-6 relative overflow-hidden group border border-primary/30">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="material-symbols-outlined text-8xl text-primary animate-pulse">account_balance</span>
                                <h3 className="text-3xl font-black relative z-10">Institutional Growth Framework</h3>
                                <p className="text-slate-500 relative z-10 text-lg">Our methodology is designed to scale with your ambition.</p>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 size-24 rounded-2xl bg-primary/40 -z-10 blur-xl" />
                            <div className="absolute -bottom-6 -left-6 size-32 rounded-full bg-blue-500/20 -z-10 blur-2xl" />
                        </div>
                    </div>
                </div>

                {/* Pricing Cards Section */}
                <div id="packages" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {/* Tier 1 */}
                    <div className="group flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] p-8 shadow-xl hover:border-primary/50 transition-all duration-300">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-primary font-bold text-sm uppercase tracking-widest">Level 01</h3>
                            <h4 className="text-3xl font-black leading-tight">The Digital Launchpad</h4>
                            <p className="flex items-baseline gap-1 mt-2">
                                <span className="text-3xl font-black tracking-tight text-white italic">Foundational</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">/setup</span>
                            </p>
                        </div>
                        <button onClick={() => setModalOpen(true)} className="w-full bg-slate-100 dark:bg-[#283039] hover:bg-slate-200 dark:hover:bg-[#323c47] text-slate-900 dark:text-white py-4 rounded-xl text-sm font-bold transition-colors">
                            Get Started
                        </button>
                        <hr className="border-slate-200 dark:border-[#3b4754]" />
                        <div className="flex flex-col gap-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Deliverables</p>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Global Market Readiness</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">International Performance Build</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Cross-Border Attribution</span>
                            </div>
                        </div>
                    </div>

                    {/* Tier 2 (Featured) */}
                    <div className="relative flex flex-col gap-6 rounded-2xl border-2 border-primary bg-white dark:bg-[#1c2127] p-8 shadow-2xl scale-105 z-10 transition-all duration-300">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                            Most Popular
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-primary font-bold text-sm uppercase tracking-widest">Level 02</h3>
                            <h4 className="text-3xl font-black leading-tight">The Conversion Catalyst</h4>
                            <p className="flex items-baseline gap-1 mt-2">
                                <span className="text-4xl font-black tracking-tight text-white italic">Accelerated</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">/growth</span>
                            </p>
                        </div>
                        <button onClick={() => setModalOpen(true)} className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20">
                            Maximize ROI
                        </button>
                        <hr className="border-slate-200 dark:border-[#3b4754]" />
                        <div className="flex flex-col gap-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter text-white">Deliverables</p>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Psychological Behavioral Audits</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Conversion Funnel Overhaul</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Predictive CRO Strategy</span>
                            </div>
                        </div>
                    </div>

                    {/* Tier 3 */}
                    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] p-8 shadow-xl hover:border-primary/50 transition-all duration-300">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-primary font-bold text-sm uppercase tracking-widest">Level 03</h3>
                            <h4 className="text-3xl font-black leading-tight">The Proactive Partnership</h4>
                            <p className="flex items-baseline gap-1 mt-2">
                                <span className="text-3xl font-black tracking-tight text-white italic">Enterprise</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">/ongoing</span>
                            </p>
                        </div>
                        <button onClick={() => setModalOpen(true)} className="w-full bg-slate-100 dark:bg-[#283039] hover:bg-slate-200 dark:hover:bg-[#323c47] text-slate-900 dark:text-white py-4 rounded-xl text-sm font-bold transition-colors">
                            Partner with Us
                        </button>
                        <hr className="border-slate-200 dark:border-[#3b4754]" />
                        <div className="flex flex-col gap-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Deliverables</p>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Unified Reporting</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Technical Health</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm">Ongoing Strategy</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pillar Grid Section Header */}
                <div id="pillars" className="mb-12">
                    <h2 className="text-3xl font-black tracking-tight px-4 border-l-4 border-primary">The Pillars of Your Success</h2>
                    <p className="px-4 mt-2 text-slate-500 text-lg">Every package is built upon our four core strategic pillars.</p>
                </div>
                {/* Pillar Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-32">
                    {[
                        { icon: 'search', title: 'SEO Strategy', desc: 'Advanced optimization for high intent keywords and organic visibility.' },
                        { icon: 'dashboard', title: 'UX Design', desc: 'User-centric interfaces engineered to maximize conversion rates.' },
                        { icon: 'bar_chart', title: 'Data Analytics', desc: 'Deep-dive behavioral tracking and multi-channel attribution.' },
                        { icon: 'memory', title: 'Technical Health', desc: 'Infrastructure audits and site speed performance optimization.' }
                    ].map((pillar, i) => (
                        <div key={i} className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] p-8 hover:border-primary/50 transition-all group shadow-lg">
                            <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-black">{pillar.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Deep Dive Section */}
                <div className="space-y-40 mb-32">
                    {/* Deep Dive 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                Focus: Conversions
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Psychological Behavioral Audits</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
                                We don't just look at traffic; we look at human behavior. Our Conversion Catalyst tier utilizes heatmapping, session recordings, and custom A/B testing frameworks to identify exactly where your funnel is leaking. We apply psychological triggers and data-driven optimizations to turn visitors into brand advocates.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 group">
                                    <span className="material-symbols-outlined text-primary size-6 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">check</span>
                                    <span className="font-medium">Heatmap analysis & click-tracking</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="material-symbols-outlined text-primary size-6 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">check</span>
                                    <span className="font-medium">Multi-variant testing implementation</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="material-symbols-outlined text-primary size-6 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">check</span>
                                    <span className="font-medium">User journey friction identification</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 order-1 md:order-2 w-full">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/30 to-background-dark/80 aspect-video flex items-center justify-center border border-white/10 group">
                                <img
                                    alt="Data visualization dashboard"
                                    className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc46Y1r76m11xHTiJWE7ePKXeqbsYPfrSEgd4-iVb0ejpsmdZ2KjkorntPMZiJU7YTk76vOXHnVl0iB_gLOHFoEumg57qG3HsfZDcJhligHgPwzoFAOmaP-Id-ZmrdBKbvhkM9XrVHz-rKZiojx4-iKoHfqvbLEUur9NBgsJmXUahZ_1bwDzAgkwVU-5bdqR9Cw2MZ9bnsJ8mNcKd79HrdGhsFeH7v1ZBZBEfkpf8R_R17q6CGT6NIoFUsc88mkk-SAOj6FiqwuVs"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <span className="material-symbols-outlined text-4xl text-white">analytics</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deep Dive 2 */}
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 w-full">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-background-dark/80 to-primary/30 aspect-video flex items-center justify-center border border-white/10 group">
                                <img
                                    alt="Code on screen"
                                    className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPUc8wJRKJL-idYU3ytHQhrGZPVnGYb0vbKABO9AfePRXqthWXoBEcNYWGPzGgRhZGRRmo84e7ZOHi3xHGb38xMj-wcCFT5Ig-6bsbAm0A-5vbnKpLM8HepUmr9O43e03_UIXQ1Yh4jBVmicRc5ItNXEnXsoqc9LZ_XhJKOaBhE9lbVxvCb-bXA3H5d9tMRCvOpPANQg2VuQLvOwPxHZ7heaZ7a8-yDmWVJU8dlssOKehykxoKH5cDjC_1NFwCKMDNhIyOQIoS1TE"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <span className="material-symbols-outlined text-4xl text-white">speed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                Focus: Infrastructure
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Unified Technical Health</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
                                Scale requires a robust foundation. In our Proactive Partnership, we manage your entire digital ecosystem's health—ensuring 99.9% uptime, rapid load speeds, and seamless API integrations between your CRM and marketing stack.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 group">
                                    <span className="material-symbols-outlined text-primary size-6 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">check</span>
                                    <span className="font-medium">Enterprise-Grade Technical Oversight</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="material-symbols-outlined text-primary size-6 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">check</span>
                                    <span className="font-medium">Server-side API architecture</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="material-symbols-outlined text-primary size-6 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">check</span>
                                    <span className="font-medium">Global CDN & Security Audits</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer CTA */}
                <section className="rounded-3xl bg-primary p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                            <defs>
                                <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                                </pattern>
                            </defs>
                            <rect fill="url(#grid)" height="100" width="100"></rect>
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black leading-tight">Ready to scale your digital presence?</h2>
                        <p className="text-white/80 text-xl">Our experts are ready to audit your current stack and recommend the perfect framework for your goals.</p>
                        <div className="flex flex-wrap justify-center gap-6 pt-6">
                            <button onClick={() => setModalOpen(true)} className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-all">
                                Book Your Free Audit
                            </button>
                            <button onClick={() => setModalOpen(true)} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all">
                                Get Early Access
                            </button>
                        </div>
                    </div>
                </section>
            </main >

            <footer className="border-t border-slate-200 dark:border-white/10 py-20 bg-white dark:bg-[#0d141b]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-lg">rocket_launch</span>
                            </div>
                            <span className="font-black text-2xl tracking-tight">OnLineEverywhere</span>
                        </div>
                        <p className="text-slate-500 text-base leading-relaxed">
                            Leading digital transformation through technical excellence and strategic institutional frameworks. OnLineEverywhere: Your bridge to the global digital economy.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-6">Packages</h4>
                        <ul className="text-slate-500 text-sm space-y-4">
                            <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#">Digital Launchpad</a></li>
                            <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#">Conversion Catalyst</a></li>
                            <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#">Proactive Partnership</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-6">Resources</h4>
                        <ul className="text-slate-500 text-sm space-y-4">
                            <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#">Technical Blog</a></li>
                            <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#">Market Reports</a></li>
                            <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#">API Documentation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a className="size-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group" href="#">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </a>
                            <a className="size-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group" href="mailto:contact@onlineverywhere.com">
                                <span className="material-symbols-outlined text-xl">mail</span>
                            </a>
                            <a className="size-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group" href="https://maps.google.com/?q=Barbados" target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined text-xl">location_on</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-between gap-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <span>© 2026 OnLineEverywhere Strategic Partners. All rights reserved.</span>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
