import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GoalTab {
    id: string;
    label: string;
    title: string;
    description: string;
    icon: string;
    color: 'google-blue' | 'google-red' | 'google-yellow' | 'google-green';
    services: string[];
    videoUrl: string;
    caseStudies: {
        title: string;
        image: string;
        link: string;
    }[];
}

const tabs: GoalTab[] = [
    {
        id: 'web-engineering',
        label: 'Web Engineering',
        title: 'High-performance digital infrastructure',
        description: 'From new website platforms to migrations, we ensure a fast, modern, and ready technical core.',
        icon: 'code',
        color: 'google-blue',
        services: ["New Platform & Migrations", "Performance Audits", "Core Web Vitals", "Content Strategy", "CRM & API Systems", "Security Monitoring"],
        videoUrl: 'https://www.gstatic.com/marketing-cms/ads/b6/eb/22dca4fd49028b25eaf37a6f14df/googleads-leads-whitebg-4s-v001-1200x898.mp4',
        caseStudies: [
            {
                title: 'Institutional Platform Migration',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/75/81/8941587f443ea2f50195df6b2888/unnamed-35.jpg',
                link: '#'
            },
            {
                title: 'Core Web Vitals Optimization',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/16/f1/a91bb4784916a22c3c6a50568c8c/unnamed-36.jpg',
                link: '#'
            }
        ]
    },
    {
        id: 'search-visibility',
        label: 'Search Visibility',
        title: 'Ensuring Google recognizes your value',
        description: 'Ensuring Google immediately recognizes and indexes all content through rigorous technical SEO and site mapping.',
        icon: 'search',
        color: 'google-red',
        services: ["Full Page Indexing", "Sitemap Submission", "URL Inspection", "Search Console Mastery", "Technical SEO Audits", "Schema Data"],
        videoUrl: 'https://www.gstatic.com/marketing-cms/ads/ab/60/13518c2248ad9e06fd5d7d9d3e9c/googleads-online-whitebg-4s-v001-1200x898.mp4',
        caseStudies: [
            {
                title: 'Zero-Click Opportunity Analysis',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/13/44/cb65d502448fb1d40a359870a4c1/unnamed-38.jpg',
                link: '#'
            },
            {
                title: 'Technical SEO Audit Success',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/c7/c9/782280654b3c80d555ace8558993/unnamed-39.jpg',
                link: '#'
            }
        ]
    },
    {
        id: 'strategic-analysis',
        label: 'Strategic Analysis',
        title: 'Deep behavioral insights',
        description: 'We track every click to client, uncovering the exact friction points costing you revenue.',
        icon: 'analytics',
        color: 'google-yellow',
        services: ["GA4 & GTM Configuration", "Journey Mapping", "Event Tracking", "Behavior Audits", "Reporting Dashboards", "Conversion ROI"],
        videoUrl: 'https://www.gstatic.com/marketing-cms/ads/2b/07/a11bab1a4ef6bbd6e5fef5a3f79a/googleads-store-whitebg-4s-v001-1200x898.mp4',
        caseStudies: [
            {
                title: 'Behavioral Funnel Optimization',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/1f/bf/a344f162483a9c3507de9a9c96f4/unnamed-37.jpg',
                link: '#'
            },
            {
                title: 'Customer Intent Discovery',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/2b/07/a11bab1a4ef6bbd6e5fef5a3f79a/unnamed-40.jpg',
                link: '#'
            }
        ]
    },
    {
        id: 'graphic-design',
        label: 'Graphic Design',
        title: 'Visual authority and brand prestige',
        description: 'Visual excellence that communicates institutional authority and brand prestige.',
        icon: 'palette',
        color: 'google-green',
        services: ["Brand Identity", "High-Conversion Ads", "Digital Assets", "Video Design", "Custom QR Codes", "Service Showcases"],
        videoUrl: 'https://www.gstatic.com/marketing-cms/ads/e7/03/6e9e6e3940e58e6e5e0e1e2e3e4e/googleads-brand-whitebg-4s-v001-1200x898.mp4',
        caseStudies: [
            {
                title: 'Institutional Brand Identity',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/75/81/8941587f443ea2f50195df6b2888/unnamed-35.jpg',
                link: '#'
            },
            {
                title: 'Digital Asset Ecosystem',
                image: 'https://www.gstatic.com/marketing-cms/assets/images/ads/16/f1/a91bb4784916a22c3c6a50568c8c/unnamed-36.jpg',
                link: '#'
            }
        ]
    }
];

const colorMap = {
    'google-blue': 'bg-google-blue text-google-blue border-google-blue/20 shadow-google-blue/40 bg-google-blue/5',
    'google-red': 'bg-google-red text-google-red border-google-red/20 shadow-google-red/40 bg-google-red/5',
    'google-yellow': 'bg-google-yellow text-google-yellow border-google-yellow/20 shadow-google-yellow/40 bg-google-yellow/5',
    'google-green': 'bg-google-green text-google-green border-google-green/20 shadow-google-green/40 bg-google-green/5'
};

const iconColorMap = {
    'google-blue': 'text-google-blue',
    'google-red': 'text-google-red',
    'google-yellow': 'text-google-yellow',
    'google-green': 'text-google-green'
};

