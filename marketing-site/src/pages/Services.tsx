import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const Services: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    const serviceCategories = [
        {
            title: "Web Engineering",
            icon: "code",
            description: "High-performance digital infrastructure. From new website platforms to migrations, we ensure a fast, modern, and ready technical core.",
            services: ["New Platform & Migrations", "Google PageSpeed Audits", "Core Web Vitals Implementation", "Data-First Content Strategy", "CRM & API Orchestration", "Security & Uptime Monitoring"]
        },
        {
            title: "Search & Visibility",
            icon: "search",
            description: "Ensuring Google immediately recognizes and indexes all content through rigorous technical SEO and site mapping.",
            services: ["Full Page Indexing Setup", "Sitemap Submission", "URL Inspection Protocols", "Google Search Console Mastery", "Technical SEO Audits", "Schema Data Implementation"]
        },
        {
            title: "Strategic Research & Analysis",
            icon: "analytics",
            description: "Deep behavioral insights. We track every click to client, uncovering the exact friction points costing you revenue.",
            services: ["GA4 & GTM Configuration", "Customer Journey Mapping", "Event Tracking Enablement", "Deep Behavior Audits", "Looker Studio Dashboards", "Conversion ROI Reporting"]
        },
        {
            title: "Graphic Design",
            icon: "palette",
            description: "Visual excellence that communicates institutional authority and brand prestige.",
            services: ["Brand Identity & Logo", "High-Conversion Ad Assets", "Digital Visual Assets", "Video Thumbnail Design", "Custom QR Code Solutions", "Product & Service Showcases"]
        }
    ];

    return (
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Solutions Spectrum</h2>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight mb-8">
                        Comprehensive Services. <br />
                        <span className="text-gray-400">Institutional Power.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
                        We provide the technical leverage and strategic frameworks necessary to capture sophisticated international audiences. Our services are designed as integrated endeavors to multiply your digital maturity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {serviceCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-surface p-12 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-m3 transition-shadow group"
                        >
                            <div className="size-16 rounded-2xl bg-white flex items-center justify-center text-google-blue mb-8 shadow-sm group-hover:bg-google-blue group-hover:text-white transition-all">
                                <span className="material-symbols-outlined text-4xl">{cat.icon}</span>
                            </div>
                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">{cat.title}</h2>
                            <p className="text-gray-500 mb-8 leading-relaxed italic">{cat.description}</p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cat.services.map((svc, j) => (
                                    <li key={j} className="flex gap-3 text-sm font-medium text-gray-600">
                                        <span className="material-symbols-outlined text-google-blue text-sm">check_circle</span>
                                        {svc}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Framework Section */}
                <div className="mt-32 bg-gray-900 rounded-[3rem] p-12 lg:p-24 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                            <defs>
                                <pattern height="10" id="grid-white" patternUnits="userSpaceOnUse" width="10">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                                </pattern>
                            </defs>
                            <rect fill="url(#grid-white)" height="100" width="100"></rect>
                        </svg>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-display font-bold mb-6">AI-Native Infrastructure</h2>
                            <p className="text-xl text-gray-400 leading-relaxed mb-8">
                                Every service we provide is augmented by our proprietary AI frameworks. We don't just build websites; we build self-optimizing digital ecosystems that learn from your audience's behavior.
                            </p>
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-google-blue hover:text-white transition-all shadow-xl"
                            >
                                <span className="material-symbols-outlined">bolt</span>
                                Audit Your Infrastructure
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Performance", val: "99.9%" },
                                { label: "Conversion Lift", val: "+45%" },
                                { label: "Reach Expansion", val: "4.8x" },
                                { label: "Data Quality", val: "100%" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center">
                                    <p className="text-3xl font-display font-bold text-google-blue mb-2">{stat.val}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
