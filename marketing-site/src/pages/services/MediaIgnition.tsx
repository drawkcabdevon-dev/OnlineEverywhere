import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const ColorStripDivider: React.FC = () => (
    <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

const MediaIgnition: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* Landing Hero */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,188,4,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute -top-24 -right-24 size-[600px] bg-google-yellow/5 rounded-full blur-[120px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/services" className="inline-flex items-center text-google-yellow font-bold mb-8 hover:translate-x-[-4px] transition-transform group">
                            <span className="material-symbols-outlined mr-2 group-hover:bg-yellow-50 rounded-full p-1 transition-colors">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-yellow/10 border border-google-yellow/20 text-yellow-600 text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="material-symbols-outlined text-sm">local_fire_department</span>
                            Ignition Phase
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-display font-bold text-navy-deep mb-8 leading-[0.9] tracking-tight">
                            Paid Media <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-yellow to-orange-500">Ignition.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                            Market penetration at the speed of thought. We combine high-fidelity creative assets with sophisticated audience modeling to capture immediate international demand.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[
                                { title: "Omni-Channel Strategy", icon: "hub" },
                                { title: "Lookalike Audience Modeling", icon: "groups" },
                                { title: "High-ROAS Creative", icon: "ads_click" },
                                { title: "Real-Time Optimization", icon: "update" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                                    <span className="material-symbols-outlined text-google-yellow text-xl">check_circle</span>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-yellow hover:bg-yellow-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-google-yellow/30 transition-all transform hover:scale-[1.02]"
                            >
                                Ignite Your Growth
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative lg:h-[600px] flex items-center justify-center"
                    >
                        <div className="relative w-full aspect-square bg-white rounded-[4rem] border border-gray-100 p-12 flex flex-col justify-end overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group">
                            <div className="absolute inset-0 bg-gradient-to-bl from-google-yellow/5 to-transparent"></div>

                            <div className="relative z-10 grid grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-50 shadow-sm p-6 rounded-3xl group-hover:shadow-md transition-shadow">
                                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">ROAS</p>
                                    <p className="text-4xl font-bold text-google-yellow">4.8x</p>
                                </div>
                                <div className="bg-white border border-gray-50 shadow-sm p-6 rounded-3xl group-hover:shadow-md transition-shadow">
                                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Reach</p>
                                    <p className="text-4xl font-bold text-navy-deep">1.2M</p>
                                </div>
                                <div className="bg-white border border-gray-50 shadow-sm p-6 rounded-3xl col-span-2 group-hover:shadow-md transition-shadow">
                                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Conversion Volume</p>
                                    <div className="flex items-end gap-2 h-20">
                                        <motion.div initial={{ height: 0 }} whileInView={{ height: '30%' }} className="w-full bg-gray-100 rounded-t-lg"></motion.div>
                                        <motion.div initial={{ height: 0 }} whileInView={{ height: '45%' }} className="w-full bg-gray-100 rounded-t-lg"></motion.div>
                                        <motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} className="w-full bg-gray-200 rounded-t-lg"></motion.div>
                                        <motion.div initial={{ height: 0 }} whileInView={{ height: '80%' }} className="w-full bg-google-yellow/40 rounded-t-lg"></motion.div>
                                        <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} className="w-full bg-google-yellow rounded-t-lg"></motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-12 right-12 size-20 bg-google-yellow/10 rounded-full flex items-center justify-center text-google-yellow group-hover:rotate-12 transition-transform">
                                <span className="material-symbols-outlined text-4xl font-variation-fill">local_fire_department</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ColorStripDivider />

            {/* Channels & Tactics */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 max-w-2xl">
                        <h2 className="text-google-yellow font-bold text-sm uppercase tracking-[0.2em] mb-4">Channels & Tactics</h2>
                        <h3 className="text-5xl font-display font-bold text-navy-deep leading-tight">Precision Targeting <br />at Scale.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Search Dominance", icon: "search", desc: "Capture high-intent traffic the moment they search for your solution with optimized Google Ads campaigns." },
                            { title: "Social Amplification", icon: "share", desc: "Build desire and brand awareness on Meta, LinkedIn, and TikTok with creative that stops the scroll." },
                            { title: "Retargeting Ecosystems", icon: "replay_circle_filled", desc: "Bring lost visitors back with strategic, sequential messaging across the entire digital landscape." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-12 rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="size-16 rounded-2xl bg-white shadow-md border border-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-google-yellow">{item.icon}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-navy-deep mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MediaIgnition;
