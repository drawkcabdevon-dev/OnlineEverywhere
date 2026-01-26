import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

const BarbadosMarketing: React.FC = () => {
    const { setModalOpen }: any = useOutletContext();

    return (
        <div className="bg-background">
            {/* Hero Section - Barbados Focus */}
            <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')]"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-8">
                            <span className="material-symbols-outlined">location_on</span>
                            Bridgetown, Barbados 🇧🇧
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-8">
                            Digital Marketing Excellence<br />
                            <span className="text-cyan-300">Rooted in Barbados.</span>
                        </h1>
                        <p className="text-2xl text-blue-100 leading-relaxed mb-12 max-w-3xl">
                            OnLineEverywhere brings world-class digital transformation to Caribbean businesses. From Bridgetown to the world, we build institutional-grade marketing infrastructure.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setModalOpen(true, 'audit')}
                                className="bg-white hover:bg-cyan-50 text-blue-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105"
                            >
                                Free Digital Audit
                            </button>
                            <Link
                                to="/contact"
                                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all"
                            >
                                Contact Local Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Local */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Local Expertise, Global Standards</h2>
                        <h3 className="text-4xl lg:text-5xl font-display font-bold text-gray-900">Why Barbadian Businesses Choose OLE</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "handshake_outline",
                                title: "Caribbean Market Understanding",
                                desc: "We know the unique challenges of marketing tourism, hospitality, and local services in the Caribbean market."
                            },
                            {
                                icon: "workspace_premium",
                                title: "Google Certified Excellence",
                                desc: "International technical standards with local business relationships and direct communication."
                            },
                            {
                                icon: "trending_up",
                                title: "Proven Local Results",
                                desc: "Helped Barbadian businesses increase international bookings by 140%+ through strategic digital transformation."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-m3 transition-all"
                            >
                                <span className="material-symbols-outlined text-5xl text-google-blue mb-6 block">{feature.icon}</span>
                                <h4 className="text-2xl font-display font-bold text-gray-900 mb-4">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services for Barbados */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-16">Services Tailored for Barbadian Businesses</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Tourism & Hospitality Marketing",
                                services: ["International Booking Engine Setup", "Multi-Platform Paid Ads (Google, Meta, TripAdvisor)", "Reputation Management & Reviews", "High-Conversion Photography & Videography"]
                            },
                            {
                                title: "Local Business Digital Presence",
                                services: ["Google My Business Optimization", "Local SEO for Barbados Searches", "Social Media Management", "Website Design & Development"]
                            },
                            {
                                title: "E-Commerce & Online Sales",
                                services: ["Shopify & WooCommerce Setup", "Payment Gateway Integration", "International Shipping Configuration", "Conversion Rate Optimization"]
                            },
                            {
                                title: "Strategic Growth Consulting",
                                services: ["Market Analysis & Positioning", "Competitor Intelligence", "Customer Journey Mapping", "Data-Driven Decision Making"]
                            }
                        ].map((service, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">{service.title}</h3>
                                <ul className="space-y-3">
                                    {service.services.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3 text-gray-600">
                                            <span className="material-symbols-outlined text-google-blue text-sm mt-1">check_circle</span>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-700">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-8">Ready to Transform Your Digital Presence?</h2>
                    <p className="text-xl text-blue-100 mb-12">
                        Schedule a free consultation with our Bridgetown team to discuss how we can help your business reach international markets.
                    </p>
                    <button
                        onClick={() => setModalOpen(true, 'audit')}
                        className="bg-white hover:bg-gray-100 text-blue-700 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all hover:scale-105"
                    >
                        Book Your Free Audit
                    </button>
                    <p className="text-sm text-blue-200 mt-6">📍 Serving Bridgetown, St. Michael, Christ Church & All Parishes</p>
                </div>
            </section>
        </div>
    );
};

export default BarbadosMarketing;
