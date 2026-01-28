import React from 'react';
import { motion } from 'framer-motion';
import { Link, useOutletContext } from 'react-router-dom';

const Ollie: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="pt-24 min-h-screen bg-surface">
            {/* Hero Section */}
            <section className="relative px-6 lg:px-12 py-12 lg:py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white border border-google-blue/20 rounded-full px-4 py-1.5 mb-8 shadow-sm">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-google-blue opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-google-blue"></span>
                            </span>
                            <span className="text-xs font-bold text-google-blue tracking-wide uppercase">New Release v2.0</span>
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-display font-bold text-navy-deep leading-tight mb-6">
                            Meet <span className="text-google-blue">Ollie</span>.
                            <br className="hidden lg:block" />
                            <span className="text-2xl lg:text-5xl text-gray-400 block mt-2 lg:inline lg:mt-0">Your AI Marketing Co-Pilot.</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
                            Ollie isn't just a tool—it's an autonomous agent that plans, creates, and optimizes your entire marketing ecosystem 24/7.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'early-access')}
                                className="bg-google-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-google-blue/30 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">rocket_launch</span>
                                Deploy Ollie
                            </button>
                            <button
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white text-navy-deep border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">play_circle</span>
                                Watch Demo
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mt-8 lg:mt-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-google-blue/20 to-google-green/20 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="relative bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-gray-100 p-6 lg:p-8 overflow-hidden">
                            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                                <div className="size-14 lg:size-16 rounded-2xl bg-google-blue flex items-center justify-center text-white shadow-lg shadow-google-blue/30">
                                    <span className="material-symbols-outlined text-3xl">smart_toy</span>
                                </div>
                                <div>
                                    <h3 className="text-lg lg:text-xl font-bold text-navy-deep">Ollie Active State</h3>
                                    <div className="flex items-center gap-2 text-xs lg:text-sm text-green-600 font-medium">
                                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Optimizing Campaigns
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { icon: 'edit_note', text: 'Drafting Q2 Content Strategy...', time: 'Now' },
                                    { icon: 'analytics', text: 'Analyzing competitor keyword gaps', time: '2m ago' },
                                    { icon: 'mail', text: 'Scheduled 4 email sequences', time: '15m ago' },
                                    { icon: 'ads_click', text: 'Adjusted ad bid cap by +12%', time: '1h ago' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 lg:p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="material-symbols-outlined text-gray-400">{item.icon}</span>
                                        <div className="flex-1">
                                            <p className="text-xs lg:text-sm font-medium text-gray-700">{item.text}</p>
                                        </div>
                                        <span className="text-[10px] lg:text-xs text-gray-400">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 lg:py-24 bg-white" id="features">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 lg:mb-20">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Core Capabilities</h2>
                        <h3 className="text-3xl lg:text-4xl font-display font-bold text-navy-deep">What Ollie Does for You.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                title: "Content Autopilot",
                                desc: "Generates on-brand blogs, social posts, and ad copy tailored to your audience personas.",
                                icon: "edit_square",
                                color: "text-google-blue",
                                bg: "bg-google-blue/10"
                            },
                            {
                                title: "Precision Targeting",
                                desc: "Analyzes millions of data points to identify and capture high-intent leads automatically.",
                                icon: "adjust",
                                color: "text-google-red",
                                bg: "bg-google-red/10"
                            },
                            {
                                title: "Performance Tuning",
                                desc: "Real-time adjustments to ad spend and SEO strategies to maximize ROAS.",
                                icon: "tune",
                                color: "text-google-green",
                                bg: "bg-google-green/10"
                            },
                            {
                                title: "Persona Lab",
                                desc: "Simulates customer interactions to predict campaign performance before launch.",
                                icon: "psychology",
                                color: "text-google-yellow",
                                bg: "bg-google-yellow/10"
                            },
                            {
                                title: "Market Radar",
                                desc: "Updates you on competitor moves and emerging trends instantly.",
                                icon: "radar",
                                color: "text-purple-600",
                                bg: "bg-purple-100"
                            },
                            {
                                title: "CRM Sync",
                                desc: "Seamlessly pushes qualified leads to your sales pipeline with enriched data.",
                                icon: "sync_alt",
                                color: "text-cyan-600",
                                bg: "bg-cyan-100"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 lg:p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 bg-surface group">
                                <div className={`size-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <span className={`material-symbols-outlined text-3xl ${feature.color}`}>{feature.icon}</span>
                                </div>
                                <h4 className="text-xl font-bold text-navy-deep mb-3">{feature.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-12 lg:py-24 bg-gray-50 border-t border-gray-100" id="pricing">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Investment</h2>
                        <h3 className="text-3xl lg:text-4xl font-display font-bold text-navy-deep">Choose Your Growth Engine.</h3>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm lg:text-base">
                            Scalable intelligence for every stage of business. Transparent pricing with no hidden fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {/* Freelancer */}
                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Freelancer</h4>
                            <p className="text-sm text-gray-500 mb-6">Essential tools for solo strategists.</p>
                            <div className="text-4xl font-bold text-navy-deep mb-6">$49<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                            <button onClick={() => setModalOpen(true, 'early-access')} className="w-full py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all mb-8">Get Started</button>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 1 Active Project</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 5 Pro Model Calls/mo</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 50 AI Media Credits</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 3 Strategy Briefs</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Basic Privacy Shield</li>
                            </ul>
                        </div>

                        {/* Force Multiplier (Highlighted) */}
                        <div className="bg-navy-deep rounded-[2rem] p-6 lg:p-8 border border-gray-900 shadow-2xl relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-google-blue to-google-green text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                            <h4 className="text-xl font-bold text-white mb-2">Force Multiplier</h4>
                            <p className="text-sm text-gray-400 mb-6">Complete strategic autonomy.</p>
                            <div className="text-4xl font-bold text-white mb-6">$199<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <button onClick={() => setModalOpen(true, 'early-access')} className="w-full py-3 rounded-xl bg-google-blue text-white font-bold hover:bg-blue-500 transition-all mb-8 shadow-lg shadow-google-blue/20">Upgrade Now</button>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-google-green text-lg">check_circle</span> 3 Active Projects</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-google-green text-lg">check_circle</span> <strong>Unlimited</strong> Pro Calls</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-google-green text-lg">check_circle</span> 500 AI Media Credits</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-google-green text-lg">check_circle</span> 20 Strategy Briefs</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-google-green text-lg">check_circle</span> Advanced Persona Lab</li>
                            </ul>
                        </div>

                        {/* Agency */}
                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Agency</h4>
                            <p className="text-sm text-gray-500 mb-6">High-volume production power.</p>
                            <div className="text-4xl font-bold text-navy-deep mb-6">$499<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                            <button onClick={() => setModalOpen(true, 'early-access')} className="w-full py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all mb-8">Contact Sales</button>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 10 Active Projects</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> <strong>Unlimited</strong> Pro Calls</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 2,000 AI Media Credits</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 500 Strategy Briefs</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> White-label Reports</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-24 bg-navy-deep text-white text-center overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-[-50%] left-[-20%] size-[800px] bg-google-blue rounded-full blur-[200px]"></div>
                    <div className="absolute bottom-[-50%] right-[-20%] size-[800px] bg-google-red rounded-full blur-[200px]"></div>
                </div>
                <div className="relative z-10 max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6 lg:mb-8">Ready to hire your AI Co-Pilot?</h2>
                    <p className="text-gray-400 text-base lg:text-lg mb-8 lg:mb-10">
                        Join the waiting list to be among the first to deploy Ollie for your business.
                    </p>
                    <button
                        onClick={() => setModalOpen(true, 'early-access')}
                        className="bg-white text-navy-deep px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
                    >
                        Request Early Access
                    </button>
                    <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest font-bold">Limited Beta Spots Available</p>
                </div>
            </section>
        </div>
    );
};

export default Ollie;
