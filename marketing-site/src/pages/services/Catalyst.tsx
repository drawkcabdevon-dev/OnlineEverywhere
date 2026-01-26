import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const Catalyst: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/services" className="inline-flex items-center text-google-red font-bold mb-12 hover:translate-x-[-4px] transition-transform">
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Back to Solutions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-red/10 text-google-red text-xs font-bold uppercase tracking-widest">
                            Level 02: Growth Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight">
                            The Conversion <br />
                            <span className="text-google-red">Catalyst.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Stop leaking revenue. The Conversion Catalyst is an aggressive optimization framework that utilizes psychological behavioral audits and custom A/B testing to turn your existing traffic into brand advocates.
                        </p>
                        <button
                            onClick={() => setModalOpen(true, 'audit')}
                            className="bg-google-red hover:bg-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all"
                        >
                            Request a Conversion Audit
                        </button>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-surface border border-gray-100 p-16 flex flex-col items-center justify-center text-center space-y-8 shadow-inner overflow-hidden">
                            <span className="material-symbols-outlined text-[10rem] text-google-red">bolt</span>
                        </div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <div className="bg-white p-4 rounded-2xl shadow-m3 border border-gray-100 flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-red">trending_up</span>
                                <span className="font-bold text-sm">45% Avg. CR Increase</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Deep Behavioral Audits", icon: "psychology", desc: "Mapping the customer journey through GA4 and GTM to pinpoint exact friction points costing you revenue." },
                        { title: "Structured Data Schema", icon: "schema", desc: "Implementation of product snippets and rich data frameworks to maximize your presence on Google Discovery." },
                        { title: "Integrated Growth Tracking", icon: "query_stats", desc: "Setting up essential tracking from the first visit to ensure actionable intelligence across your ecosystem." }
                    ].map((item, i) => (
                        <div key={i} className="bg-surface p-10 rounded-3xl border border-gray-50 shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-google-red mb-6">{item.icon}</span>
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalyst;
