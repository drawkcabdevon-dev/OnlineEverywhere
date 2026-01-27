import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const MediaIgnition: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-background">
            {/* Landing Hero */}
            <section className="relative min-h-[60vh] flex items-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-yellow-600/10 mix-blend-multiply"></div>
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 size-[800px] bg-google-yellow/20 rounded-full blur-[120px] animate-pulse"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link to="/services" className="inline-flex items-center text-yellow-200 font-bold mb-6 hover:translate-x-[-4px] transition-transform">
                            <span className="material-symbols-outlined mr-2">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-yellow/10 border border-google-yellow/20 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-sm">local_fire_department</span>
                            Ignition Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            Paid Media <span className="text-google-yellow">Ignition.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-lg">
                            Market penetration at the speed of thought. We combine high-fidelity creative assets with sophisticated audience modeling to capture immediate international demand.
                        </p>
                        <ul className="space-y-3 mb-10 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-yellow">check_circle</span>
                                <span>Cross-Platform Omni-Channel</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-yellow">check_circle</span>
                                <span>Lookalike Audience Modeling</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-yellow">check_circle</span>
                                <span>High-ROAS Creative Strategy</span>
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-yellow hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-google-yellow/50 transition-all outline-none"
                            >
                                Ignite Your Growth
                            </button>
                        </div>
                    </div>
                    <div className="relative lg:h-[500px] flex items-center justify-center">
                        {/* Visual abstract representation of ignition */}
                        <div className="relative size-full bg-gradient-to-bl from-gray-800 to-gray-900 rounded-[2rem] border border-gray-700 p-8 flex flex-col justify-end overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-google-yellow/10 to-transparent rounded-full blur-3xl"></div>

                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">ROAS</p>
                                    <p className="text-2xl font-bold text-google-yellow">4.8x</p>
                                </div>
                                <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Reach</p>
                                    <p className="text-2xl font-bold text-white">1.2M</p>
                                </div>
                                <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700 col-span-2">
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Conversion Volume</p>
                                    <div className="flex items-end gap-1 h-12 mt-2">
                                        <div className="w-1/5 h-[30%] bg-gray-600 rounded-t-sm"></div>
                                        <div className="w-1/5 h-[45%] bg-gray-600 rounded-t-sm"></div>
                                        <div className="w-1/5 h-[50%] bg-gray-500 rounded-t-sm"></div>
                                        <div className="w-1/5 h-[75%] bg-google-yellow/50 rounded-t-sm"></div>
                                        <div className="w-1/5 h-[100%] bg-google-yellow rounded-t-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-google-yellow font-bold text-sm uppercase tracking-widest mb-4">Channels & Tactics</h2>
                        <h3 className="text-4xl font-display font-bold text-gray-900">Precision Targeting at Scale.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Search Dominance", icon: "search", desc: "Capture high-intent traffic the moment they are searching for your solution with optimized Google Ads campaigns." },
                            { title: "Social Amplification", icon: "share", desc: "Build desire and brand awareness on Meta, LinkedIn, and TikTok with creative that stops the scroll." },
                            { title: "Retargeting Ecosystems", icon: "replay_circle_filled", desc: "Bring lost visitors back to complete their purchase with strategic, sequential messaging across the web." }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="size-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-google-yellow">{item.icon}</span>
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

export default MediaIgnition;
