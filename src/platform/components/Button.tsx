import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed';

  const variantClasses = {
    // Updated to use var(--color-primary-dark) (#5B60C6) for better contrast against white text
    primary: 'bg-[var(--color-primary-dark)] text-white hover:opacity-90 focus:ring-indigo-500 shadow-lg shadow-indigo-500/20 disabled:opacity-60 disabled:bg-gray-400',
    secondary: 'bg-white text-text-base hover:bg-gray-50 focus:ring-border border border-gray-300 shadow-sm disabled:opacity-60',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary-dark)] focus:ring-[var(--color-primary)] disabled:opacity-50', 
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={combinedClasses} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <Spinner size={size === 'lg' ? 24 : 16} /> : children}
    </button>
  );
};

export default Button;