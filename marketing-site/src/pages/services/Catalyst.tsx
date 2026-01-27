import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const Catalyst: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-background">
            {/* Landing Hero */}
            <section className="relative min-h-[60vh] flex items-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply"></div>
                    <div className="absolute top-[100px] -left-[100px] size-[500px] bg-google-red/30 rounded-full blur-[100px] animate-pulse"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link to="/services" className="inline-flex items-center text-red-200 font-bold mb-6 hover:translate-x-[-4px] transition-transform">
                            <span className="material-symbols-outlined mr-2">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-red/10 border border-google-red/20 text-red-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-sm">bolt</span>
                            Growth Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            The Conversion <span className="text-google-red">Catalyst.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-lg">
                            Stop leaking revenue. We optimize your existing traffic through psychological behavioral audits and rigorous A/B testing to turn visitors into brand advocates.
                        </p>
                        <ul className="space-y-3 mb-10 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-red">check_circle</span>
                                <span>Deep Behavioral Analytics</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-red">check_circle</span>
                                <span>Checkout Friction Removal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-red">check_circle</span>
                                <span>Data-Driven CRO Roadmaps</span>
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-google-red/50 transition-all"
                            >
                                Audit My Funnel
                            </button>
                        </div>
                    </div>
                    <div className="relative lg:h-[500px] flex items-center justify-center">
                        {/* Visual abstract representation of conversion */}
                        <div className="relative size-full bg-gradient-to-tl from-gray-800 to-gray-900 rounded-[2rem] border border-gray-700 p-8 flex flex-col justify-end overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="size-64 border-[12px] border-google-red/20 rounded-full flex items-center justify-center">
                                    <div className="size-48 border-[12px] border-google-red/40 rounded-full flex items-center justify-center">
                                        <div className="size-32 bg-google-red rounded-full shadow-[0_0_60px_rgba(234,67,53,0.6)] animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 flex justify-between items-end border-t border-gray-700 pt-6">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest">Conversion Rate</p>
                                    <p className="text-3xl font-bold text-white">+140%</p>
                                </div>
                                <span className="material-symbols-outlined text-google-red text-4xl">trending_up</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-google-red font-bold text-sm uppercase tracking-widest mb-4">Optimization Suite</h2>
                        <h3 className="text-4xl font-display font-bold text-gray-900">Psychology Meets Data Science.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Deep Behavioral Audits", icon: "psychology", desc: "Mapping the customer journey through GA4 and GTM to pinpoint exact friction points costing you revenue." },
                            { title: "Structured Data Schema", icon: "schema", desc: "Implementation of product snippets and rich data frameworks to maximize your presence on Google Discovery." },
                            { title: "Integrated Growth Tracking", icon: "query_stats", desc: "Setting up essential tracking from the first visit to ensure actionable intelligence across your ecosystem." }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="size-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-google-red">{item.icon}</span>
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

export default Catalyst;
