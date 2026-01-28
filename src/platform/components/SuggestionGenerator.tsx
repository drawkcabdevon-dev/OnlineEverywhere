import React, { useState } from 'react';
import Button from './Button';
import Spinner from './Spinner';
import { Suggestion } from '../types';

interface SuggestionGeneratorProps {
  preloadedSuggestions?: Suggestion[];
  generationFn?: () => Promise<Suggestion[]>;
  onSelect: (suggestion: string) => void;
  dependencies?: (string | undefined | null)[];
  buttonText?: string;
}

const SuggestionGenerator: React.FC<SuggestionGeneratorProps> = ({
  preloadedSuggestions = [],
  generationFn,
  onSelect,
  dependencies = [],
  buttonText = 'Suggest with AI'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSuggestions, setGeneratedSuggestions] = useState<Suggestion[]>([]);

  const handleGenerate = async () => {
    if (!generationFn) return;
    setIsLoading(true);
    setGeneratedSuggestions([]);
    try {
      const suggestions = await generationFn();
      setGeneratedSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to generate suggestions", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerationDisabled = dependencies.some(dep => !dep || dep.length === 0);

  const SuggestionButton: React.FC<{ suggestion: Suggestion, color: 'blue' | 'green' }> = ({ suggestion, color }) => (
    <button
      onClick={() => onSelect(suggestion.name)}
      title={suggestion.description}
      className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
        color === 'blue'
          ? 'bg-blue-900/50 text-blue-300 hover:bg-blue-800/70'
          : 'bg-green-900/50 text-green-300 hover:bg-green-800/70'
      }`}
    >
      {suggestion.name}
    </button>
  );

  return (
    <div className="mt-2 space-y-2">
      {preloadedSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {preloadedSuggestions.map((s, i) => <SuggestionButton key={`preloaded-${i}`} suggestion={s} color="blue" />)}
        </div>
      )}
      
      {generationFn && (
        <div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleGenerate}
            disabled={isGenerationDisabled || isLoading}
            isLoading={isLoading}
          >
            {buttonText}
          </Button>

          {generatedSuggestions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {generatedSuggestions.map((s, i) => <SuggestionButton key={`generated-${i}`} suggestion={s} color="green" />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionGenerator;