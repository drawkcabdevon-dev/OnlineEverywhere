import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const ColorStripDivider: React.FC = () => (
    <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

const MobileSpeedOptimization: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* Application Hero */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.05)_0%,transparent_50%)]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/" className="inline-flex items-center text-google-blue font-bold mb-8 hover:translate-x-[-4px] transition-transform group">
                            <span className="material-symbols-outlined mr-2 group-hover:bg-blue-50 rounded-full p-1 transition-colors">arrow_back</span>
                            Back to Home
                        </Link>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="material-symbols-outlined text-sm">bolt</span>
                            Performance Optimization
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-navy-deep mb-8 leading-[1.1] tracking-tight">
                            Accelerating <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-cyan-400">Customer Success.</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                            How we helped <strong>CustomerSuccessU</strong> achieve a 40% increase in mobile page speed, ensuring their educational resources are accessible to learners everywhere, instantly.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[
                                { title: "40% Speed Increase", icon: "speed" },
                                { title: "Enhanced UX", icon: "touch_app" },
                                { title: "Mobile-First Indexing", icon: "smartphone" },
                                { title: "Conversion Lift", icon: "trending_up" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                                    <span className="material-symbols-outlined text-google-blue text-xl">check_circle</span>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://CustomerSuccessU.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-google-blue hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-google-blue/30 transition-all transform hover:scale-[1.02] inline-flex items-center gap-2"
                            >
                                Visit Live Site
                                <span className="material-symbols-outlined">open_in_new</span>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative lg:h-[600px] flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-[9/16] bg-gray-900 rounded-[3rem] border-8 border-gray-800 overflow-hidden shadow-2xl flex flex-col group">
                            {/* Phone Mockup Content */}
                            <div className="absolute inset-0 bg-white">
                                <img
                                    src="/mobile-speed-opt.png"
                                    alt="Mobile Speed Optimization"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Result</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">0.8s Load Time</h3>
                                    <p className="text-white/80 text-sm">Optimized for global access via 4G/5G networks.</p>
                                </div>
                            </div>

                            {/* Signal Bar Mockup */}
                            <div className="absolute top-0 w-full h-8 bg-black/50 backdrop-blur-md flex justify-between items-center px-6 z-20">
                                <div className="text-[10px] text-white font-bold">9:41</div>
                                <div className="flex gap-1">
                                    <div className="size-2.5 bg-white rounded-full"></div>
                                    <div className="size-2.5 bg-white rounded-full"></div>
                                    <div className="size-2.5 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ColorStripDivider />

            {/* Case Study Details */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                        <div>
                            <h3 className="text-google-blue font-bold text-sm uppercase tracking-[0.2em] mb-6">The Challenge</h3>
                            <h4 className="text-3xl font-display font-bold text-navy-deep mb-6">Global Accessibility</h4>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                CustomerSuccessU aims to democratize career growth in customer success. With a global audience often accessing content on mobile devices in varying network conditions, a standard website wasn't enough. They needed a platform that loaded instantly, regardless of location.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-google-blue font-bold text-sm uppercase tracking-[0.2em] mb-6">The Solution</h3>
                            <h4 className="text-3xl font-display font-bold text-navy-deep mb-6">Technical Optimization</h4>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We implemented a rigorous mobile-first optimization strategy. This included next-gen image formats (WebP), aggressive code splitting, and a global CDN strategy to ensure assets are served from the edge, closest to the user.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-xl">
                        <h3 className="text-2xl font-display font-bold text-navy-deep mb-10 text-center">Key Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            <div className="text-center pt-8 md:pt-0">
                                <div className="text-5xl font-bold text-google-blue mb-2">40%</div>
                                <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">Speed Increase</div>
                            </div>
                            <div className="text-center pt-8 md:pt-0 pl-0 md:pl-10">
                                <div className="text-5xl font-bold text-google-green mb-2">98/100</div>
                                <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">Mobile Score</div>
                            </div>
                            <div className="text-center pt-8 md:pt-0 pl-0 md:pl-10">
                                <div className="text-5xl font-bold text-navy-deep mb-2">2x</div>
                                <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">Retention Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MobileSpeedOptimization;
