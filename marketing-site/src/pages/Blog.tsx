import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
    const posts = [
        {
            id: 1,
            title: "Scaling Digital Transformation in Tourism",
            category: "Strategy",
            date: "Jan 26, 2026",
            excerpt: "How established brands are bridging the gap between local excellence and global digital demand.",
            color: "google-blue",
            icon: "travel_explore"
        },
        {
            id: 2,
            title: "The Psychology of High-Conversion Funnels",
            category: "CRO",
            date: "Jan 24, 2026",
            excerpt: "Analyzing the subconscious friction points that prevent users from converting on enterprise platforms.",
            color: "google-red",
            icon: "bolt"
        },
        {
            id: 3,
            title: "Data Sovereignty in the Age of AI",
            category: "Technical",
            date: "Jan 20, 2026",
            excerpt: "Why owning your audience and data infrastructure is critical for long-term strategic alignment.",
            color: "google-green",
            icon: "security"
        },
        {
            id: 4,
            title: "Multi-Channel Attribution Frameworks",
            category: "Analytics",
            date: "Jan 18, 2026",
            excerpt: "Implementing unified growth reporting to provide absolute clarity on every marketing endeavor.",
            color: "google-yellow",
            icon: "analytics"
        }
    ];

    return (
        <div className="bg-background min-h-screen">
            {/* Blog Hero */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-gray-900 border-b border-gray-800">
                <div className="absolute inset-0 z-0">
                    <img alt="Strategic digital insights" className="w-full h-full object-cover opacity-30 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJcsnTzbzJAof_YWdprJTvX4QpAdmkEC1ulbDcN1GceWvskDnRyga95IfRUk8L8K1lHX6QcqvRc-u2idzZ-yq5vOu1fEoWb-Gk2XFoblihPf97q4fyfzmfgYUm3w5vzoqpXc1LEnPoBLb2LT_NCu4D8KhvcfdouxpmH07afphP0M7zpJplxqUsXbbhFA6Y_AfJfmWV5Y57mZzN5x3SjZKQW35j1B_2jsbx-muqg5jyGC73tsw0ouDM8BG_aL6hFiwdFLRHPborldU" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/20 backdrop-blur-md border border-google-blue/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        Latest Insight
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-display font-bold text-white max-w-4xl tracking-tight leading-tight mb-8">
                        The Psychology of <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-google-red">High-Conversion Funnels</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
                        Analyzing the subconscious friction points that prevent users from converting on enterprise platforms, and how to fix them with data-backed empathy.
                    </p>
                    <div className="flex items-center gap-6">
                        <button className="bg-white text-gray-900 hover:bg-google-blue hover:text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 group">
                            Read Article
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                            <span className="size-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white border border-gray-700">DC</span>
                            <span>By Devon Clarke</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span>Jan 24, 2026</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="mb-16 flex items-end justify-between border-b border-gray-100 pb-8 relative group">
                    <div>
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-2">Knowledge Base</h2>
                        <h3 className="text-4xl font-display font-bold text-navy-deep tracking-tight">Strategic Intelligence</h3>
                    </div>
                    {/* Spicy Color Divider */}
                    <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-google-blue via-google-red to-google-green group-hover:w-full transition-all duration-1000"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:translate-y-[-8px] transition-all group lg:min-h-[480px] flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-10">
                                    <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-google-blue group-hover:bg-google-blue/10 transition-all duration-500">
                                        <span className="material-symbols-outlined text-4xl">{post.icon}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{post.date}</p>
                                        <span className="inline-block px-3 py-1 rounded-full bg-navy-deep text-white text-[10px] font-bold uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <h2 className="text-4xl font-display font-bold text-navy-deep mb-6 group-hover:text-google-blue transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">By Devon Clarke</span>
                                <div className="flex items-center gap-2 text-google-blue font-bold group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                                    Explore Insight
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
