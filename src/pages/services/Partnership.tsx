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

const Partnership: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* Landing Hero */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,168,83,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute -top-24 -left-24 size-[600px] bg-google-green/5 rounded-full blur-[120px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/services" className="inline-flex items-center text-google-green font-bold mb-8 hover:translate-x-[-4px] transition-transform group">
                            <span className="material-symbols-outlined mr-2 group-hover:bg-green-50 rounded-full p-1 transition-colors">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-green/10 border border-google-green/20 text-google-green text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="material-symbols-outlined text-sm">handshake</span>
                            Scale Phase
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-display font-bold text-navy-deep mb-8 leading-[0.9] tracking-tight">
                            The Proactive <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-green to-emerald-500">Partnership.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                            Growth is not a project; it's an ongoing discipline. We provide enterprise-grade technical oversight and long-term strategic alignment to ensure your digital ecosystem scales safely.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[
                                { title: "Strategic Roadmapping", icon: "map" },
                                { title: "Infrastructure Health", icon: "health_and_safety" },
                                { title: "Priority Development", icon: "priority_high" },
                                { title: "Ongoing Optimization", icon: "trending_up" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                                    <span className="material-symbols-outlined text-google-green text-xl">check_circle</span>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-green hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-google-green/30 transition-all transform hover:scale-[1.02]"
                            >
                                Discuss Ongoing Strategy
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
                            <div className="absolute inset-0 bg-gradient-to-br from-google-green/5 to-transparent"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="border-[1px] border-google-green size-[400px] rounded-full absolute"></motion.div>
                                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="border-[1px] border-google-green size-[300px] rounded-full absolute"></motion.div>
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="border-[1px] border-google-green size-[200px] rounded-full absolute"></motion.div>
                            </div>

                            <div className="relative z-10 w-full mb-4">
                                <div className="h-1.5 bg-gray-100 w-full rounded-full mb-6 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '99.9%' }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="h-full bg-google-green"
                                    ></motion.div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold mb-2">System Health</p>
                                        <p className="text-5xl font-bold text-navy-deep">99.99%</p>
                                    </div>
                                    <div className="size-16 rounded-2xl bg-google-green text-white flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                                        <span className="material-symbols-outlined text-3xl font-variation-fill">verified_user</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ColorStripDivider />

            {/* Continuous Evolution */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 max-w-2xl">
                        <h2 className="text-google-green font-bold text-sm uppercase tracking-[0.2em] mb-4">Continuous Evolution</h2>
                        <h3 className="text-5xl font-display font-bold text-navy-deep leading-tight">Your External <br />CTO & CMO.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Technical Oversight", icon: "dns", desc: "Regular security patches, dependency updates, and server optimizations to prevent technical debt from accumulating." },
                            { title: "Content Strategy", icon: "edit_calendar", desc: "Data-informed editorial calendars and SEO content briefs to ensure you capture new search intent opportunities." },
                            { title: "Expansion Architecture", icon: "hub", desc: "Scalable systems design for new product lines, international markets, or sub-brand launches." }
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
                                    <span className="material-symbols-outlined text-4xl text-google-green">{item.icon}</span>
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

export default Partnership;
