import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
    WebEngineeringVisual,
    SearchVisibilityVisual,
    StrategicAnalysisVisual,
    BrandDesignVisual
} from './ServiceVisuals';

interface GoalTab {
    id: string;
    label: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    services: string[];
    Visual: React.FC;
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
        Visual: WebEngineeringVisual,
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
        Visual: SearchVisibilityVisual,
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
        Visual: StrategicAnalysisVisual,
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
        Visual: BrandDesignVisual,
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

const GoalSelector: React.FC = () => {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);
    const activeTab = tabs.find(t => t.id === activeTabId)!;
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Our Core Frameworks</h2>
                    <h3 className="text-4xl lg:text-5xl font-display font-bold text-navy-deep tracking-tight">Systematic Progress.</h3>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${activeTabId === tab.id
                                ? `bg-surface text-${tab.color} shadow-lg ring-2 ring-${tab.color}/20`
                                : 'bg-surface text-navy-muted hover:bg-gray-100 opacity-60 hover:opacity-100'
                                }`}
                        >
                            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTabId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-24"
                    >
                        {/* Callout Section */}
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                            <div className="lg:w-1/2 min-h-[300px] lg:min-h-[400px]">
                                <activeTab.Visual />
                            </div>

                            <div className="lg:w-1/2 space-y-10">
                                <div className="space-y-6">
                                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-${activeTab.color}/5 border border-${activeTab.color}/10 text-${activeTab.color} text-[10px] font-bold uppercase tracking-widest`}>
                                        Solutions Spectrum
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-navy-deep leading-[1.1]">
                                        {activeTab.title}
                                    </h2>
                                    <p className="text-xl text-gray-500 leading-relaxed max-w-xl italic font-medium">
                                        "{activeTab.description}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {activeTab.services.map((svc, i) => (
                                        <div key={i} className="flex items-center gap-3 text-navy-deep font-bold text-sm">
                                            <span className={`material-symbols-outlined text-sm text-${activeTab.color}`}>check_circle</span>
                                            {svc}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6">
                                    <button
                                        onClick={() => navigate('/ollie')}
                                        className={`bg-${activeTab.color} text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-${activeTab.color}/20`}
                                    >
                                        <span className="material-symbols-outlined">bolt</span>
                                        Benchmark with Ollie
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Case Study Section */}
                        <div className="pt-12 border-t border-gray-100">
                            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
                                <div className="max-w-xl">
                                    <h3 className={`text-navy-deep font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-${activeTab.color}`}>
                                        <span className="w-8 h-px bg-current"></span>
                                        Strategic Proof
                                    </h3>
                                    <h4 className="text-4xl font-display font-bold text-navy-deep leading-tight">
                                        Deploying results <br />across the ecosystem.
                                    </h4>
                                </div>
                                <button className={`text-${activeTab.color} font-bold flex items-center gap-2 hover:gap-4 transition-all`}>
                                    View full portfolio <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {activeTab.caseStudies.map((study, i) => (
                                    <a
                                        key={i}
                                        href={study.link}
                                        className="group"
                                    >
                                        <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl hover:shadow-2xl transition-all duration-500 bg-surface">
                                            <img src={study.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex justify-between items-center px-4">
                                            <h3 className="text-2xl font-display font-bold text-navy-deep group-hover:text-google-blue transition-colors">
                                                {study.title}
                                            </h3>
                                            <span className={`material-symbols-outlined text-${activeTab.color} opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all`}>arrow_forward</span>
                                        </div>
                                    </a>
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
