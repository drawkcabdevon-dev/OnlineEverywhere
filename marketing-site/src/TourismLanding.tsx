import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TourismLanding: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="bg-background-dark text-white min-h-screen font-display relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

            {/* Nav */}
            <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#101922]/80 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Main
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">rocket_launch</span>
                        </div>
                        <h1 className="text-xl font-black tracking-tight">OnLine<span className="text-primary">Everywhere</span></h1>
                    </div>
                    <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
                        Book a Consultation
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                {/* Hero */}
                <section className="mb-32 text-center lg:text-left">
                    <div className="max-w-4xl">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Persona: Global Tourism Enterprise</span>
                        <h2 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tight mb-8">
                            Transforming Tourism into a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Global Growth Engine.</span>
                        </h2>
                        <p className="text-slate-400 text-2xl leading-relaxed mb-12 max-w-2xl">
                            We bridge the gap between local luxury and global demand. Our framework targets digitally mature international audiences through institutional-grade performance marketing.
                        </p>
                    </div>
                </section>

                {/* Core Strategy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    {[
                        {
                            title: "Global Search Dominance",
                            desc: "We don't just optimize for keywords; we optimize for intent. Capture international travelers at the exact moment they enter the dreaming and planning phase.",
                            icon: "travel_explore"
                        },
                        {
                            title: "International Attribution",
                            desc: "Deep-dive behavioral tracking across borders. Understand how international traffic converts from initial search to final booking.",
                            icon: "query_stats"
                        },
                        {
                            title: "Cultural Digital Mapping",
                            desc: "Tailoring technical performance and psychological triggers to match the digital expectations of global travelers.",
                            icon: "map"
                        }
                    ].map((item, i) => (
                        <div key={i} className="group p-10 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-primary transition-all duration-500 shadow-2xl">
                            <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                            </div>
                            <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Authority Section */}
                <div className="rounded-[40px] bg-gradient-to-br from-primary/20 to-transparent border border-white/10 p-12 md:p-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Scale Internationally?</h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
                        Our digital transformation framework is designed for tourism leaders who are ready to compete on a global stage.
                    </p>
                    <button className="bg-white text-primary px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:scale-105 transition-all">
                        Request Strategy Brief
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TourismLanding;
