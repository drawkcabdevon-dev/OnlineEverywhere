import React from 'react';
import { motion } from 'framer-motion';

// Common visual container styling
const VisualContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
    <div className={`w-full h-48 lg:h-64 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center relative overflow-hidden ${className}`}>
        {children}
    </div>
);

export const GlobalIntentVisual = () => {
    return (
        <VisualContainer className="group-hover:bg-google-blue/5 transition-colors duration-500">
            {/* Central Globe Icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="z-10 text-google-blue"
            >
                <span className="material-symbols-outlined text-6xl lg:text-8xl">public</span>
            </motion.div>

            {/* Orbiting Elements */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border border-google-blue/20 rounded-full"
                    style={{
                        width: `${(i + 2) * 30}%`,
                        height: `${(i + 2) * 30}%`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 10 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2 // Stagger start
                    }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 bg-google-blue rounded-full"></div>
                </motion.div>
            ))}

            {/* Incoming Data Streams */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                {[0, 1, 2, 3].map(i => (
                    <motion.div
                        key={`stream-${i}`}
                        className="absolute bg-gradient-to-r from-transparent to-google-blue/40 h-px w-24"
                        style={{
                            top: `${20 + i * 20}%`,
                            left: i % 2 === 0 ? '-10%' : 'auto',
                            right: i % 2 !== 0 ? '-10%' : 'auto',
                        }}
                        animate={{
                            x: i % 2 === 0 ? ['-100%', '200%'] : ['100%', '-200%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
        </VisualContainer>
    );
};

export const InvisibleGapVisual = () => {
    return (
        <VisualContainer className="group-hover:bg-google-red/5 transition-colors duration-500">
            {/* Left Entity */}
            <motion.div
                className="absolute left-[15%] flex flex-col items-center gap-2 text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <span className="material-symbols-outlined text-5xl">domain</span>
            </motion.div>

            {/* Right Entity */}
            <motion.div
                className="absolute right-[15%] flex flex-col items-center gap-2 text-google-red"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="material-symbols-outlined text-5xl">rocket_launch</span>
            </motion.div>

            {/* The Gap Scan Reader */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-1 bg-google-red/20 overflow-hidden"
                initial={{ height: 0 }}
                whileInView={{ height: 128 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="w-full h-1/2 bg-google-red blur-md"
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* Connection Bridge Appearing */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12" viewBox="0 0 200 40">
                <motion.path
                    d="M 10 20 L 190 20"
                    fill="none"
                    stroke="#EA4335"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2, delay: 0.5 }}
                />
            </svg>
        </VisualContainer>
    );
};

export const StrategicProjectionVisual = () => {
    return (
        <VisualContainer className="group-hover:bg-google-green/5 transition-colors duration-500">
            {/* Background Grid */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 opacity-10">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-google-green/20 rounded-sm"></div>
                ))}
            </div>

            {/* Growth Arrow */}
            <motion.div
                className="text-google-green absolute bottom-10 left-10"
                initial={{ scale: 0, x: -20, y: 20 }}
                whileInView={{ scale: 1, x: 0, y: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
            >
                <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-lg">
                    <motion.path
                        d="M 10 90 Q 40 90 60 50 T 90 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M 60 10 L 90 10 L 90 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4, duration: 0.3 }}
                    />
                </svg>
            </motion.div>

            {/* Sparkles */}
            {[1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    className="absolute text-google-green"
                    style={{
                        top: `${20 + i * 20}%`,
                        right: `${20 + i * 10}%`
                    }}
                    animate={{ scale: [0, 1, 0], rotate: [0, 45, 90] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        repeatDelay: 1
                    }}
                >
                    <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                </motion.div>
            ))}
        </VisualContainer>
    );
};

export const InstitutionalGrowthVisual = () => {
    return (
        <VisualContainer className="group-hover:bg-google-yellow/5 transition-colors duration-500 overflow-hidden">
            {/* Building Blocks Stacking */}
            <div className="relative w-40 h-40 flex items-end justify-center gap-1">
                {/* Left Pillar */}
                <motion.div
                    className="w-10 bg-google-yellow/40 rounded-t-sm"
                    initial={{ height: 0 }}
                    whileInView={{ height: '60%' }}
                    transition={{ duration: 1, ease: "backOut" }}
                />
                {/* Center Pillar (Main) */}
                <motion.div
                    className="w-12 bg-google-yellow rounded-t-sm relative z-10"
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "backOut" }}
                >
                    {/* Internal Structure Lines */}
                    <div className="absolute inset-x-2 top-4 bottom-0 flex flex-col justify-evenly opacity-30">
                        <div className="h-px bg-white/50 w-full" />
                        <div className="h-px bg-white/50 w-full" />
                        <div className="h-px bg-white/50 w-full" />
                    </div>
                </motion.div>
                {/* Right Pillar */}
                <motion.div
                    className="w-10 bg-google-yellow/40 rounded-t-sm"
                    initial={{ height: 0 }}
                    whileInView={{ height: '80%' }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
                />
            </div>

            {/* Background Clouds/Scale Indicators */}
            <motion.div
                className="absolute top-4 right-10 text-google-yellow/30"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="material-symbols-outlined text-4xl">cloud</span>
            </motion.div>
        </VisualContainer>
    );
};
