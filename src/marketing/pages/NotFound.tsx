import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-google-blue rounded-full blur-[120px] opacity-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <h1 className="text-9xl font-display font-bold text-gray-100 mb-4">404</h1>
                <h2 className="text-4xl font-display font-bold text-navy-deep mb-6">Page Not Found</h2>
                <p className="text-gray-500 mb-10 max-w-md mx-auto">
                    The blueprint you're looking for doesn't exist or has been relocated to a new digital coordinate.
                </p>
                <Link
                    to="/"
                    className="bg-google-blue text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg inline-block"
                >
                    Return Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
