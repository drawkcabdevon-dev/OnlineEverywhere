import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const Launchpad: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/services" className="inline-flex items-center text-google-blue font-bold mb-12 hover:translate-x-[-4px] transition-transform">
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Back to Solutions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-xs font-bold uppercase tracking-widest">
                            Level 01: Setup Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight">
                            The Digital <br />
                            <span className="text-google-blue">Launchpad.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Every global endeavor begins with a robust foundation. Our Digital Launchpad is designed to equip your business with the professional assets and technical infrastructure required to compete on the international stage.
                        </p>
                        <button
                            onClick={() => setModalOpen(true, 'audit')}
                            className="bg-google-blue hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all"
                        >
                            Request a Setup Audit
                        </button>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-surface border border-gray-100 p-16 flex flex-col items-center justify-center text-center space-y-8 shadow-inner overflow-hidden">
                            <span className="material-symbols-outlined text-[10rem] text-google-blue">rocket_launch</span>
                        </div>
                        <div className="absolute top-0 right-0 p-8">
                            <div className="bg-white p-4 rounded-2xl shadow-m3 border border-gray-100 flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-green">check_circle</span>
                                <span className="font-bold text-sm">Global Readiness Validated</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "High-Performance Web Engineering", icon: "code", desc: "Expert development of new digital platforms or seamless migrations from legacy systems. Optimized for a modern technical core." },
                        { title: "Core Web Vitals Mastery", icon: "speed", desc: "Rigorous PageSpeed Insights auditing and implementation of best-in-class technical health standards for zero latency." },
                        { title: "Institutional SEO Architecture", icon: "data_exploration", desc: "Full-page indexing setup, sitemap submission, and URL inspections to ensure immediate recognition by search engines." }
                    ].map((item, i) => (
                        <div key={i} className="bg-surface p-10 rounded-3xl border border-gray-50 shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-google-blue mb-6">{item.icon}</span>
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Launchpad;
