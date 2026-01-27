
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isInteractive?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, isInteractive }) => {
  // Updated base classes for Light Theme
  const baseClasses = 'bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300';
  
  const clickableClasses = onClick || isInteractive
    ? 'cursor-pointer card-interactive'
    : '';

  return (
    <div className={`${baseClasses} ${clickableClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
