import React from 'react';
import Card from './Card';

interface SectionProps {
  title: string;
  description: string;
  step?: number;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, description, step, children, className }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        {step && (
          <div className="flex-shrink-0 bg-gray-700 text-indigo-300 rounded-full h-8 w-8 flex items-center justify-center font-bold border border-gray-600">
            {step}
          </div>
        )}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-6">
        {children}
      </div>
    </Card>
  );
};

export default Section;