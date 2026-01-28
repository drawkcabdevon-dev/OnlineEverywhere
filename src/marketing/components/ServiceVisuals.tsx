import React from 'react';
import { motion } from 'framer-motion';

const VisualContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
    <div className={`w-full h-full rounded-[2.5rem] bg-navy-deep overflow-hidden relative group ${className}`}>
        {children}
    </div>
);

export const WebEngineeringVisual = () => {
    return (
        <VisualContainer>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(66,133,244,0.15),transparent)]"></div>

            {/* Code Block Simulation */}
            <motion.div
                className="absolute top-10 left-10 right-10 bottom-10 font-mono text-[10px] text-google-blue/40 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div>class DigitalInfrastructure {'{'}</div>
                <div className="pl-4">constructor() {'{'}</div>
                <motion.div
                    className="pl-8 text-google-blue/80"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    this.performance = 1.0;
                </motion.div>
                <div className="pl-8 text-google-blue/80">this.security = "HARDENED";</div>
                <div className="pl-4">{'}'}</div>
                <div>{'}'}</div>
            </motion.div>

            {/* Performance Bars */}
            <div className="absolute bottom-12 left-12 right-12 flex items-end gap-2 h-24">
                {[40, 70, 55, 90, 65, 100].map((h, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 bg-google-blue/20 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                    />
                ))}
            </div>

            {/* Glowing Node */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 size-20 rounded-full bg-google-blue/10 border border-google-blue/30 flex items-center justify-center shadow-[0_0_50px_rgba(26,115,232,0.3)]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <span className="material-symbols-outlined text-google-blue text-4xl">dns</span>
            </motion.div>
        </VisualContainer>
    );
};

export const SearchVisibilityVisual = () => {
    return (
        <VisualContainer>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,67,53,0.15),transparent)]"></div>

            {/* Search Bar Animation */}
            <motion.div
                className="absolute top-12 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-white/5 border border-white/10 rounded-full flex items-center px-4 gap-3 shadow-xl"
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: "66%", opacity: 1 }}
                transition={{ duration: 1, ease: "backOut" }}
            >
                <span className="material-symbols-outlined text-google-red text-sm">search</span>
                <div className="h-1.5 w-24 bg-white/20 rounded-full"></div>
            </motion.div>

            {/* Floating Keyword Tags */}
            {[
                { t: "Page #1", top: "40%", left: "15%", c: "google-red" },
                { t: "Top Ranking", top: "55%", left: "60%", c: "white" },
                { t: "Traffic Spike", top: "75%", left: "25%", c: "google-red" }
            ].map((tag, i) => (
                <motion.div
                    key={i}
                    className={`absolute px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest ${tag.c === 'white' ? 'bg-white/10 text-white' : 'bg-google-red text-white shadow-lg shadow-google-red/20'}`}
                    style={{ top: tag.top, left: tag.left }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                >
                    {tag.t}
                </motion.div>
            ))}

            {/* Growth Curve */}
            <svg className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none" viewBox="0 0 400 200">
                <motion.path
                    d="M 0 180 Q 100 180, 200 120 T 400 20"
                    fill="none"
                    stroke="#EA4335"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                    d="M 0 180 Q 100 180, 200 120 T 400 20"
                    fill="url(#red-glow)"
                    stroke="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                />
                <defs>
                    <linearGradient id="red-glow" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#EA4335" stopOpacity="0" />
                        <stop offset="100%" stopColor="#EA4335" stopOpacity="1" />
                    </linearGradient>
                </defs>
            </svg>
        </VisualContainer>
    );
};

export const StrategicAnalysisVisual = () => {
    return (
        <VisualContainer>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,188,5,0.1),transparent)]"></div>

            {/* User Journey Map Nodes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240">
                <motion.path
                    d="M 50 120 L 150 70 L 250 150 L 350 100"
                    fill="none"
                    stroke="rgba(251,188,5,0.2)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                />
                {[
                    { x: 50, y: 120, label: "Visit" },
                    { x: 150, y: 70, label: "Intent" },
                    { x: 250, y: 150, label: "Friction" },
                    { x: 350, y: 100, label: "Sale" }
                ].map((node, i) => (
                    <g key={i}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="6"
                            fill={i === 2 ? "#EA4335" : "#FBBC05"}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.3 }}
                        />
                        {i === 2 && (
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r="12"
                                fill="none"
                                stroke="#EA4335"
                                animate={{ scale: [1, 2], opacity: [1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                    </g>
                ))}
            </svg>

            {/* ROI Counter */}
            <div className="absolute top-10 right-10 text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Conversion Lift</p>
                <motion.p
                    className="text-4xl font-display font-bold text-google-yellow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    +32%
                </motion.p>
            </div>

            {/* Heatmap Simulation */}
            <div className="absolute bottom-10 left-10 flex gap-1">
                {[1, 0.5, 0.8, 1, 0.3].map((op, i) => (
                    <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full bg-google-yellow shadow-[0_0_20px_rgba(251,188,5,0.4)]"
                        style={{ opacity: op * 0.4 }}
                        animate={{ opacity: [op * 0.2, op * 0.6, op * 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}
            </div>
        </VisualContainer>
    );
};

export const BrandDesignVisual = () => {
    return (
        <VisualContainer>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(52,168,83,0.15),transparent)]"></div>

            {/* Golden Ratio / Grid Overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Logo Morphing / Floating Shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="size-32 border-4 border-google-green rounded-[2rem] flex items-center justify-center relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div
                        className="size-16 bg-google-green rounded-full shadow-2xl shadow-google-green/20"
                        animate={{ borderRadius: ["50%", "20%", "50%"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </motion.div>
            </div>

            {/* Color Palette Indicators */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                {['#34A853', '#1A73E8', '#EA4335', '#FBBC05'].map((color, i) => (
                    <motion.div
                        key={i}
                        className="h-8 w-12 rounded-lg border border-white/10"
                        style={{ backgroundColor: color }}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                    />
                ))}
            </div>

            <motion.div
                className="absolute top-10 left-10 text-google-green flex items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="material-symbols-outlined">palette</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Prestige Layer</span>
            </motion.div>
        </VisualContainer>
    );
};
