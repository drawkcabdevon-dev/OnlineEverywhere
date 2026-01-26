import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const MediaIgnition: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/services" className="inline-flex items-center text-google-yellow font-bold mb-12 hover:translate-x-[-4px] transition-transform">
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Back to Solutions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-yellow/10 text-google-yellow text-xs font-bold uppercase tracking-widest">
                            Premium: Scaling Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight">
                            Paid Media <br />
                            <span className="text-google-yellow">Ignition.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Market penetration at the speed of thought. Paid Media Ignition combines high-fidelity creative assets with sophisticated audience modeling to capture international demand on search and social engines.
                        </p>
                        <button
                            onClick={() => setModalOpen(true, 'audit')}
                            className="bg-google-yellow hover:bg-yellow-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all outline-none"
                        >
                            Ignite Your Campaigns
                        </button>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-surface border border-gray-100 p-16 flex flex-col items-center justify-center text-center space-y-8 shadow-inner overflow-hidden">
                            <span className="material-symbols-outlined text-[10rem] text-google-yellow">local_fire_department</span>
                        </div>
                        <div className="absolute top-0 left-0 p-8">
                            <div className="bg-white p-4 rounded-2xl shadow-m3 border border-gray-100 flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-yellow">stars</span>
                                <span className="font-bold text-sm">4.8x Avg. ROAS</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Multi-Platform Ads", icon: "ads_click", desc: "Expert management across Google Ads, Meta, and niche tourism display networks." },
                        { title: "Audience Modeling", icon: "group_add", desc: "Custom persona targeting that evolves as international travel patterns shift." },
                        { title: "Real-time Attribution", icon: "query_stats", desc: "Live performance dashboards that track every dollar spent to every customer acquired." }
                    ].map((item, i) => (
                        <div key={i} className="bg-surface p-10 rounded-3xl border border-gray-50 shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-google-yellow mb-6">{item.icon}</span>
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MediaIgnition;
