import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const Typewriter = () => {
    const terms = ["Graphic Design", "Web Development", "Customer Insights"];
    const colors = ["text-google-blue", "text-google-red", "text-google-green"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % terms.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="inline-flex justify-center min-w-[300px]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-block whitespace-nowrap overflow-hidden border-r-4 border-google-blue pr-2 ${colors[index]}`}
                >
                    {terms[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

const Home: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0 text-white">
                    <img alt="Dynamic data visualization background" className="w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJcsnTzbzJAof_YWdprJTvX4QpAdmkEC1ulbDcN1GceWvskDnRyga95IfRUk8L8K1lHX6QcqvRc-u2idzZ-yq5vOu1fEoWb-Gk2XFoblihPf97q4fyfzmfgYUm3w5vzoqpXc1LEnPoBLb2LT_NCu4D8KhvcfdouxpmH07afphP0M7zpJplxqUsXbbhFA6Y_AfJfmWV5Y57mZzN5x3SjZKQW35j1B_2jsbx-muqg5jyGC73tsw0ouDM8BG_aL6hFiwdFLRHPborldU" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-xs font-medium tracking-wide mb-8">
                        <span className="material-symbols-outlined text-sm">analytics</span>
                        Strategic Digital Ecosystems
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-5xl lg:text-8xl font-display font-bold leading-tight text-white">
                            Partners in<br />
                            <div className="h-24 mt-4">
                                <Typewriter />
                            </div>
                        </h1>
                        <h2 className="text-3xl lg:text-5xl font-display font-medium text-gray-300">
                            From Click to Client.
                        </h2>
                    </div>
                    <p className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Online Everywhere (OLE) designs, builds, and manages unified digital marketing infrastructure that turns interest into sustained growth.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-google-blue hover:shadow-lg text-white px-10 py-4 rounded-full text-lg font-medium transition-all border border-transparent"
                        >
                            Start Your Digital Journey
                        </button>
                        <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-4 rounded-full text-lg font-medium transition-all border border-white/30">
                            View Case Studies
                        </button>
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <section className="py-24 bg-surface" id="packages">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Strategic Frameworks</h2>
                        <h3 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 tracking-tight">Tailored solutions for every stage of growth.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {/* Card 1 */}
                        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-full md:w-1/2 group h-[380px] perspective-1000">
                                <div className="relative w-full h-full transition-all duration-700 preserve-3d flip-card-inner">
                                    <div className="absolute inset-0 backface-hidden rounded-2xl border-t-4 border-t-google-blue bg-white p-8 flex flex-col shadow-sm border border-gray-100">
                                        <span className="material-symbols-outlined text-google-blue text-4xl mb-6">rocket_launch</span>
                                        <h4 className="text-xl font-display font-bold text-gray-900 mb-4">The Digital Launchpad</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">Establish a strong foundation with cohesive branding and professional digital assets.</p>
                                        <div className="mt-8 flex items-center justify-between text-google-blue font-medium text-sm">
                                            <span>Learn more</span>
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-google-blue bg-white p-8 flex flex-col shadow-m3">
                                        <h5 className="text-lg font-bold text-google-blue mb-4">Deliverables</h5>
                                        <ul className="space-y-3 flex-grow text-sm text-gray-600">
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-blue text-sm">check</span> Brand Identity System</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-blue text-sm">check</span> Responsive UI/UX Design</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-blue text-sm">check</span> CMS & CRM Integration</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Growth Visualization</p>
                                <div className="h-32 flex items-end gap-1 px-2">
                                    <div className="w-full bg-google-blue/20 h-[30%] rounded-t-sm"></div>
                                    <div className="w-full bg-google-blue/30 h-[45%] rounded-t-sm"></div>
                                    <div className="w-full bg-google-blue/40 h-[60%] rounded-t-sm"></div>
                                    <div className="w-full bg-google-blue/60 h-[75%] rounded-t-sm"></div>
                                    <div className="w-full bg-google-blue h-[100%] rounded-t-sm"></div>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-2xl font-bold text-google-blue">+240%</p>
                                    <p className="text-xs text-gray-500 italic">Lead quality increase in first 3 months.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-full md:w-1/2 group h-[380px] perspective-1000">
                                <div className="relative w-full h-full transition-all duration-700 preserve-3d flip-card-inner">
                                    <div className="absolute inset-0 backface-hidden rounded-2xl border-t-4 border-t-google-red bg-white p-8 flex flex-col shadow-sm border border-gray-100">
                                        <span className="material-symbols-outlined text-google-red text-4xl mb-6">bolt</span>
                                        <h4 className="text-xl font-display font-bold text-gray-900 mb-4">The Conversion Catalyst</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">Optimize your existing traffic to maximize ROI and customer engagement.</p>
                                        <div className="mt-8 flex items-center justify-between text-google-red font-medium text-sm">
                                            <span>Learn more</span>
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-google-red bg-white p-8 flex flex-col shadow-m3">
                                        <h5 className="text-lg font-bold text-google-red mb-4">Focus Areas</h5>
                                        <ul className="space-y-3 flex-grow text-sm text-gray-600">
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-red text-sm">check</span> CRO Strategy & Audits</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-red text-sm">check</span> Behavioral Analytics</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-red text-sm">check</span> Performance Tuning</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency KPI</p>
                                <div className="relative size-32 mx-auto">
                                    <svg className="size-full" viewBox="0 0 36 36">
                                        <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                        <path className="text-google-red" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="58, 100" strokeWidth="3"></path>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold text-google-red">58%</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-center text-gray-500 italic">Improved checkout completion rates.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-full md:w-1/2 group h-[380px] perspective-1000">
                                <div className="relative w-full h-full transition-all duration-700 preserve-3d flip-card-inner">
                                    <div className="absolute inset-0 backface-hidden rounded-2xl border-t-4 border-t-google-green bg-white p-8 flex flex-col shadow-sm border border-gray-100">
                                        <span className="material-symbols-outlined text-google-green text-4xl mb-6">handshake</span>
                                        <h4 className="text-xl font-display font-bold text-gray-900 mb-4">The Proactive Partnership</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">Long-term strategic alignment to scale multi-channel growth operations.</p>
                                        <div className="mt-8 flex items-center justify-between text-google-green font-medium text-sm">
                                            <span>Learn more</span>
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-google-green bg-white p-8 flex flex-col shadow-m3">
                                        <h5 className="text-lg font-bold text-google-green mb-4">Ongoing Benefits</h5>
                                        <ul className="space-y-3 flex-grow text-sm text-gray-600">
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-green text-sm">check</span> Monthly Strategy Roadmaps</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-green text-sm">check</span> Tech Health Management</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-green text-sm">check</span> Full-funnel Optimization</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Scale Trajectory</p>
                                <div className="h-24 relative">
                                    <svg className="w-full h-full" viewBox="0 0 100 40">
                                        <path d="M0 35 Q 25 35, 50 20 T 100 5" fill="none" stroke="#34A853" strokeWidth="3"></path>
                                        <circle cx="100" cy="5" fill="#34A853" r="3"></circle>
                                    </svg>
                                </div>
                                <div className="pt-6 border-t border-gray-200">
                                    <p className="text-2xl font-bold text-google-green">$2M ARR</p>
                                    <p className="text-xs text-gray-500 italic">Growth achieved in 12 months.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="w-full md:w-1/2 group h-[380px] perspective-1000">
                                <div className="relative w-full h-full transition-all duration-700 preserve-3d flip-card-inner">
                                    <div className="absolute inset-0 backface-hidden rounded-2xl border-4 border-google-yellow bg-white p-8 flex flex-col shadow-sm border border-gray-100">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-google-yellow text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Premium</div>
                                        <span className="material-symbols-outlined text-google-yellow text-4xl mb-6">local_fire_department</span>
                                        <h4 className="text-xl font-display font-bold text-gray-900 mb-4">Paid Media Ignition</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">Hyper-focused advertising campaigns designed for rapid market penetration.</p>
                                        <div className="mt-8 flex items-center justify-between text-google-yellow font-bold text-sm">
                                            <span>Learn more</span>
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-google-yellow bg-white p-8 flex flex-col shadow-m3">
                                        <h5 className="text-lg font-bold text-google-yellow mb-4">Highlights</h5>
                                        <ul className="space-y-3 flex-grow text-sm text-gray-600">
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-yellow text-sm">check</span> Multi-platform Ad Management</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-yellow text-sm">check</span> Custom Audience Modeling</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-google-yellow text-sm">check</span> Real-time Performance Dash</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Reach Index</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                                        <p className="text-xs font-bold text-google-yellow">ROAS</p>
                                        <p className="text-lg font-bold">4.8x</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                                        <p className="text-xs font-bold text-google-yellow">Reach</p>
                                        <p className="text-lg font-bold">1.2M</p>
                                    </div>
                                </div>
                                <div className="pt-6 mt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 italic">Across search and social engines.</p>
                                </div>
                            </div>
                        </div>
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
                                    onClick={() => setModalOpen(true)}
                                    className="bg-google-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:scale-105"
                                >
                                    Book Your Free Audit
                                </button>
                                <button
                                    onClick={() => setModalOpen(true)}
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
