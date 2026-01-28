import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
    id: string;
    title: string;
    heading: string;
    content: React.ReactNode;
    icon: string;
}

const TabbedScenarios: React.FC = () => {
    const tabs: Tab[] = [
        {
            id: 'ghost-sites',
            title: 'Ghost Sites',
            heading: 'The Digital Brochure Void',
            icon: 'visibility_off',
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Is your website a digital brochure? Stagnant and generating zero leads.
                        Most regional business sites haven't been updated in 2+ years.
                    </p>
                    <div className="bg-google-red/5 border-l-4 border-google-red p-6 rounded-r-2xl">
                        <p className="text-navy-deep font-bold italic">
                            "If your website disappeared tomorrow, would your bottom line notice? Would your customers notice?"
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'data-blindness',
            title: 'Data Blindness',
            heading: 'Operating in the Dark',
            icon: 'analytics',
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Traffic without tracking is wasted potential. Businesses often have visitors but no idea
                        who they are, why they came, or what brings them back.
                    </p>
                    <div className="bg-google-blue/5 border-l-4 border-google-blue p-6 rounded-r-2xl">
                        <p className="text-navy-deep font-bold">
                            We turn the lights on by identifying conversion friction and intent signals across your entire infrastructure.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'ux-laggers',
            title: 'UX Laggers',
            heading: 'The Cost of Friction',
            icon: 'speed',
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Slow load times and poor mobile rendering are silent killers. High bounce rates
                        mean you're losing customers before they even see your value.
                    </p>
                    <div className="bg-google-green/5 border-l-4 border-google-green p-6 rounded-r-2xl">
                        <p className="text-navy-deep font-bold">
                            We eliminate the technical gaps that cost you 40%+ of your potential mobile revenue.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'budget-barrier',
            title: 'Value Gap',
            heading: 'Institutional Growth, Fractional Cost',
            icon: 'payments',
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Professional development doesn't have to cost $10k+ upfront. We offer
                        institutional-grade strategic oversight for a predictable monthly retention.
                    </p>
                    <div className="bg-google-yellow/5 border-l-4 border-google-yellow p-6 rounded-r-2xl">
                        <p className="text-navy-deep font-bold">
                            Monthly strategic retention starts at $400/mo. High-fidelity infrastructure for everyone.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">The Digital Void</h2>
                    <h3 className="text-4xl lg:text-5xl font-display font-bold text-navy-deep tracking-tight">Identifying Your Friction Points.</h3>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Tab Navigation */}
                    <nav className="lg:w-1/3 flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-4 p-6 rounded-2xl text-left transition-all duration-300 group ${activeTab === tab.id
                                        ? 'bg-google-blue text-white shadow-xl shadow-google-blue/20'
                                        : 'bg-surface hover:bg-white hover:shadow-lg text-navy-muted'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-2xl ${activeTab === tab.id ? 'text-white' : 'text-google-blue'
                                    } group-hover:scale-110 transition-transform`}>
                                    {tab.icon}
                                </span>
                                <span className="text-lg font-bold font-display">{tab.title}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Tab Content */}
                    <div className="lg:w-2/3 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {tabs.map((tab) => (
                                activeTab === tab.id && (
                                    <motion.div
                                        key={tab.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="bg-surface rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 shadow-sm h-full flex flex-col justify-center"
                                    >
                                        <h4 className="text-3xl lg:text-4xl font-display font-bold text-navy-deep mb-8">
                                            {tab.heading}
                                        </h4>
                                        <div className="prose prose-blue prose-lg">
                                            {tab.content}
                                        </div>
                                        <div className="mt-12">
                                            <button className="flex items-center gap-2 text-google-blue font-bold hover:gap-4 transition-all group">
                                                <span>Audit this scenario</span>
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TabbedScenarios;
