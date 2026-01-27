import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const Launchpad: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-background">
            {/* Landing Hero */}
            <section className="relative min-h-[60vh] flex items-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
                    <div className="absolute -top-[100px] -right-[100px] size-[500px] bg-google-blue/30 rounded-full blur-[100px] animate-pulse"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link to="/services" className="inline-flex items-center text-blue-300 font-bold mb-6 hover:translate-x-[-4px] transition-transform">
                            <span className="material-symbols-outlined mr-2">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 border border-google-blue/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                            Foundation Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            The Digital <span className="text-google-blue">Launchpad.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-lg">
                            Establish a world-class digital presence. We engineer high-performance websites and brand identity systems designed for global scale from day one.
                        </p>
                        <ul className="space-y-3 mb-10 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-blue">check_circle</span>
                                <span>Zero-Latency Web Architecture</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-blue">check_circle</span>
                                <span>International SEO Foundation</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-blue">check_circle</span>
                                <span>Institutional Brand Design</span>
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-google-blue/50 transition-all"
                            >
                                Start Your Build
                            </button>
                        </div>
                    </div>
                    <div className="relative lg:h-[500px] flex items-center justify-center">
                        {/* Visual abstract representation of launch */}
                        <div className="relative size-full bg-gradient-to-tr from-gray-800 to-gray-900 rounded-[2rem] border border-gray-700 p-8 flex flex-col justify-end overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="relative z-10">
                                <div className="flex items-end gap-2 mb-2">
                                    <div className="w-4 h-12 bg-google-blue rounded-t-sm"></div>
                                    <div className="w-4 h-20 bg-google-blue rounded-t-sm"></div>
                                    <div className="w-4 h-32 bg-google-blue rounded-t-sm"></div>
                                    <div className="w-4 h-48 bg-google-blue rounded-t-sm animate-pulse"></div>
                                </div>
                                <h3 className="text-white font-bold text-2xl">Velocity Index</h3>
                                <p className="text-gray-400 text-sm">Speed-to-market metrics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Core Deliverables</h2>
                        <h3 className="text-4xl font-display font-bold text-gray-900">Engineering Your Competitive Advantage.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "High-Performance Web Engineering", icon: "code", desc: "Expert development of new digital platforms or seamless migrations from legacy systems. Optimized for a modern technical core." },
                            { title: "Core Web Vitals Mastery", icon: "speed", desc: "Rigorous PageSpeed Insights auditing and implementation of best-in-class technical health standards for zero latency." },
                            { title: "Institutional SEO Architecture", icon: "data_exploration", desc: "Full-page indexing setup, sitemap submission, and URL inspections to ensure immediate recognition by search engines." }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="size-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-google-blue">{item.icon}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Launchpad;
