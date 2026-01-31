import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What exactly is Ollie, the AI Co-Pilot?",
        answer: "Ollie is our proprietary AI core designed to act as a strategic partner for your business. It doesn't just generate text; it analyzes market intent, optimizes conversion paths, and provides real-time insights based on your specific digital infrastructure."
    },
    {
        question: "How does OnlineEverywhere help tourism businesses specifically?",
        answer: "Tourism is an international search game. We specialize in identifying 'Global Intent'—where international travelers are searching for Caribbean experiences—and ensuring your business appears in those high-value digital streams through AI-native infrastructure."
    },
    {
        question: "What is included in the Digital Launchpad?",
        answer: "The Launchpad is a complete foundational package: it includes a full brand identity system, enterprise-grade UI/UX design, a unified CMS, search-optimized content architecture, and social proof integration to establish immediate digital authority."
    },
    {
        question: "How quickly can we see results with the Growth Engine?",
        answer: "While SEO and brand building are long-term strategies, our Growth Engine leverages 'Paid Media Ignition' and 'Conversion Catalyst' frameworks to drive immediate traffic and optimize lead capture, often seeing measurable ROI within the first 60-90 days."
    },
    {
        question: "Do you offer custom AI strategies for established brands?",
        answer: "Yes. Our 'Strategic Consulting' and 'Strategic Projection' frameworks are specifically designed for established institutions looking to bridge the gap between their current operations and global digital demand using tailored AI implementations."
    },
    {
        question: "Is my business data secure when using your AI systems?",
        answer: "Security and data sovereignty are at our core. We build infrastructure where you own your audience and your data. Our AI implementations are designed to respect privacy and maintain high institutional-grade security protocols."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white overflow-hidden" id="faq">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-google-blue font-bold text-sm uppercase tracking-[0.3em] mb-4"
                    >
                        Questions & Answers
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-display font-bold text-gray-900 tracking-tight"
                    >
                        Frequently Asked <span className="text-google-blue">Questions.</span>
                    </motion.h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`border rounded-2xl transition-all duration-300 ${openIndex === index
                                    ? 'border-google-blue bg-blue-50/30'
                                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-google-blue' : 'text-gray-900'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5 text-google-blue" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-500 mb-6">Still have more questions?</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-google-blue font-bold hover:gap-3 transition-all"
                    >
                        Contact our strategy team
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
