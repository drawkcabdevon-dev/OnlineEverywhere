import React from 'react';
import { motion } from 'framer-motion';

const ColorStripDivider: React.FC = () => (
    <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

const AboutUs: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* About Hero */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute -top-24 -right-24 size-[600px] bg-google-blue/5 rounded-full blur-[120px]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-google-blue font-bold text-sm uppercase tracking-[0.2em] mb-6">Our Mission</h2>
                            <h1 className="text-6xl lg:text-8xl font-display font-bold text-navy-deep tracking-tight mb-8 leading-[0.9]">
                                Bridging Local <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-green">Excellence.</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
                                OnLineEverywhere (OLE) was founded on the principle that true growth in the modern era requires a fundamental transition to a digital-first, data-driven institutional culture.
                            </p>
                            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border-l-4 border-google-blue italic">
                                <p className="text-lg text-gray-500 leading-relaxed">
                                    "We provide frameworks, not just fixes. We target the world, not just the neighborhood. We enable businesses to own and act on their data."
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-[4rem] bg-white border border-gray-100 p-16 flex flex-col items-center justify-center text-center space-y-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-google-blue/5 to-transparent"></div>
                                <div className="size-32 rounded-[2rem] bg-google-blue/10 flex items-center justify-center text-google-blue mb-4">
                                    <span className="material-symbols-outlined text-6xl font-variation-light">hub</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold text-navy-deep relative z-10">Institutional Integrity</h3>
                                <p className="text-gray-500 relative z-10 text-lg leading-relaxed">Our methodology is designed to scale with your ambition, ensuring that your digital assets reflect the same excellence as your core business operations.</p>
                            </div>

                            {/* Floating decorative nodes */}
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-8 -left-8 size-24 bg-white shadow-xl rounded-2xl flex items-center justify-center text-google-red border border-gray-50">
                                <span className="material-symbols-outlined text-3xl">insights</span>
                            </motion.div>
                            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-8 -right-8 size-28 bg-white shadow-xl rounded-3xl flex items-center justify-center text-google-green border border-gray-50">
                                <span className="material-symbols-outlined text-4xl">travel_explore</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Team of One",
                                icon: "bolt",
                                color: "google-blue",
                                desc: "We empower individual leaders and small teams with enterprise-grade AI power to multiply their strategic impact."
                            },
                            {
                                title: "Certified Excellence",
                                icon: "verified",
                                color: "google-green",
                                desc: "Led by a Google Certified Professional, we implement the highest standards of technical excellence across all platforms."
                            },
                            {
                                title: "Data Sovereignty",
                                icon: "security",
                                color: "google-red",
                                desc: "We ensure you own your data, your audience, and your platform. No black-box algorithms or proprietary lock-ins."
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-12 rounded-[3rem] border border-gray-100 group hover:border-google-blue transition-all duration-500 shadow-sm hover:shadow-2xl"
                            >
                                <div className={`size-16 rounded-2xl bg-white shadow-md border border-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <span className={`material-symbols-outlined text-4xl text-${value.color}`}>{value.icon}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-navy-deep mb-4">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Legacy Section */}
            <section className="py-32">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-navy-deep rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black to-navy-deep"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <span className="material-symbols-outlined text-[15rem] text-white">public</span>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-google-blue font-bold uppercase tracking-[0.3em] text-xs mb-8">Established 2018</h2>
                            <h3 className="text-4xl lg:text-6xl font-display font-bold text-white mb-8 tracking-tight">A Digital Legacy in the Making.</h3>
                            <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
                                We specialize in digital transformation for the tourism industry and beyond, bridging the gap between local excellence and the global digital economy.
                            </p>
                            <div className="flex flex-wrap justify-center gap-12">
                                <div className="flex gap-3 items-center text-gray-300">
                                    <span className="material-symbols-outlined text-google-blue">public</span>
                                    <span className="font-bold tracking-widest uppercase text-xs">Global Strategy</span>
                                </div>
                                <div className="flex gap-3 items-center text-gray-300">
                                    <span className="material-symbols-outlined text-google-red">history_edu</span>
                                    <span className="font-bold tracking-widest uppercase text-xs">Technical Heritage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