const bgColorMap = {
    'google-blue': 'bg-google-blue',
    'google-red': 'bg-google-red',
    'google-yellow': 'bg-google-yellow',
    'google-green': 'bg-google-green'
};

const shadowColorMap = {
    'google-blue': 'shadow-google-blue/30',
    'google-red': 'shadow-google-red/30',
    'google-yellow': 'shadow-google-yellow/30',
    'google-green': 'shadow-google-green/30'
};

const GoalSelector: React.FC = () => {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);
    const activeTab = tabs.find(t => t.id === activeTabId)!;
    const navigate = useNavigate();

    return (
        <section className="py-32 bg-white overflow-hidden relative border-t border-gray-100">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-surface rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6">


                <div className="flex flex-wrap items-center gap-3 mb-20 p-2 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`group relative px-8 py-4 rounded-[2rem] font-bold transition-all duration-500 flex items-center gap-3 ${activeTabId === tab.id
                                ? `bg-white text-navy-deep shadow-xl scale-105`
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-xl transition-colors duration-500 ${activeTabId === tab.id ? iconColorMap[tab.color] : 'text-gray-300'}`}>
                                {tab.icon}
                            </span>
                            <span className="text-sm tracking-tight">{tab.label}</span>

                            <AnimatePresence>
                                {activeTabId === tab.id && (
                                    <motion.div
                                        layoutId="tab-indicator"
                                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${bgColorMap[tab.color]} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                    />
                                )}
                            </AnimatePresence>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTabId}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="space-y-32"
                    >
                        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
                            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl bg-navy-deep aspect-video relative group ring-1 ring-gray-100">
                                <video
                                    key={activeTab.videoUrl}
                                    autoPlay
                                    muted
                                    playsInline
                                    loop
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                >
                                    <source src={activeTab.videoUrl} type="video/mp4" />
                                </video>
                                <div className={`absolute top-10 left-10 p-5 rounded-3xl ${bgColorMap[activeTab.color]} text-white shadow-2xl transform group-hover:scale-110 transition-all duration-500`}>
                                    <span className="material-symbols-outlined text-3xl">{activeTab.icon}</span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>

                            <div className="lg:w-1/2 space-y-12">
                                <div className="space-y-8">
                                    <h2 className="text-5xl lg:text-6xl font-display font-bold text-navy-deep leading-[1.05] tracking-tight">
                                        {activeTab.title}
                                    </h2>
                                    <p className="text-2xl text-gray-500 leading-relaxed max-w-xl italic font-serif">
                                        "{activeTab.description}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-gray-100">
                                    {activeTab.services.map((svc, i) => (
                                        <div key={i} className="flex items-start gap-4 text-navy-deep font-bold text-base group/svc">
                                            <span className={`material-symbols-outlined text-xl ${iconColorMap[activeTab.color]} size-8 rounded-lg flex items-center justify-center group-hover/svc:scale-110 transition-transform`}>
                                                check_circle
                                            </span>
                                            <span className="pt-1">{svc}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6">
                                    <motion.button
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate('/ollie')}
                                        className={`${bgColorMap[activeTab.color]} text-white px-12 py-6 rounded-2xl font-bold flex items-center justify-center gap-4 hover:brightness-110 transition-all shadow-2xl ${shadowColorMap[activeTab.color]} text-lg`}
                                    >
                                        <span className="material-symbols-outlined">bolt</span>
                                        Benchmark with Ollie
                                        <span className="material-symbols-outlined text-sm opacity-50">arrow_forward</span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
                                <div className="max-w-xl">
                                    <h3 className={`font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-3 ${iconColorMap[activeTab.color]}`}>
                                        <span className={`w-12 h-0.5 bg-current`}></span>
                                        Institutional Results
                                    </h3>
                                    <h4 className="text-5xl font-display font-bold text-navy-deep leading-[1.1] tracking-tight">
                                        Deployment success <br />across the globe.
                                    </h4>
                                </div>
                                <button className={`group ${iconColorMap[activeTab.color]} font-bold flex items-center gap-3 hover:gap-5 transition-all text-sm uppercase tracking-widest bg-surface px-6 py-3 rounded-full border border-gray-100`}>
                                    Full Portfolio <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {activeTab.caseStudies.map((study, i) => (
                                    <motion.a
                                        key={i}
                                        href={study.link}
                                        className="group block"
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="aspect-[16/10] rounded-[3.5rem] overflow-hidden mb-10 shadow-2xl transition-all duration-700 bg-surface relative">
                                            <img src={study.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-95 group-hover:opacity-100" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                        <div className="flex justify-between items-center px-6">
                                            <h3 className="text-3xl font-display font-bold text-navy-deep group-hover:text-google-blue transition-colors duration-500">
                                                {study.title}
                                            </h3>
                                            <div className={`size-12 rounded-full border border-gray-100 flex items-center justify-center ${iconColorMap[activeTab.color]} group-hover:${bgColorMap[activeTab.color]} group-hover:text-white transition-all duration-500`}>
                                                <span className="material-symbols-outlined scale-75 group-hover:scale-100 transition-transform">arrow_outward</span>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default GoalSelector;
