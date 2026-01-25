import React, { useEffect } from 'react';
import { useError } from '../contexts/ErrorContext';

const ErrorBanner: React.FC = () => {
  const { error, clearError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 8000); // Auto-dismiss after 8 seconds

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div 
        className="fixed bottom-4 right-4 max-w-md w-full bg-red-800 text-white p-4 rounded-lg shadow-2xl z-50 animate-slide-in-up border border-red-600"
        role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-300"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-red-100">An Error Occurred</p>
          <p className="mt-1 text-sm text-red-200">{error}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={clearError}
            className="inline-flex rounded-md bg-red-800 p-1.5 text-red-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-800"
            aria-label="Dismiss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
