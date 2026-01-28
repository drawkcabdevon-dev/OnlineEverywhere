import React, { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { GlobalIntentVisual, InvisibleGapVisual, StrategicProjectionVisual, InstitutionalGrowthVisual } from '../components/RoadmapVisuals';
import { useOutletContext, Link } from 'react-router-dom';

const ColorStripDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`flex h-1.5 w-full ${className}`}>
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);



interface PackageCardProps {
    pkg: {
        id: string;
        title: string;
        icon: string;
        color: string;
        description: string;
        deliverables: string[];
        trajectory: string;
        metric: string;
        subtext: string;
        heights?: number[];
        circle?: boolean;
        path?: boolean;
        reach?: boolean;
        premium?: boolean;
    };
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <div className="flex flex-col xl:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div
                className="w-full xl:w-1/2 group h-[380px] perspective-1000 cursor-pointer"
                onClick={() => setFlipped(!flipped)}
            >
                <div className={`relative w-full h-full transition-all duration-700 preserve-3d flip-card-inner ${flipped ? 'is-flipped' : ''}`}>
                    <div className={`absolute inset-0 backface-hidden rounded-2xl border-t-4 border-t-${pkg.color} bg-white p-8 flex flex-col shadow-sm border border-gray-100`}>
                        {pkg.premium && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-google-yellow text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Premium</div>}
                        <span className={`material-symbols-outlined text-${pkg.color} text-4xl mb-6`}>{pkg.icon}</span>
                        <h4 className="text-xl font-display font-bold text-gray-900 mb-4">{pkg.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{pkg.description}</p>
                        <div className={`mt-8 flex items-center justify-between text-${pkg.color}/50 font-medium text-sm`}>
                            <span>{flipped ? 'Tap to close' : 'Tap to see deliverables'}</span>
                            <span className="material-symbols-outlined">sync_alt</span>
                        </div>
                    </div>
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-${pkg.color} bg-white p-8 flex flex-col shadow-m3`}>
                        <h5 className={`text-lg font-bold text-${pkg.color} mb-4`}>Deliverables</h5>
                        <ul className="space-y-3 flex-grow text-[13px] text-gray-800 font-medium leading-tight">
                            {pkg.deliverables.map((item, idx) => (
                                <li key={idx} className="flex gap-2 animated-list-item">
                                    <span className={`material-symbols-outlined text-${pkg.color} text-sm`}>check</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Link to={`/services/${pkg.id}`} className={`mt-4 flex items-center justify-between text-${pkg.color} font-bold text-sm hover:underline`} onClick={e => e.stopPropagation()}>
                            <span>Full Case Study</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full xl:w-1/2 flex flex-col justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{pkg.trajectory}</p>

                {pkg.heights && (
                    <div className="h-24 flex items-end gap-1 px-2 mb-4">
                        {pkg.heights.map((h, i) => (
                            <div key={i} className={`flex-1 bg-google-blue/${20 + i * 20} rounded-t-sm`} style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                )}

                {pkg.circle && (
                    <div className="relative size-24 mx-auto mb-4">
                        <svg className="size-full" viewBox="0 0 36 36">
                            <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className="text-google-red" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="58, 100" strokeWidth="3"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-google-red">58%</span>
                        </div>
                    </div>
                )}

                {pkg.path && (
                    <div className="h-20 relative mb-4">
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                            <path d="M0 35 Q 25 35, 50 20 T 100 5" fill="none" stroke="#34A853" strokeWidth="3"></path>
                            <circle cx="100" cy="5" fill="#34A853" r="3"></circle>
                        </svg>
                    </div>
                )}

                {pkg.reach && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white p-3 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-bold text-google-yellow uppercase">ROAS</p>
                            <p className="text-lg font-bold">4.8x</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-bold text-google-yellow uppercase">Reach</p>
                            <p className="text-lg font-bold">1.2M</p>
                        </div>
                    </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                    <p className={`text-2xl font-bold text-${pkg.color}`}>{pkg.metric}</p>
                    <p className="text-xs text-gray-500 italic">{pkg.subtext}</p>
                </div>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center pt-32 pb-32 px-6 lg:px-12 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-white to-white"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl lg:text-8xl font-display font-bold text-navy-deep leading-tight tracking-tight">
                            Partners in<br />
                            <div className="typewriter-container h-20 lg:h-32 mt-4 overflow-visible">
                                <span className="typewriter-text typewriter-content text-4xl lg:text-8xl"></span>
                            </div>
                        </h1>
                        <h2 className="text-2xl lg:text-3xl font-display font-medium text-navy-muted mt-8">
                            Meet <span className="text-google-blue font-bold">Ollie</span>: Your AI Co-Pilot.
                        </h2>
                        <p className="mt-8 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Ollie designs, builds, and manages unified digital marketing infrastructure that turns interest into sustained growth.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        <button
                            onClick={() => setModalOpen(true, 'early-access')}
                            className="bg-google-blue text-white px-12 py-4 rounded-pill text-lg font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-google-blue/20"
                        >
                            Get started now
                        </button>
                        <button
                            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white border border-gray-100 text-navy-deep px-12 py-4 rounded-pill text-lg font-bold hover:bg-gray-50 transition-all"
                        >
                            Watch how it works
                        </button>
                    </div>
                </div>

                {/* Floating Cards Visual Area */}
                <div className="relative w-full max-w-7xl mx-auto h-[500px] lg:h-[700px] perspective-[2000px] mt-12 mb-12 lg:mb-0">
                    {/* Background Blur Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-google-blue/5 rounded-full blur-[150px] -z-10 pointer-events-none animate-pulse"></div>

                    {/* Card 1: Left - Social Hub (Engagement Dashboard) */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotate: -15 }}
                        animate={{ opacity: 1, x: 0, rotate: -6 }}
                        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-card absolute top-24 left-[2%] w-full max-w-sm lg:max-w-md bg-white rounded-google shadow-2xl border border-gray-100 overflow-hidden z-20 group"
                    >
                        <div className="h-10 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-google-red"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-google-yellow"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-google-green"></div>
                            </div>
                            <div className="mx-auto bg-white border border-gray-100 rounded-pill w-1/2 h-5 flex items-center px-3">
                                <span className="text-[8px] text-gray-400 font-mono">social.hub/dashboard</span>
                            </div>
                        </div>
                        <div className="p-8 bg-white">
                            <div className="flex items-center justify-between mb-8">
                                <div className="h-4 w-32 bg-gray-100 rounded-full"></div>
                                <div className="flex -space-x-2">
                                    <div className="w-10 h-10 rounded-full bg-google-blue/10 border-2 border-white flex items-center justify-center text-google-blue">
                                        <span className="material-symbols-outlined text-sm">person</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-google-red/10 border-2 border-white flex items-center justify-center text-google-red">
                                        <span className="material-symbols-outlined text-sm">favorite</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-google-red/5 border border-google-red/10">
                                    <div className="text-google-red font-bold text-2xl">84%</div>
                                    <div className="text-[10px] text-navy-muted uppercase tracking-widest font-bold">Engagement</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-google-blue/5 border border-google-blue/10">
                                    <div className="text-google-blue font-bold text-2xl">12k</div>
                                    <div className="text-[10px] text-navy-muted uppercase tracking-widest font-bold">Followers</div>
                                </div>
                                <div className="col-span-2 h-32 bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:bg-google-blue/5 transition-colors">
                                    <span className="material-symbols-outlined text-google-blue text-5xl opacity-40">share</span>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Right - Campaign Manager */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotate: 15 }}
                        animate={{ opacity: 1, x: 0, rotate: 6 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-card absolute top-24 right-[2%] w-full max-w-sm lg:max-w-md bg-white rounded-google shadow-2xl border border-gray-100 overflow-hidden z-10 group"
                    >
                        <div className="h-10 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                            </div>
                            <div className="mx-auto bg-white border border-gray-100 rounded-pill w-1/2 h-5 flex items-center px-3">
                                <span className="text-[8px] text-gray-400 font-mono">campaigns.manager/ads</span>
                            </div>
                        </div>
                        <div className="p-8 bg-white">
                            <div className="h-4 w-40 bg-gray-100 rounded-full mb-10"></div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-5 rounded-2xl bg-google-blue/5 border border-google-blue/10 hover:bg-google-blue/10 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-google-blue/20 flex items-center justify-center text-google-blue">
                                        <span className="material-symbols-outlined">ads_click</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-full bg-gray-100 rounded">
                                            <div className="h-full bg-google-blue w-3/4 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="text-google-blue font-bold text-xl">4.2x</div>
                                </div>
                                <div className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-google-yellow/30 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-google-yellow/20 flex items-center justify-center text-google-yellow">
                                        <span className="material-symbols-outlined font-variation-fill">bolt</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-full bg-gray-100 rounded">
                                            <div className="h-full bg-google-yellow w-1/2 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="text-navy-deep font-bold text-xl">$1.2k</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Center - Analytics Dashboard (The Core Product) */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-card absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-google shadow-[0_40px_100px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden z-30 group"
                    >
                        <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-8 gap-3">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-google-red"></div>
                                <div className="w-3 h-3 rounded-full bg-google-yellow"></div>
                                <div className="w-3 h-3 rounded-full bg-google-green"></div>
                            </div>
                            <div className="mx-auto bg-white border border-gray-200 rounded-pill w-1/2 h-7 flex items-center px-4 shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-google-green mr-3 animate-pulse"></div>
                                <span className="text-[10px] text-navy-muted font-mono tracking-tight">analytics.online/dashboard</span>
                            </div>
                        </div>
                        <div className="p-12 bg-white">
                            <div className="flex items-end justify-between mb-12">
                                <div>
                                    <p className="text-[11px] font-bold text-navy-muted tracking-widest uppercase mb-2">Omnichannel Scaling</p>
                                    <h3 className="text-5xl font-display font-bold text-navy-deep">+32.4%</h3>
                                    <p className="text-sm text-google-green font-bold flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        Week over Week
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-google-blue transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined">calendar_today</span>
                                    </div>
                                    <div className="size-12 rounded-xl bg-google-blue shadow-lg shadow-google-blue/20 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined">insights</span>
                                    </div>
                                </div>
                            </div>

                            {/* Growth Chart Simulation */}
                            <div className="relative h-64 w-full flex items-end gap-3 px-4">
                                {[35, 55, 45, 75, 65, 95, 85].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ delay: 1 + (i * 0.1), duration: 1, ease: "circOut" }}
                                        className={`flex-1 rounded-t-2xl transition-all duration-500 ${i === 5 ? 'bg-google-blue shadow-[0_-10px_20px_rgba(26,115,232,0.2)]' : 'bg-google-blue/10 group-hover:bg-google-blue/20'}`}
                                    />
                                ))}
                                {/* Indicator Point */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 2 }}
                                    className="absolute right-3 top-0 bg-white border-2 border-google-blue p-3 rounded-2xl shadow-xl -translate-y-12"
                                >
                                    <p className="text-[10px] font-bold text-google-blue whitespace-nowrap">PEAK PERFORMANCE REACHED</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ColorStripDivider />

            {/* Scrollytelling Roadmap Section */}
            <section className="py-32 bg-surface overflow-visible" id="frameworks">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        {/* Sticky Left Column */}
                        <div className="lg:w-1/2 lg:sticky lg:top-32 h-fit">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-google-blue font-bold text-sm uppercase tracking-[0.3em] mb-8">Strategic Frameworks</h2>
                                <h3 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tighter leading-[0.9] mb-10">
                                    Engineering Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-green">Competitive Advantage.</span>
                                </h3>
                                <p className="text-xl text-gray-500 leading-relaxed max-w-lg mb-12">
                                    We bridge the gap between Caribbean excellence and global digital demand through high-fidelity infrastructure and institutional-grade AI strategy.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="size-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group hover:border-google-blue hover:text-google-blue transition-all cursor-pointer">
                                        <span className="material-symbols-outlined animate-bounce">arrow_downward</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Scroll to Explore the Story</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Scrollable Right Column */}
                        <div className="lg:w-1/2 space-y-32 py-12 relative">
                            <div className="roadmap-progress-line hidden lg:block"></div>

                            {[
                                {
                                    title: "Global Intent",
                                    color: "google-blue",
                                    icon: "public",
                                    desc: "80% of regional tourism and export queries originate in international markets. We identify where your global audience is already searching.",
                                    tags: ["Market Intelligence", "Traffic Hubs"],
                                    Visual: GlobalIntentVisual
                                },
                                {
                                    title: "The Invisible Gap",
                                    color: "google-red",
                                    icon: "visibility_off",
                                    desc: "Without high-fidelity projection, Caribbean excellence remains invisible to the Digital Universe. We map the gap between your potential and current reach.",
                                    tags: ["Digital Void Analysis", "Opportunity Mapping"],
                                    Visual: InvisibleGapVisual
                                },
                                {
                                    title: "Strategic Projection",
                                    color: "google-green",
                                    icon: "shortcut",
                                    desc: "Bridging the gap via institutional-grade infrastructure. We project your business into the streams where international high-value clients live.",
                                    tags: ["AI Strategy", "Growth Hubs"],
                                    Visual: StrategicProjectionVisual
                                },
                                {
                                    title: "Institutional Growth",
                                    color: "google-yellow",
                                    icon: "trending_up",
                                    desc: "Turning global intent into local sovereignty. We automate the conversion of international interest into domestic economic scaling.",
                                    tags: ["Scale Operations", "Conversion"],
                                    Visual: InstitutionalGrowthVisual
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative pl-12 group"
                                >
                                    {/* Small dot on the line */}
                                    <div className={`absolute left-[0.625rem] top-2 size-2.5 rounded-full bg-white border-2 border-${item.color} z-20 group-hover:scale-150 transition-transform`}></div>

                                    <div className="relative">
                                        <div className={`inline-flex items-center gap-2 text-${item.color} font-bold text-xs uppercase tracking-widest mb-6`}>
                                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                        </div>

                                        {/* Visual Component */}
                                        <div className="mb-8">
                                            <item.Visual />
                                        </div>

                                        <h4 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6 group-hover:text-google-blue transition-colors">{item.title}</h4>
                                        <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                                            {item.desc}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Packages Section */}
            <section className="py-24 bg-white border-t border-gray-100" id="packages">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Strategic Frameworks</h2>
                        <h3 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 tracking-tight">Our Barbados Roadmaps.</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        {[
                            {
                                id: 'launchpad',
                                title: 'The Digital Launchpad',
                                icon: 'rocket_launch',
                                color: 'google-blue',
                                description: 'Establish a strong foundation with cohesive branding and professional digital assets.',
                                deliverables: [
                                    'Full Brand identity System (Logo, Fonts, Palette)',
                                    'Responsive Enterprise Grade UI/UX Design',
                                    'Unified CMS & Lead Management Implementation',
                                    'Search Engine Optimized Content Architecture',
                                    'Social Proof & Authority Building Integration'
                                ],
                                trajectory: 'Growth Visualization',
                                metric: '10x',
                                subtext: 'Projected Reach Expansion.',
                                heights: [30, 45, 60, 85, 100],
                                path: true
                            },
                            {
                                id: 'growth-engine',
                                title: 'AI Powered Growth Engine',
                                icon: 'bolt',
                                color: 'google-green',
                                description: 'Leverage institutional-grade AI strategy to automate your growth and scale operations.',
                                deliverables: [
                                    'Institutional AI Strategy & Implementation',
                                    'Automated Conversion & Scaling Workflows',
                                    'Real-time Performance Reporting Dashboard',
                                    'Dynamic Creative Optimization (DCO)',
                                    'Scalable ROAS-Centric Budget Allocation'
                                ],
                                premium: true,
                                trajectory: 'Reach Index',
                                metric: '4.8x',
                                subtext: 'Across search and social engines.',
                                reach: true
                            }
                        ].map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Trusted By Leading Barbadian & International Brands</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                        {[
                            "Ocean Blue International",
                            "Global Tourism Hub",
                            "Barbados Tech Collective",
                            "Caribbean Growth Partners",
                            "Endeavor Hospitality Group",
                            "Atlantic Digital Services"
                        ].map((brand, i) => (
                            <div key={i} className="text-gray-600 font-display font-bold text-lg hover:text-google-blue transition-colors">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Selected Work Section */}
            <section className="py-24 bg-surface" id="work">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16 px-4">
                        <div>
                            <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Case Studies</h2>
                            <h3 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 tracking-tight">Institutional Impact.</h3>
                        </div>
                        <Link to="/portfolio" className="text-google-blue font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                            View All Work
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Global Tourism Intelligence Hub",
                                results: "Automated by Ollie",
                                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcsnTzbzJAof_YWdprJTvX4QpAdmkEC1ulbDcN1GceWvskDnRyga95IfRUk8L8K1lHX6QcqvRc-u2idzZ-yq5vOu1fEoWb-Gk2XFoblihPf97q4fyfzmfgYUm3w5vzoqpXc1LEnPoBLb2LT_NCu4D8KhvcfdouxpmH07afphP0M7zpJplxqUsXbbhFA6Y_AfJfmWV5Y57mZzN5x3SjZKQW35j1B_2jsbx-muqg5jyGC73tsw0ouDM8BG_aL6hFiwdFLRHPborldU"
                            },
                            {
                                title: "Ocean Blue International",
                                results: "4.8x ROAS",
                                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPUc8wJRKJL-idYU3ytHQhrGZPVnGYb0vbKABO9AfePRXqthWXoBEcNYWGPzGgRhZGRRmo84e7ZOHi3xHGb38xMj-wcCFT5Ig-6bsbAm0A-5vbnKpLM8HepUmr9O43e03_UIXQ1Yh4jBVmicRc5ItNXEnXsoqc9LZ_XhJKOaBhE9lbVxvCb-bXA3H5d9tMRCvOpPANQg2VuQLvOwPxHZ7heaZ7a8-yDmWVJU8dlssOKehykxoKH5cDjC_1NFwCKMDNhIyOQIoS1TE"
                            },
                            {
                                title: "Mobile Page Speed Optimization",
                                results: "Strategic AI Partners",
                                image: "/mobile-speed-opt.png",
                                link: "/services/mobile-page-speed-optimization"
                            }
                        ].map((work, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative aspect-video rounded-3xl overflow-hidden bg-gray-900 shadow-xl"
                            >
                                <img src={work.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" alt={work.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                                    <div>
                                        <h4 className="text-2xl font-display font-bold text-white mb-2">{work.title}</h4>
                                        <p className="text-google-blue font-bold text-sm tracking-widest uppercase">{work.results}</p>
                                    </div>
                                    <a
                                        href={work.link || "/portfolio"}
                                        target={work.link ? "_blank" : "_self"}
                                        rel={work.link ? "noopener noreferrer" : ""}
                                        className="size-14 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-google-blue hover:text-white transition-all shadow-lg"
                                    >
                                        <span className="material-symbols-outlined">arrow_outward</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Insights Section */}
            <section className="py-24 bg-background overflow-hidden px-4 sm:px-0">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-l-4 border-google-blue pl-6">
                        <div>
                            <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Strategic Intelligence</h2>
                            <h3 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 tracking-tight">Featured Insights.</h3>
                        </div>
                        <Link to="/blog" className="text-google-blue font-bold flex items-center gap-2 hover:translate-x-2 transition-transform mb-2">
                            Explore All Insights
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Scaling Digital Transformation in Tourism",
                                excerpt: "How established brands are bridging the gap between local excellence and global digital demand.",
                                color: "google-blue",
                                icon: "travel_explore",
                                date: "Jan 26, 2026"
                            },
                            {
                                title: "The Psychology of High-Conversion Funnels",
                                excerpt: "Analyzing the subconscious friction points that prevent users from converting on enterprise platforms.",
                                color: "google-red",
                                icon: "bolt",
                                date: "Jan 24, 2026"
                            },
                            {
                                title: "Data Sovereignty in AI",
                                excerpt: "Why owning your audience and data infrastructure is critical for long-term strategic alignment.",
                                color: "google-green",
                                icon: "security",
                                date: "Jan 20, 2026"
                            }
                        ].map((post, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-surface p-8 rounded-[2rem] border border-gray-100 transition-all hover:shadow-m3 group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`size-12 rounded-xl bg-${post.color}/10 flex items-center justify-center text-${post.color}`}>
                                        <span className="material-symbols-outlined text-2xl">{post.icon}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.date}</span>
                                </div>
                                <h4 className="text-xl font-display font-bold text-gray-900 mb-4 group-hover:text-google-blue transition-colors">
                                    {post.title}
                                </h4>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-google-blue font-bold text-xs group-hover:gap-2 transition-all">
                                    <span>Read Insight</span>
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative rounded-[2rem] bg-gray-900 p-12 lg:p-24 text-center overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-google-blue rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-96 bg-google-red rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white tracking-tight">Ready to scale?</h2>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                Join hundreds of businesses that have automated their growth with our strategic digital frameworks.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                                <button
                                    onClick={() => setModalOpen(true, 'audit')}
                                    className="bg-google-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:scale-105"
                                >
                                    Book Your Free Audit
                                </button>
                                <button
                                    onClick={() => setModalOpen(true, 'early-access')}
                                    className="bg-transparent border border-gray-700 text-white hover:bg-gray-800 px-10 py-4 rounded-full text-lg font-medium transition-all"
                                >
                                    Request Access
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
