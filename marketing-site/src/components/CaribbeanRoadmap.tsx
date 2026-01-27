import React from 'react';
import { motion } from 'framer-motion';

const solutions = [
    {
        title: "Tourism & Hospitality Engine",
        icon: "hotel",
        desc: "Precision targeting for international luxury and boutique hospitality sectors.",
        tags: ["OTAs", "PPC", "Yield Mgmt"],
        color: "google-blue"
    },
    {
        title: "Digital Export Architecture",
        icon: "shopping_basket",
        desc: "Connecting regional manufacturers to global e-commerce and logistics networks.",
        tags: ["Payments", "Logistics", "Scale"],
        color: "google-red"
    },
    {
        title: "Institutional SEO Hub",
        icon: "map",
        desc: "Dominating search intent for both local residents and global researchers.",
        tags: ["SEO", "Maps", "Local"],
        color: "google-green"
    },
    {
        title: "AI Growth Intelligence",
        icon: "query_stats",
        desc: "Strategic roadmaps powered by AI-native data orchestration and analysis.",
        tags: ["Data", "AI", "Strategic"],
        color: "google-yellow"
    }
];

const CaribbeanRoadmap: React.FC = () => {
    return (
        <div className="relative py-24 overflow-hidden">
            {/* SVG Path Animation Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800" preserveAspectRatio="none">
                <motion.path
                    d="M 100 100 C 400 100, 600 400, 900 400"
                    fill="none"
                    stroke="rgba(26,115,232,0.1)"
                    strokeWidth="40"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                    d="M 100 100 C 400 100, 600 400, 900 400"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1A73E8" />
                        <stop offset="50%" stopColor="#EA4335" />
                        <stop offset="100%" stopColor="#34A853" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 lg:grid-cols-4">
                    {solutions.map((solution, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/10 transition-all group relative"
                        >
                            <div className="absolute -top-4 -right-4 size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-600 tracking-tighter">
                                0{i + 1}
                            </div>

                            <div className={`size-14 rounded-2xl bg-${solution.color}/10 flex items-center justify-center text-${solution.color} mb-8 group-hover:bg-${solution.color} group-hover:text-white transition-all shadow-inner`}>
                                <span className="material-symbols-outlined text-3xl">{solution.icon}</span>
                            </div>

                            <h4 className="text-2xl font-display font-bold text-white mb-4 leading-tight">{solution.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">{solution.desc}</p>

                            <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                                {solution.tags.map(tag => (
                                    <span key={tag} className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Floating Glows for the Roadmap */}
            <div className="absolute top-[100px] left-[100px] size-4 w-4 bg-google-blue rounded-full blur-md animate-ping"></div>
            <div className="absolute top-[400px] left-[600px] size-4 w-4 bg-google-red rounded-full blur-md animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[400px] left-[900px] size-4 w-4 bg-google-green rounded-full blur-md animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>
    );
};

export default CaribbeanRoadmap;
