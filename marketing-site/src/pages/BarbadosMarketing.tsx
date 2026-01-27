import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';
import CaribbeanRoadmap from '../components/CaribbeanRoadmap';

const BarbadosMarketing: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-white">
            {/* Hero Section - Barbados Focus */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-deep">
                {/* Immersive Background Elements */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-google-blue/80 via-navy-deep to-google-green/20"></div>
                    <div className="absolute top-[20%] right-[10%] size-[600px] bg-google-blue/20 rounded-full blur-[150px] animate-pulse"></div>
                    <div className="absolute -bottom-[10%] left-[5%] size-[800px] bg-cyan-500/10 rounded-full blur-[200px]"></div>
                </div>

                {/* Subtle Caribbean Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="material-symbols-outlined text-sm text-google-blue">location_on</span>
                            Bridgetown, Barbados
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-display font-bold text-white leading-tight mb-8">
                            Global Impact.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-cyan-300">Born in Barbados.</span>
                        </h1>
                        <p className="text-2xl text-blue-100/70 leading-relaxed mb-12 max-w-lg">
                            We bridge the gap between Caribbean excellence and global digital demand through institutional-grade marketing infrastructure.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-google-blue hover:bg-blue-600 text-white px-10 py-5 rounded-pill font-bold text-lg shadow-2xl transition-all hover:scale-105"
                            >
                                Free Strategic Audit
                            </button>
                            <Link
                                to="/contact"
                                className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-pill font-bold text-lg transition-all"
                            >
                                Meet the Team
                            </Link>
                        </div>
                    </div>

                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative w-full max-w-md aspect-square bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-3xl p-12 overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-google-blue/10 to-transparent"></div>

                            {/* Abstract Island Data Overlay */}
                            <div className="relative z-10 size-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="size-16 rounded-2xl bg-google-blue/20 flex items-center justify-center text-google-blue">
                                        <span className="material-symbols-outlined text-3xl">public</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-blue-300/60 uppercase tracking-widest">Global Reach</p>
                                        <p className="text-3xl font-display font-bold text-white">4.2M+</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative h-20 w-full overflow-hidden rounded-xl border border-white/10 p-4">
                                        <div className="flex items-end gap-1 h-full">
                                            {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                                                <div key={i} className="flex-1 bg-google-blue/30 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-100/60 leading-tight">Barbadian Tourism<br />Index Growth</p>
                                        <span className="text-google-green font-bold text-xl uppercase">+140%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating decorative elements */}
                            <div className="absolute -bottom-20 -right-20 size-64 bg-cyan-400/20 rounded-full blur-[80px]"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Strategic Bridge Section */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5">
                            <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-6">Local Context. Global Scale.</h2>
                            <h3 className="text-4xl lg:text-6xl font-display font-bold text-navy-deep tracking-tight mb-8">
                                Why Barbadian Businesses Choose OLE.
                            </h3>
                            <p className="text-xl text-gray-500 leading-relaxed mb-12">
                                We combine a deep understanding of the Caribbean hospitality and tourism market with professional technical standards and institutional-grade digital frameworks.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { icon: "handshake", title: "Local Market Fluency", desc: "We know the nuances of Caribbean audience behavior, regional seasonality, and local business dynamics." },
                                    { icon: "workspace_premium", title: "Global Technical Standards", desc: "Rigorous infrastructure health and SEO protocols that compete on an international stage." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="size-14 rounded-2xl bg-google-blue/5 flex-shrink-0 flex items-center justify-center text-google-blue">
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-navy-deep mb-2">{item.title}</h4>
                                            <p className="text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 relative">
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-6 mt-12">
                                    <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                                        <h4 className="text-4xl font-display font-bold text-google-blue mb-2">140%</h4>
                                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Avg. Booking Lift</p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-navy-deep text-white shadow-2xl">
                                        <h4 className="text-4xl font-display font-bold text-google-green mb-2">24h</h4>
                                        <p className="text-blue-100/60 font-bold text-xs uppercase tracking-widest">Local Response Time</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-10 rounded-[2.5rem] bg-google-red text-white shadow-2xl">
                                        <h4 className="text-4xl font-display font-bold text-white mb-2">Technical</h4>
                                        <p className="text-white/60 font-bold text-xs uppercase tracking-widest">Authority & Mastery</p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl">
                                        <h4 className="text-4xl font-display font-bold text-navy-deep mb-2">4.8x</h4>
                                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Portfolio ROAS</p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative background circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] border-2 border-dashed border-gray-100 rounded-full -z-10 animate-[spin_60s_linear_infinite]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialized Solutions Grid */}
            <section className="py-32 bg-[#0c131a]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-12">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-6">Caribbean Centric Solutions</h2>
                        <h3 className="text-4xl lg:text-6xl font-display font-bold text-white tracking-tight">
                            Engineered for the Island Economy.
                        </h3>
                    </div>

                    <CaribbeanRoadmap />
                </div>
            </section>

            {/* High-Impact CTA */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[3rem] bg-navy-deep p-12 lg:p-24 overflow-hidden shadow-2xl">
                        {/* Background Accents */}
                        <div className="absolute top-0 right-0 size-96 bg-google-blue/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 size-96 bg-google-green/10 rounded-full blur-[120px] -z-10"></div>

                        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
                            <h2 className="text-4xl lg:text-7xl font-display font-bold text-white tracking-tight leading-none">
                                Ready to take Barbados to the <span className="text-google-blue">Global Market?</span>
                            </h2>
                            <p className="text-xl text-blue-100/60 leading-relaxed max-w-2xl mx-auto">
                                Join the region's top performing hospitality and retail brands. Schedule your free digital infrastructure audit with our local strategy team.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                                <button
                                    onClick={() => setModalOpen(true, 'audit')}
                                    className="bg-google-blue hover:bg-blue-600 text-white px-12 py-5 rounded-pill font-bold text-xl shadow-xl hover:scale-105 transition-all"
                                >
                                    Book Your Free Audit
                                </button>
                                <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-pill font-bold text-xl transition-all">
                                    View Local Cases
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-3 pt-4">
                                <span className="material-symbols-outlined text-google-blue">verified</span>
                                <p className="text-sm text-blue-200/40 uppercase tracking-widest font-bold">Trusted by Barbadian Strategic Partners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BarbadosMarketing;
