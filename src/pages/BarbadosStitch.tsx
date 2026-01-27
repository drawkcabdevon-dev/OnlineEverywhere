import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';
import CaribbeanRoadmap from '../components/CaribbeanRoadmap';

const BarbadosStitch: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-[#0a0f16] text-white selection:bg-google-blue/30 selection:text-white min-h-screen">
            {/* Hero Section - The Stitch Variation */}
            <section className="relative min-h-screen flex items-center pt-24 pb-32 px-6 lg:px-12 overflow-hidden">
                {/* Institutional Glows */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-google-blue/10 rounded-full blur-[180px] -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-google-red/5 rounded-full blur-[150px] -z-10"></div>

                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-google-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                Caribbean Strategic Hub
                            </div>
                            <h1 className="text-6xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter mb-10">
                                Global Reach.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-cyan-400 to-google-green">Island Proven.</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-slate-400 leading-relaxed max-w-xl mb-12">
                                We bridge the gap between Caribbean excellence and the global digital universe through high-fidelity infrastructure and institutional-grade AI strategy.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <button
                                    onClick={() => setModalOpen(true, 'audit')}
                                    className="bg-google-blue hover:bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(26,115,232,0.3)] transition-all hover:scale-105"
                                >
                                    Book Strategic Audit
                                </button>
                                <Link
                                    to="/contact"
                                    className="px-12 py-5 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-bold text-lg"
                                >
                                    Meet the Architects
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative aspect-square max-w-xl mx-auto rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-google-blue/20 via-transparent to-google-red/10 group-hover:opacity-60 transition-opacity"></div>
                            <div className="p-16 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="size-20 rounded-3xl bg-google-blue/20 flex items-center justify-center text-google-blue shadow-inner border border-white/5">
                                        <span className="material-symbols-outlined text-4xl">travel_explore</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Market Penetration</p>
                                        <p className="text-5xl font-display font-bold text-white tracking-widest">+180%</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="h-28 flex items-end gap-2">
                                        {[40, 60, 45, 80, 70, 95, 85].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                                className={`flex-1 rounded-t-lg ${i === 5 ? 'bg-google-blue shadow-[0_0_20px_rgba(26,115,232,0.4)]' : 'bg-white/10'}`}
                                            ></motion.div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-white">Export Volume Index</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-widest">Global Tourism Access</p>
                                        </div>
                                        <div className="bg-google-green/20 text-google-green text-[10px] font-black px-3 py-1 rounded-full border border-google-green/30 tracking-tighter">
                                            ACTIVE SCALE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Bridge - Strategic Authority */}
            <section className="py-40 bg-[#0c131a] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(26,115,232,0.05),_transparent)] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-8 sticky top-32">
                                <div className="space-y-8 mt-12">
                                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-xl backdrop-blur-md group hover:border-google-blue/30 transition-all">
                                        <h4 className="text-5xl font-display font-bold text-google-blue mb-2">140%</h4>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Booking Lift</p>
                                    </div>
                                    <div className="p-10 rounded-[3rem] bg-google-blue text-white shadow-[0_30px_60px_rgba(26,115,232,0.3)]">
                                        <h4 className="text-5xl font-display font-bold mb-2">24h</h4>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Market Response</p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="p-10 rounded-[3rem] bg-google-red text-white shadow-2xl">
                                        <h4 className="text-5xl font-display font-bold mb-2">Sovereign</h4>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Data Management</p>
                                    </div>
                                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-xl backdrop-blur-md group hover:border-google-green/30 transition-all">
                                        <h4 className="text-5xl font-display font-bold text-google-green mb-2">4.8x</h4>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Average ROAS</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-google-blue font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Institutional Standards</h2>
                            <h3 className="text-4xl lg:text-7xl font-display font-bold tracking-tight mb-12">
                                Why Caribbean Forward-Thinkers <span className="text-slate-500">Partner with OLE.</span>
                            </h3>
                            <p className="text-xl text-slate-400 leading-relaxed mb-16">
                                We combine a deep understanding of the region's unique export potential with the aggressive technical requirements of the international digital market.
                            </p>

                            <div className="space-y-12">
                                {[
                                    { icon: "hub", title: "Export Visibility Hub", desc: "Projecting local products into the global digital stream through high-fidelity SEO and data architecture." },
                                    { icon: "psychology", title: "Institutional AI Strategy", desc: "Moving beyond simple tools to unified AI ecosystems that automate client acquisition at scale." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-google-blue group-hover:bg-google-blue/10 transition-all">
                                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Roadmap - Placeholder for upcoming CaribbeanRoadmap component */}
            <section className="py-40 bg-[#0a0f16]">
                <div className="max-w-7xl mx-auto px-6 text-center mb-24">
                    <h2 className="text-google-blue font-bold text-[10px] uppercase tracking-[0.3em] mb-6">The Journey to Scale</h2>
                    <h3 className="text-5xl lg:text-8xl font-display font-bold tracking-tight leading-none mb-10">
                        Expansion Into the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-yellow">Digital Universe.</span>
                    </h3>
                </div>

                <CaribbeanRoadmap />
            </section>

            {/* High-Impact CTA */}
            <section className="py-40 bg-[#0a0f16] px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="relative p-20 lg:p-32 rounded-[4rem] bg-gradient-to-br from-google-blue/10 to-transparent border border-white/10 overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-google-blue/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-google-red/5 rounded-full blur-[120px] -z-10"></div>

                        <h2 className="text-5xl lg:text-7xl font-display font-bold text-white tracking-tight mb-12">
                            Ready to Claim the <br />
                            <span className="text-google-blue">Market Advantage?</span>
                        </h2>
                        <p className="text-xl lg:text-2xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed">
                            Join the Caribbean's most aggressive export and tourism brands. Coordinate your digital transformation with our local strategy architects.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-blue hover:bg-blue-600 text-white px-16 py-6 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(26,115,232,0.3)] transition-all hover:scale-105"
                            >
                                REQUEST INSTITUTIONAL AUDIT
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BarbadosStitch;
