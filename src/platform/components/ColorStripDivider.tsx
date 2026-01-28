import React from 'react';

const ColorStripDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`flex h-1.5 w-full ${className}`}>
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

export default ColorStripDivider;
