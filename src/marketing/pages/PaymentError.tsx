import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PaymentError: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-google-blue rounded-full blur-[120px] opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-96 bg-google-red rounded-full blur-[120px] opacity-10 animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-2xl"
            >
                <div className="size-24 rounded-full bg-google-red/10 flex items-center justify-center mx-auto mb-10 shadow-xl shadow-google-red/5">
                    <span className="material-symbols-outlined text-5xl text-google-red font-variation-fill">payments</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-display font-bold text-navy-deep leading-tight tracking-tight mb-6">
                    Service <br /> <span className="text-google-red">Temporarily Paused</span>
                </h1>

                <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-lg mx-auto">
                    We're currently performing essential maintenance on our infrastructure scaling protocols. Please check back in a few moments or contact our strategic support team.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-navy-deep text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg"
                    >
                        Try Again
                    </Link>
                    <a
                        href="mailto:devon@onlineverywhere.com"
                        className="bg-white border border-gray-100 text-navy-deep px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-all"
                    >
                        Contact Support
                    </a>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-center gap-2">
                    <div className="size-2 rounded-full bg-google-blue"></div>
                    <div className="size-2 rounded-full bg-google-red"></div>
                    <div className="size-2 rounded-full bg-google-yellow"></div>
                    <div className="size-2 rounded-full bg-google-green"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Error Code: SV-402-INF</span>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentError;
