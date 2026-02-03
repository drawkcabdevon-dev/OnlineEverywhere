import React from 'react';
import { motion } from 'framer-motion';

const WaveDivider: React.FC<{ fill?: string, className?: string }> = ({ fill = "fill-gray-50", className = "" }) => {
    return (
        <div className={`w-full overflow-hidden leading-[0] transform translate-z-0 ${className}`}>
            <svg
                className={`relative block w-full h-[60px] lg:h-[120px] ${fill}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                {/* Layer 1: Google Blue (Deep back) */}
                <path
                    d="M0,40 C200,60 400,20 600,40 C800,60 1000,20 1200,40 V120 H0 Z"
                    className="fill-google-blue opacity-10"
                />
                {/* Layer 2: Google Green (Mid) */}
                <path
                    d="M0,20 C300,50 600,0 900,50 C1050,75 1200,50 1200,50 V120 H0 Z"
                    className="fill-google-green opacity-10"
                />
                {/* Layer 3: Google Red (Soft top) */}
                <path
                    d="M0,10 C400,30 800,10 1200,30 V120 H0 Z"
                    className="fill-google-red opacity-10"
                />
                {/* Layer 4: Main Wave (Themed Color or Surface) */}
                <path
                    d="M0,0 C300,100 900,100 1200,0 V120 H0 Z"
                    className="fill-current"
                    style={{ shapeRendering: 'geometricPrecision' }}
                />

                {/* Layer 5: Google Themed Color Strip (The Edge) */}
                <path
                    d="M0,0 C300,100 900,100 1200,0"
                    fill="none"
                    stroke="#4285F4"
                    strokeWidth="4"
                    className="opacity-40"
                    style={{ shapeRendering: 'geometricPrecision' }}
                />
                <path
                    d="M300,75 C450,90 600,85 750,75"
                    fill="none"
                    stroke="#EA4335"
                    strokeWidth="4"
                    className="opacity-40"
                    style={{ shapeRendering: 'geometricPrecision' }}
                />
                <path
                    d="M600,62 C750,55 900,40 1050,20"
                    fill="none"
                    stroke="#FBBC05"
                    strokeWidth="4"
                    className="opacity-40"
                    style={{ shapeRendering: 'geometricPrecision' }}
                />
                <path
                    d="M900,25 C1000,15 1100,5 1200,0"
                    fill="none"
                    stroke="#34A853"
                    strokeWidth="4"
                    className="opacity-40"
                    style={{ shapeRendering: 'geometricPrecision' }}
                />
            </svg>
        </div>
    );
};

export default WaveDivider;
