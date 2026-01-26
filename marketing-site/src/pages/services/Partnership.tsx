import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const Partnership: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/services" className="inline-flex items-center text-google-green font-bold mb-12 hover:translate-x-[-4px] transition-transform">
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Back to Solutions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-green/10 text-google-green text-xs font-bold uppercase tracking-widest">
                            Level 03: Sustaining Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight">
                            The Proactive <br />
                            <span className="text-google-green">Partnership.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Growth is not a project; it's an ongoing endeavor. Our Proactive Partnership offers enterprise-grade technical oversight and long-term strategic alignment to ensure your digital ecosystem scales as fast as your ambition.
                        </p>
                        <button
                            onClick={() => setModalOpen(true, 'audit')}
                            className="bg-google-green hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all"
                        >
                            Discuss Ongoing Strategy
                        </button>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-surface border border-gray-100 p-16 flex flex-col items-center justify-center text-center space-y-8 shadow-inner overflow-hidden">
                            <span className="material-symbols-outlined text-[10rem] text-google-green">handshake</span>
                        </div>
                        <div className="absolute top-1/2 right-[-20px] translate-y-[-50%] group-hover:translate-x-[-10px] transition-transform">
                            <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-google-green animate-ping"></span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Monitoring</span>
                                </div>
                                <p className="font-display font-bold text-2xl">99.9% Uptime</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Enterprise Oversight", icon: "admin_panel_settings", desc: "Dedicated technical management of your entire marketing stack and API integrations." },
                        { title: "Continuous Optimization", icon: "update", desc: "Monthly strategy roadmaps that adapt to global market shifts and algorithmic updates." },
                        { title: "Unified Attribution", icon: "dashboard", desc: "Real-time Looker Studio dashboards that provide 100% clarity on your click-to-client ROI." }
                    ].map((item, i) => (
                        <div key={i} className="bg-surface p-10 rounded-3xl border border-gray-50 shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-google-green mb-6">{item.icon}</span>
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partnership;
