import React from 'react';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
    const projects = [
        {
            title: "Global Tourism Intelligence Hub",
            category: "Technical Architecture",
            description: "A comprehensive data ecosystem for a national tourism body, integrating GA4, custom CRM APIs, and real-time behavioral tracking.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcsnTzbzJAof_YWdprJTvX4QpAdmkEC1ulbDcN1GceWvskDnRyga95IfRUk8L8K1lHX6QcqvRc-u2idzZ-yq5vOu1fEoWb-Gk2XFoblihPf97q4fyfzmfgYUm3w5vzoqpXc1LEnPoBLb2LT_NCu4D8KhvcfdouxpmH07afphP0M7zpJplxqUsXbbhFA6Y_AfJfmWV5Y57mZzN5x3SjZKQW35j1B_2jsbx-muqg5jyGC73tsw0ouDM8BG_aL6hFiwdFLRHPborldU",
            tags: ["React", "BigQuery", "API Orchestration"],
            results: "+140% Conversion Lift"
        },
        {
            title: "Ocean Blue International",
            category: "Brand & Web Engineering",
            description: "Institutional rebranding and high-performance web infrastructure for a luxury hospitality group targeting European markets.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPUc8wJRKJL-idYU3ytHQhrGZPVnGYb0vbKABO9AfePRXqthWXoBEcNYWGPzGgRhZGRRmo84e7ZOHi3xHGb38xMj-wcCFT5Ig-6bsbAm0A-5vbnKpLM8HepUmr9O43e03_UIXQ1Yh4jBVmicRc5ItNXEnXsoqc9LZ_XhJKOaBhE9lbVxvCb-bXA3H5d9tMRCvOpPANQg2VuQLvOwPxHZ7heaZ7a8-yDmWVJU8dlssOKehykxoKH5cDjC_1NFwCKMDNhIyOQIoS1TE",
            tags: ["Brand Identity", "Next.js", "Core Web Vitals"],
            results: "4.8x ROAS"
        },
        {
            title: "Endeavor Growth Dashboard",
            category: "Strategic Analytics",
            description: "A unified ROI reporting engine for multi-channel marketing spend, closing the loop on a $2M ARR growth endeavor.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcsnTzbzJAof_YWdprJTvX4QpAdmkEC1ulbDcN1GceWvskDnRyga95IfRUk8L8K1lHX6QcqvRc-u2idzZ-yq5vOu1fEoWb-Gk2XFoblihPf97q4fyfzmfgYUm3w5vzoqpXc1LEnPoBLb2LT_NCu4D8KhvcfdouxpmH07afphP0M7zpJplxqUsXbbhFA6Y_AfJfmWV5Y57mZzN5x3SjZKQW35j1B_2jsbx-muqg5jyGC73tsw0ouDM8BG_aL6hFiwdFLRHPborldU",
            tags: ["Looker Studio", "GA4", "Data Modeling"],
            results: "99.9% Data Accuracy"
        },
        {
            title: "Barbados Tech Collective",
            category: "Digital Transformation",
            description: "Migrating a legacy tourism network to an AI-native ecosystem, enabling automated lead capture and personalized travel curation.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPUc8wJRKJL-idYU3ytHQhrGZPVnGYb0vbKABO9AfePRXqthWXoBEcNYWGPzGgRhZGRRmo84e7ZOHi3xHGb38xMj-wcCFT5Ig-6bsbAm0A-5vbnKpLM8HepUmr9O43e03_UIXQ1Yh4jBVmicRc5ItNXEnXsoqc9LZ_XhJKOaBhE9lbVxvCb-bXA3H5d9tMRCvOpPANQg2VuQLvOwPxHZ7heaZ7a8-yDmWVJU8dlssOKehykxoKH5cDjC_1NFwCKMDNhIyOQIoS1TE",
            tags: ["AI Integration", "Cloud Infrastructure", "SEO"],
            results: "Top 3 Search Ranking"
        }
    ];

    return (
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Proof of Excellence</h2>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight mb-8">
                        Selected <span className="text-gray-400">Work.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
                        A curated showcase of institutional digital transformations and strategic technical endeavors. We focus on impact, scale, and uncompromising quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
                        >
                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                                <div className="absolute bottom-6 left-8">
                                    <span className="text-xs font-bold text-white uppercase tracking-widest bg-google-blue px-3 py-1 rounded-md mb-2 inline-block shadow-lg">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-display font-bold text-white">{project.title}</h3>
                                </div>
                            </div>
                            <div className="p-10 space-y-6">
                                <p className="text-gray-500 leading-relaxed italic">
                                    "{project.description}"
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className="text-[10px] font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded-full uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                    <div className="space-y-1 text-google-blue">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Result</p>
                                        <p className="text-xl font-display font-bold">{project.results}</p>
                                    </div>
                                    <button className="bg-gray-50 hover:bg-google-blue hover:text-white size-12 rounded-full flex items-center justify-center transition-all group">
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Standards Section */}
                <div className="mt-32 rounded-[3rem] bg-gray-900 p-12 lg:p-24 text-white relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                            <pattern height="10" id="dots" patternUnits="userSpaceOnUse" width="10">
                                <circle cx="1" cy="1" fill="white" r="1"></circle>
                            </pattern>
                            <rect fill="url(#dots)" height="100" width="100"></rect>
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl font-display font-bold tracking-tight">Technical Excellence as a Standard.</h2>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Every project in our portfolio is audited against our 36-point institutional health checklist, covering Core Web Vitals, API security, and attribution integrity.
                        </p>
                        <div className="flex flex-wrap justify-center gap-12 pt-8">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-blue">terminal</span>
                                <span className="font-bold text-sm tracking-widest uppercase text-gray-400">Validated Build</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-red">analytics</span>
                                <span className="font-bold text-sm tracking-widest uppercase text-gray-400">Verifiable ROI</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-google-green">shield</span>
                                <span className="font-bold text-sm tracking-widest uppercase text-gray-400">Enterprise Security</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
