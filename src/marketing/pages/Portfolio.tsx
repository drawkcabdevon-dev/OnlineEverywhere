import React from 'react';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
    const [activeCategory, setActiveCategory] = React.useState('All');

    const categories = ['All', 'Technical Architecture', 'Brand & Web Engineering', 'Strategic Analytics', 'Digital Transformation'];

    const projects = [
        {
            title: "Global Tourism Intelligence Hub",
            category: "Technical Architecture",
            description: "A comprehensive data ecosystem for a national tourism body, integrating GA4, custom CRM APIs, and real-time behavioral tracking.",
            challenge: "Fragmented data silos across multiple government and private vendors made it impossible to get a unified view of traveler behavior.",
            solution: "Engineered a centralized BigQuery reservoir with custom API connectors to ingest and normalize disparate data points into a real-time dashboard.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcsnTzbzJAof_YWdprJTvX4QpAdmkEC1ulbDcN1GceWvskDnRyga95IfRUk8L8K1lHX6QcqvRc-u2idzZ-yq5vOu1fEoWb-Gk2XFoblihPf97q4fyfzmfgYUm3w5vzoqpXc1LEnPoBLb2LT_NCu4D8KhvcfdouxpmH07afphP0M7zpJplxqUsXbbhFA6Y_AfJfmWV5Y57mZzN5x3SjZKQW35j1B_2jsbx-muqg5jyGC73tsw0ouDM8BG_aL6hFiwdFLRHPborldU",
            tags: ["React", "BigQuery", "API Orchestration"],
            results: "+140% Conversion Lift"
        },
        {
            title: "Ocean Blue International",
            category: "Brand & Web Engineering",
            description: "Institutional rebranding and high-performance web infrastructure for a luxury hospitality group targeting European markets.",
            challenge: "A legacy website with poor mobile performance and a dated brand identity was significantly hindering high-net-worth customer acquisition.",
            solution: "Complete institutional rebranding paired with a Next.js 14 architecture, resulting in sub-second load times and a premium digital aesthetic.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPUc8wJRKJL-idYU3ytHQhrGZPVnGYb0vbKABO9AfePRXqthWXoBEcNYWGPzGgRhZGRRmo84e7ZOHi3xHGb38xMj-wcCFT5Ig-6bsbAm0A-5vbnKpLM8HepUmr9O43e03_UIXQ1Yh4jBVmicRc5ItNXEnXsoqc9LZ_XhJKOaBhE9lbVxvCb-bXA3H5d9tMRCvOpPANQg2VuQLvOwPxHZ7heaZ7a8-yDmWVJU8dlssOKehykxoKH5cDjC_1NFwCKMDNhIyOQIoS1TE",
            tags: ["Brand Identity", "Next.js", "Core Web Vitals"],
            results: "4.8x ROAS"
        },
        {
            title: "Endeavor Growth Dashboard",
            category: "Strategic Analytics",
            description: "A unified ROI reporting engine for multi-channel marketing spend, closing the loop on a $2M ARR growth endeavor.",
            challenge: "The marketing team was manually correlating spend across 6 platforms, leading to data lag and attribution inaccuracies.",
            solution: "Automated the data pipeline using Looker Studio with custom attribution logic that credited conversions with 99.9% accuracy.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcsnTzbzJAof_YWdprJTvX4QpAdmkEC1ulbDcN1GceWvskDnRyga95IfRUk8L8K1lHX6QcqvRc-u2idzZ-yq5vOu1fEoWb-Gk2XFoblihPf97q4fyfzmfgYUm3w5vzoqpXc1LEnPoBLb2LT_NCu4D8KhvcfdouxpmH07afphP0M7zpJplxqUsXbbhFA6Y_AfJfmWV5Y57mZzN5x3SjZKQW35j1B_2jsbx-muqg5jyGC73tsw0ouDM8BG_aL6hFiwdFLRHPborldU",
            tags: ["Looker Studio", "GA4", "Data Modeling"],
            results: "99.9% Data Accuracy"
        },
        {
            title: "Barbados Tech Collective",
            category: "Digital Transformation",
            description: "Migrating a legacy tourism network to an AI-native ecosystem, enabling automated lead capture and personalized travel curation.",
            challenge: "Highly manual booking processes and low search visibility were limiting the growth of local tech-driven tourism.",
            solution: "Implemented an AI-first digital ecosystem that automated 70% of lead intake and significantly improved global search rankings.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPUc8wJRKJL-idYU3ytHQhrGZPVnGYb0vbKABO9AfePRXqthWXoBEcNYWGPzGgRhZGRRmo84e7ZOHi3xHGb38xMj-wcCFT5Ig-6bsbAm0A-5vbnKpLM8HepUmr9O43e03_UIXQ1Yh4jBVmicRc5ItNXEnXsoqc9LZ_XhJKOaBhE9lbVxvCb-bXA3H5d9tMRCvOpPANQg2VuQLvOwPxHZ7heaZ7a8-yDmWVJU8dlssOKehykxoKH5cDjC_1NFwCKMDNhIyOQIoS1TE",
            tags: ["AI Integration", "Cloud Infrastructure", "SEO"],
            results: "Top 3 Search Ranking"
        },
        {
            title: "CustomerSuccessU Mobile Speed Optimization",
            category: "Technical Architecture",
            description: "Achieved 40% speed increase for a global not-for-profit education platform, ensuring instant access to career development resources on mobile devices across varying network conditions.",
            challenge: "A global user base was struggling with slow load times on mobile, leading to significant user drop-off in developing regions with low-bandwidth connections.",
            solution: "Applied a mobile-first engineering sprint including image compression, aggressive lazy loading, and a custom edge-caching CDN strategy.",
            image: "/mobile-speed-opt.png",
            tags: ["Core Web Vitals", "Mobile-First", "CDN Strategy"],
            results: "40% Speed Increase"
        }
    ];

    const [selectedProject, setSelectedProject] = React.useState<any>(null);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="bg-white min-h-screen">
            {/* Portfolio Hero */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-navy-deep">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-google-blue/80 via-navy-deep to-google-green/20"></div>
                </div>
                <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-6">Proof of Excellence</h2>
                        <h1 className="text-5xl lg:text-8xl font-display font-bold text-white leading-tight mb-8">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-cyan-300">Work.</span>
                        </h1>
                        <p className="text-2xl text-blue-100/70 leading-relaxed max-w-3xl mx-auto">
                            A curated showcase of institutional digital transformations and strategic technical endeavors. We focus on impact, scale, and uncompromising quality.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24">
                {/* Category Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-20 border-b border-gray-100 pb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-8 py-3 rounded-pill text-sm font-bold transition-all ${activeCategory === category
                                ? 'bg-navy-deep text-white shadow-xl'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-navy-deep'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {filteredProjects.map((project, i) => (
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
                            <div className="p-10 space-y-6 flex flex-col h-full">
                                <p className="text-gray-500 leading-relaxed italic flex-grow">
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
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="bg-gray-50 hover:bg-google-blue hover:text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xs transition-all group"
                                    >
                                        Explore Details
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Project Detail Modal */}
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy-deep/90 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 lg:p-16 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 size-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-[10px] font-bold uppercase tracking-widest mb-8">
                                        Case Study: {selectedProject.category}
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-navy-deep mb-8 leading-tight">
                                        {selectedProject.title}
                                    </h2>

                                    <div className="space-y-10">
                                        <div>
                                            <h3 className="text-xs font-bold text-google-blue uppercase tracking-widest mb-4">The Challenge</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg italic">
                                                "{selectedProject.challenge}"
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-google-blue uppercase tracking-widest mb-4">The Solution</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {selectedProject.solution}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="rounded-[2rem] overflow-hidden shadow-2xl">
                                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full object-cover" />
                                    </div>

                                    <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100">
                                        <h3 className="text-xs font-bold text-navy-deep uppercase tracking-widest mb-6 text-center">Institutional Impact</h3>
                                        <div className="text-center">
                                            <div className="text-6xl font-display font-bold text-google-blue mb-2">{selectedProject.results}</div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Validated Metric</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

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
