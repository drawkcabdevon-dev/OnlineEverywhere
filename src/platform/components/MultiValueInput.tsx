import React, { useState } from 'react';

interface MultiValueInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const MultiValueInput: React.FC<MultiValueInputProps> = ({ values, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!values.includes(inputValue.trim())) {
        onChange([...values, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const handleRemove = (valueToRemove: string) => {
    onChange(values.filter(v => v !== valueToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 bg-gray-700 border border-gray-600 rounded-md min-h-[40px]">
        {values.map((value, index) => (
          <div key={index} className="flex items-center bg-primary text-white text-sm font-medium px-2 py-1 rounded">
            <span>{value}</span>
            <button onClick={() => handleRemove(value)} className="ml-2 text-indigo-200 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow bg-transparent focus:outline-none p-1 text-white"
        />
      </div>
    </div>
  );
};

export default MultiValueInput;