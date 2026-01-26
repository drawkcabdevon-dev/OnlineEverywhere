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
        <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Strategic Insights</h2>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight mb-8">
                        The Endeavor <span className="text-gray-400">Blog.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
                        Technical deep-dives, strategic frameworks, and institutional wisdom on mastering the global digital economy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-surface p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-m3 transition-all group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className={`size-14 rounded-2xl bg-${post.color}/10 flex items-center justify-center text-${post.color}`}>
                                    <span className="material-symbols-outlined text-3xl">{post.icon}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{post.date}</span>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                                {post.category}
                            </div>

                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 group-hover:text-google-blue transition-colors leading-tight">
                                {post.title}
                            </h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-end text-google-blue font-bold text-sm group-hover:translate-x-2 transition-transform">
                                <span>Read Insight</span>
                                <span className="material-symbols-outlined ml-2">chevron_right</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
