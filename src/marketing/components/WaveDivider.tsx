import React from 'react';
import { motion } from 'framer-motion';

const WaveDivider: React.FC = () => {
    return (
        <div className="w-full h-16 relative overflow-hidden bg-white">
            <div className="absolute bottom-0 w-full h-full">
                {/* Layer 1 - Google Blue */}
                <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10,
                    }}
                    className="absolute bottom-0 left-0 w-[200%] h-full opacity-30 text-google-blue"
                >
                    <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path
                            fill="currentColor"
                            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,53.3C1120,43,1280,21,1360,10.7L1440,0L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
                        ></path>
                    </svg>
                </motion.div>

                {/* Layer 2 - Google Red */}
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 15,
                    }}
                    className="absolute bottom-0 left-0 w-[200%] h-full opacity-30 text-google-red"
                >
                    <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path
                            fill="currentColor"
                            d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,64C1120,75,1280,85,1360,90.7L1440,96L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
                        ></path>
                    </svg>
                </motion.div>

                {/* Layer 3 - Google Yellow */}
                <motion.div
                    animate={{ x: ["-25%", "25%"] }} // Gentle rocking
                    transition={{
                        repeat: Infinity,
                        ease: "easeInOut",
                        duration: 8,
                        repeatType: 'mirror'
                    }}
                    className="absolute bottom-0 left-[-25%] w-[150%] h-full opacity-30 text-google-yellow"
                >
                    <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path
                            fill="currentColor"
                            d="M0,48L80,53.3C160,59,320,69,480,69.3C640,69,800,59,960,53.3C1120,48,1280,48,1360,48L1440,48L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
                        ></path>
                    </svg>
                </motion.div>

                {/* Layer 4 - Google Green */}
                <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 12,
                    }}
                    className="absolute bottom-0 left-0 w-[200%] h-full opacity-30 text-google-green"
                >
                    <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path
                            fill="currentColor"
                            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,30C1200,30,1320,40,1380,45L1440,50L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
                        ></path>
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

export default WaveDivider;
