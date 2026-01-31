import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { DEMO_URLS } from '../config';
import GoalSelector from '../components/GoalSelector';

import WaveDivider from '../components/WaveDivider';

// Removed ColorStripDivider


import SEO from '../components/SEO';

const Services: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Strategic AI Marketing Services"
                description="Comprehensive digital solutions including AI-native infrastructure, conversion optimization, and global market acquirements."
                canonicalPath="/services"
            />
            {/* Services Hero */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.05)_0%,transparent_50%)]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-[0.2em] mb-6">Solutions Spectrum</h2>
                        <h1 className="text-6xl lg:text-8xl font-display font-bold text-navy-deep tracking-tight mb-8 leading-[0.9]">
                            Comprehensive <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-green">Services.</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 mb-10">
                            We provide the technical leverage and strategic frameworks necessary to capture sophisticated international audiences. Our services are integrated endeavors.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mx-auto lg:mx-0 w-fit">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-blue text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl text-base shadow-google-blue/20"
                            >
                                <span className="material-symbols-outlined">analytics</span>
                                Request Technical Audit
                            </motion.button>
                            <button
                                onClick={() => navigate('/ollie')}
                                className="bg-white text-navy-deep px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-lg border border-gray-200 text-base"
                            >
                                <span className="material-symbols-outlined">bolt</span>
                                Try AI Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <WaveDivider />

            <GoalSelector />

            {/* Blueprint Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-navy-deep rounded-[4rem] p-12 lg:p-24 text-white overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')]"></div>
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <pattern id="v-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#v-grid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-xs font-bold uppercase tracking-widest mb-8">
                                    <span className="material-symbols-outlined text-sm">bolt</span>
                                    AI-Native Infrastructure
                                </div>
                                <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 tracking-tight">Systematic <br /><span className="text-google-blue">Optimization.</span></h2>
                                <p className="text-xl text-gray-400 leading-relaxed mb-10 font-medium">
                                    Every service we provide is augmented by our proprietary AI frameworks. We build self-optimizing digital ecosystems that learn from your audience's behavior.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setModalOpen(true, 'audit')}
                                        className="bg-white text-navy-deep px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-google-blue hover:text-white transition-all shadow-xl text-lg"
                                    >
                                        <span className="material-symbols-outlined">analytics</span>
                                        Request Technical Audit
                                    </motion.button>
                                    <button
                                        onClick={() => navigate('/ollie')}
                                        className="bg-google-blue text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl text-lg shadow-google-blue/20"
                                    >
                                        <span className="material-symbols-outlined">bolt</span>
                                        Try AI Demo
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 relative">
                                <div className="absolute -inset-10 bg-google-blue/20 blur-[100px] -z-10"></div>
                                {[
                                    { label: "Performance", val: "99.9%", icon: "speed" },
                                    { label: "Conversion Lift", val: "+45%", icon: "trending_up" },
                                    { label: "Reach Expansion", val: "4.8x", icon: "language" },
                                    { label: "Data Quality", val: "100%", icon: "fact_check" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center group"
                                    >
                                        <span className="material-symbols-outlined text-google-blue mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
                                        <p className="text-4xl font-display font-bold text-white mb-2">{stat.val}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
