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

const Catalyst: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* Landing Hero */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,67,53,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute -top-24 -left-24 size-[600px] bg-google-red/5 rounded-full blur-[120px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/services" className="inline-flex items-center text-google-red font-bold mb-8 hover:translate-x-[-4px] transition-transform group">
                            <span className="material-symbols-outlined mr-2 group-hover:bg-red-50 rounded-full p-1 transition-colors">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-red/10 border border-google-red/20 text-google-red text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="material-symbols-outlined text-sm">bolt</span>
                            Growth Phase
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-display font-bold text-navy-deep mb-8 leading-[0.9] tracking-tight">
                            The Conversion <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-red to-orange-400">Catalyst.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                            Stop leaking revenue. We optimize your existing traffic through psychological behavioral audits and rigorous A/B testing to turn visitors into brand advocates.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[
                                { title: "Deep Behavioral Analytics", icon: "psychology" },
                                { title: "Checkout Friction Removal", icon: "shopping_cart_checkout" },
                                { title: "Data-Driven CRO Roadmaps", icon: "map" },
                                { title: "A/B Testing Frameworks", icon: "science" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                                    <span className="material-symbols-outlined text-google-red text-xl">check_circle</span>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-red hover:bg-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-google-red/30 transition-all transform hover:scale-[1.02]"
                            >
                                Audit My Funnel
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
                            <div className="absolute inset-0 bg-gradient-to-br from-google-red/5 to-transparent"></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="size-64 border-[1px] border-google-red/10 rounded-full flex items-center justify-center">
                                    <div className="size-48 border-[1px] border-google-red/20 rounded-full flex items-center justify-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="size-32 bg-google-red/20 rounded-full blur-2xl"
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex justify-between items-end border-t border-gray-50 pt-8">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold mb-2">Conversion Lift</p>
                                    <p className="text-5xl font-bold text-navy-deep">+140%</p>
                                </div>
                                <div className="size-16 rounded-2xl bg-google-red text-white flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                                    <span className="material-symbols-outlined text-3xl font-variation-fill">trending_up</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ColorStripDivider />

            {/* Optimization Suite */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 max-w-2xl">
                        <h2 className="text-google-red font-bold text-sm uppercase tracking-[0.2em] mb-4">Optimization Suite</h2>
                        <h3 className="text-5xl font-display font-bold text-navy-deep leading-tight">Psychology Meets <br />Data Science.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Behavioral Audits", icon: "psychology", desc: "Mapping the customer journey through GA4 and GTM to pinpoint exact friction points costing you revenue." },
                            { title: "Data Schema", icon: "schema", desc: "Implementation of product snippets and rich data frameworks to maximize your presence on Google Discovery." },
                            { title: "Growth Tracking", icon: "query_stats", desc: "Setting up essential tracking from the first visit to ensure actionable intelligence across your ecosystem." }
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
                                    <span className="material-symbols-outlined text-4xl text-google-red">{item.icon}</span>
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

export default Catalyst;
