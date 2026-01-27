import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const ColorStripDivider: React.FC = () => (
    <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

const Services: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    const serviceCategories = [
        {
            title: "Web Engineering",
            icon: "code",
            color: "google-blue",
            description: "High-performance digital infrastructure. From new website platforms to migrations, we ensure a fast, modern, and ready technical core.",
            services: ["New Platform & Migrations", "Google PageSpeed Audits", "Core Web Vitals Implementation", "Data-First Content Strategy", "CRM & API Orchestration", "Security & Uptime Monitoring"]
        },
        {
            title: "Search & Visibility",
            icon: "search",
            color: "google-red",
            description: "Ensuring Google immediately recognizes and indexes all content through rigorous technical SEO and site mapping.",
            services: ["Full Page Indexing Setup", "Sitemap Submission", "URL Inspection Protocols", "Google Search Console Mastery", "Technical SEO Audits", "Schema Data Implementation"]
        },
        {
            title: "Strategic Analysis",
            icon: "analytics",
            color: "google-yellow",
            description: "Deep behavioral insights. We track every click to client, uncovering the exact friction points costing you revenue.",
            services: ["GA4 & GTM Configuration", "Customer Journey Mapping", "Event Tracking Enablement", "Deep Behavior Audits", "Looker Studio Dashboards", "Conversion ROI Reporting"]
        },
        {
            title: "Graphic Design",
            icon: "palette",
            color: "google-green",
            description: "Visual excellence that communicates institutional authority and brand prestige.",
            services: ["Brand Identity & Logo", "High-Conversion Ad Assets", "Digital Visual Assets", "Video Thumbnail Design", "Custom QR Code Solutions", "Product & Service Showcases"]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* Services Hero */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.05)_0%,transparent_50%)]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-[0.2em] mb-6">Solutions Spectrum</h2>
                        <h1 className="text-6xl lg:text-8xl font-display font-bold text-navy-deep tracking-tight mb-8 leading-[0.9]">
                            Comprehensive <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-green">Services.</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                            We provide the technical leverage and strategic frameworks necessary to capture sophisticated international audiences. Our services are integrated endeavors.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {serviceCategories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="size-16 rounded-2xl bg-white shadow-md border border-gray-50 flex items-center justify-center text-google-blue mb-8 group-hover:scale-110 transition-transform">
                                    <span className={`material-symbols-outlined text-4xl text-${cat.color}`}>{cat.icon}</span>
                                </div>
                                <h2 className="text-3xl font-display font-bold text-navy-deep mb-4">{cat.title}</h2>
                                <p className="text-gray-500 mb-8 leading-relaxed italic text-lg">{cat.description}</p>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-50 pt-8">
                                    {cat.services.map((svc, j) => (
                                        <li key={j} className="flex gap-3 text-sm font-bold text-gray-500 group/item">
                                            <span className={`material-symbols-outlined text-sm text-${cat.color} group-hover/item:scale-125 transition-transform`}>check_circle</span>
                                            {svc}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blueprint Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-navy-deep rounded-[4rem] p-12 lg:p-24 text-white overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')]"></div>
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <pattern id="v-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#v-grid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-xs font-bold uppercase tracking-widest mb-8">
                                    <span className="material-symbols-outlined text-sm">bolt</span>
                                    AI-Native Infrastructure
                                </div>
                                <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 tracking-tight">Systematic <br /><span className="text-google-blue">Optimization.</span></h2>
                                <p className="text-xl text-gray-400 leading-relaxed mb-10 font-medium">
                                    Every service we provide is augmented by our proprietary AI frameworks. We build self-optimizing digital ecosystems that learn from your audience's behavior.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setModalOpen(true, 'audit')}
                                    className="bg-white text-navy-deep px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-google-blue hover:text-white transition-all shadow-xl text-lg"
                                >
                                    <span className="material-symbols-outlined">analytics</span>
                                    Request Technical Audit
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 relative">
                                <div className="absolute -inset-10 bg-google-blue/20 blur-[100px] -z-10"></div>
                                {[
                                    { label: "Performance", val: "99.9%", icon: "speed" },
                                    { label: "Conversion Lift", val: "+45%", icon: "trending_up" },
                                    { label: "Reach Expansion", val: "4.8x", icon: "language" },
                                    { label: "Data Quality", val: "100%", icon: "fact_check" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center group"
                                    >
                                        <span className="material-symbols-outlined text-google-blue mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
                                        <p className="text-4xl font-display font-bold text-white mb-2">{stat.val}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
