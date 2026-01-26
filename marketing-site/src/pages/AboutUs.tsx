import React from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
    return (
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <div>
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Our Mission</h2>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight mb-8">
                            Bridging Local Excellence to <br />
                            <span className="text-google-blue">Global Demand.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-6">
                            OnLineEverywhere (OLE) was founded on the principle that true growth in the modern era requires a fundamental transition to a digital-first, data-driven institutional culture.
                        </p>
                        <p className="text-lg text-gray-500 leading-relaxed italic">
                            "We provide frameworks, not just fixes. We target the world, not just the neighborhood. We enable businesses to own and act on their data."
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-surface border border-gray-100 p-12 flex flex-col items-center justify-center text-center space-y-8 shadow-inner overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-google-blue/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <span className="material-symbols-outlined text-[8rem] text-google-blue animate-pulse">account_balance</span>
                            <h3 className="text-3xl font-display font-bold text-gray-900 relative z-10">Institutional Integrity</h3>
                            <p className="text-gray-500 relative z-10">Our methodology is designed to scale with your ambition, ensuring that your digital assets reflect the same excellence as your core business operations.</p>
                        </div>
                        <div className="absolute -top-6 -right-6 size-32 bg-google-red/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-6 -left-6 size-40 bg-google-blue/10 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    {[
                        {
                            title: "The Team of One",
                            icon: "person_celebrate",
                            desc: "We empower individual leaders and small teams with enterprise-grade AI power to multiply their strategic impact."
                        },
                        {
                            title: "Google Certified Excellence",
                            icon: "verified",
                            desc: "Led by a Google Certified Professional, we implement the highest standards of technical excellence across all platforms."
                        },
                        {
                            title: "Data Sovereignty",
                            icon: "security",
                            desc: "We ensure you own your data, your audience, and your platform. No black-box algorithms or proprietary lock-ins."
                        }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-surface p-10 rounded-3xl border border-gray-100 group hover:border-google-blue transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-4xl text-google-blue mb-6 group-hover:scale-110 transition-transform inline-block">{value.icon}</span>
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{value.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Legacy Section */}
                <div className="bg-gray-50 rounded-[40px] p-12 lg:p-24 border border-gray-100 text-center max-w-5xl mx-auto">
                    <h2 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6">Established 2018</h2>
                    <h3 className="text-4xl font-display font-bold text-gray-900 mb-8">A Digital Legacy in the Making.</h3>
                    <p className="text-xl text-gray-500 leading-relaxed mb-12 max-w-3xl mx-auto">
                        We specialize in digital transformation for the tourism industry and beyond, bridging the gap between local excellence and the global digital economy. Join us in defining the next chapter of international growth.
                    </p>
                    <div className="flex justify-center gap-12">
                        <div className="flex gap-2 items-center text-gray-400">
                            <span className="material-symbols-outlined">public</span>
                            <span className="font-bold">Global Strategy</span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-400">
                            <span className="material-symbols-outlined">history_edu</span>
                            <span className="font-bold">Technical Heritage</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
