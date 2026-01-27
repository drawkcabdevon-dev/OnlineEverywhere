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

const Launchpad: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* Landing Hero */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute -top-24 -right-24 size-[600px] bg-google-blue/5 rounded-full blur-[120px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/services" className="inline-flex items-center text-google-blue font-bold mb-8 hover:translate-x-[-4px] transition-transform group">
                            <span className="material-symbols-outlined mr-2 group-hover:bg-blue-50 rounded-full p-1 transition-colors">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                            Foundation Phase
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-display font-bold text-navy-deep mb-8 leading-[0.9] tracking-tight">
                            The Digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-cyan-400">Launchpad.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                            Establish a world-class digital presence. We engineer high-performance websites and brand identity systems designed for global scale from day one.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[
                                { title: "Zero-Latency Architecture", icon: "speed" },
                                { title: "International SEO Core", icon: "public" },
                                { title: "Institutional Brand Design", icon: "verified" },
                                { title: "Data-First Infrastructure", icon: "database" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                                    <span className="material-symbols-outlined text-google-blue text-xl">check_circle</span>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-blue hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-google-blue/30 transition-all transform hover:scale-[1.02]"
                            >
                                Start Your Build
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-google-blue/5 to-transparent"></div>

                            <div className="relative z-10">
                                <div className="flex items-end gap-3 mb-6">
                                    <motion.div animate={{ height: [40, 60, 40] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 bg-google-blue/20 rounded-t-lg"></motion.div>
                                    <motion.div animate={{ height: [60, 100, 60] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="w-6 bg-google-blue/40 rounded-t-lg"></motion.div>
                                    <motion.div animate={{ height: [100, 160, 100] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="w-6 bg-google-blue/60 rounded-t-lg"></motion.div>
                                    <motion.div animate={{ height: [160, 240, 160] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="w-6 bg-google-blue rounded-t-lg"></motion.div>
                                </div>
                                <h3 className="text-navy-deep font-bold text-3xl mb-2">Velocity Index</h3>
                                <p className="text-gray-400 font-medium">Technical Speed-to-Market Metrics</p>
                            </div>

                            <div className="absolute top-12 right-12 size-24 bg-google-blue/10 rounded-full flex items-center justify-center text-google-blue group-hover:rotate-12 transition-transform duration-500">
                                <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ColorStripDivider />

            {/* Core Deliverables */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 max-w-2xl">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-[0.2em] mb-4">Core Deliverables</h2>
                        <h3 className="text-5xl font-display font-bold text-navy-deep leading-tight">Engineering Your <br />Competitive Advantage.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Web Engineering", icon: "code", desc: "Expert development of new digital platforms or seamless migrations from legacy systems. Optimized for modern core." },
                            { title: "Core Web Vitals", icon: "speed", desc: "Rigorous PageSpeed Insights auditing and implementation of best-in-class technical health standards." },
                            { title: "SEO Architecture", icon: "data_exploration", desc: "Full-page indexing setup, sitemap submission, and URL inspections to ensure immediate recognition by search engines." }
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
                                    <span className="material-symbols-outlined text-4xl text-google-blue">{item.icon}</span>
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

export default Launchpad;
