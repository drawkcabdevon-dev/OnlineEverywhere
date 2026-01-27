import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const Partnership: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-background">
            {/* Landing Hero */}
            <section className="relative min-h-[60vh] flex items-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-green-900/20 mix-blend-multiply"></div>
                    <div className="absolute top-[20%] right-[30%] size-[600px] bg-google-green/20 rounded-full blur-[120px] animate-pulse"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link to="/services" className="inline-flex items-center text-green-200 font-bold mb-6 hover:translate-x-[-4px] transition-transform">
                            <span className="material-symbols-outlined mr-2">arrow_back</span>
                            Back to Solutions
                        </Link>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-green/10 border border-google-green/20 text-green-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-sm">handshake</span>
                            Scale Phase
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            The Proactive <span className="text-google-green">Partnership.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-lg">
                            Growth is not a project; it's an ongoing discipline. We provide enterprise-grade technical oversight and long-term strategic alignment to ensure your digital ecosystem scales safely.
                        </p>
                        <ul className="space-y-3 mb-10 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-green">check_circle</span>
                                <span>Monthly Strategic Roadmapping</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-green">check_circle</span>
                                <span>Infrastructure Health Monitoring</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-green">check_circle</span>
                                <span>Priority Feature Development</span>
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-green hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-google-green/50 transition-all"
                            >
                                Discuss Ongoing Strategy
                            </button>
                        </div>
                    </div>
                    <div className="relative lg:h-[500px] flex items-center justify-center">
                        {/* Visual abstract representation of partnership */}
                        <div className="relative size-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] border border-gray-700 p-8 flex flex-col justify-end overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                <div className="border border-google-green/30 size-[400px] rounded-full absolute animate-[spin_10s_linear_infinite]"></div>
                                <div className="border border-google-green/30 size-[300px] rounded-full absolute animate-[spin_15s_linear_infinite_reverse]"></div>
                                <div className="border border-google-green/30 size-[200px] rounded-full absolute animate-[spin_20s_linear_infinite]"></div>
                            </div>
                            <div className="relative z-10">
                                <div className="h-1 bg-gray-700 w-full rounded-full mb-4 overflow-hidden">
                                    <div className="h-full bg-google-green w-3/4 animate-pulse"></div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest">System Health</p>
                                        <p className="text-3xl font-bold text-white">99.99%</p>
                                    </div>
                                    <span className="material-symbols-outlined text-google-green text-4xl">verified_user</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-google-green font-bold text-sm uppercase tracking-widest mb-4">Continuous Evolution</h2>
                        <h3 className="text-4xl font-display font-bold text-gray-900">Your External CTO & CMO.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Technical Oversight", icon: "dns", desc: "Regular security patches, dependency updates, and server optimizations to prevent technical debt from accumulating." },
                            { title: "Content Strategy", icon: "edit_calendar", desc: "Data-informed editorial calendars and SEO content briefs to ensure you capture new search intent opportunities." },
                            { title: "Expansion Architecture", icon: "hub", desc: "Scalable systems design for new product lines, international markets, or sub-brand launches." }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="size-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-google-green">{item.icon}</span>
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

export default Partnership;
