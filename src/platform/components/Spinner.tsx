import React, { useState, useEffect } from 'react';

const genericMessages = [
  "Contacting AI strategist...",
  "Analyzing business context...",
  "Synthesizing market data...",
  "Crafting the perfect hook...",
  "Checking for brand voice alignment...",
  "Generating creative concepts...",
  "Finalizing recommendations...",
];

interface SpinnerProps {
  size?: number;
  showMessages?: boolean;
  messages?: string[];
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20, showMessages = false, messages }) => {
  const loadingMessages = messages || genericMessages;
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (!showMessages) return;

    const interval = setInterval(() => {
      setMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [showMessages, loadingMessages]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg
        className="animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ width: size, height: size }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {showMessages && <p className="text-sm text-gray-400 animate-slide-in-up">{message}</p>}
    </div>
  );
};

export default Spinner;
