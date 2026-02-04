import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Success: React.FC = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 max-w-lg"
            >
                <div className="size-24 bg-google-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="material-symbols-outlined text-5xl text-google-green animate-bounce">verified_user</span>
                </div>

                <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                    Access Granted
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed mb-10">
                    Your request has been successfully transmitted to our strategic team. We are reviewing your entry and will be in touch shortly.
                </p>

                <div className="space-y-4">
                    <Link
                        to="/portal"
                        className="w-full bg-google-blue text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-google-blue/30 transition-all transform hover:scale-[1.02]"
                    >
                        <span className="material-symbols-outlined">rocket_launch</span>
                        Enter Ollie OS
                    </Link>

                    <Link
                        to="/"
                        className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
                    >
                        Return to Homepage
                    </Link>
                </div>

                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-8">
                    Secured by OnLineEverywhere Protocols
                </p>
            </motion.div>
        </div>
    );
};

export default Success;
