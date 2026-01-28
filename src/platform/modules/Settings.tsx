import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useError } from '../contexts/ErrorContext';
import ToolShell from '../components/ToolShell';
import Button from '../components/Button';
import { ProjectFoundation } from '../types';
import * as geminiService from '../services/geminiService';
import Section from '../components/Section';
import SuggestionGenerator from '../components/SuggestionGenerator';
import MultiValueInput from '../components/MultiValueInput';

const Settings: React.FC = () => {
  const { activeProject, updateActiveProject, logActivity } = useProject();
  const { setError } = useError();
  const [foundation, setFoundation] = useState<ProjectFoundation>(activeProject!.foundation);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFoundation(activeProject!.foundation);
  }, [activeProject]);

  const handleRefreshSuggestions = async () => {
    if (!activeProject) return;
    setIsLoading(true);
    try {
      const suggestions = await geminiService.refreshProjectSuggestions(activeProject);
      updateActiveProject(p => ({ ...p, suggestions }));
      logActivity("Refreshed AI suggestion pack.", 'settings');
    } catch (error: any) {
      console.error("Failed to refresh suggestion pack", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const needsRefresh = !activeProject?.suggestions || !activeProject.suggestions.audiences || activeProject.suggestions.audiences.length === 0;
    if (needsRefresh) {
      handleRefreshSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (field: keyof ProjectFoundation, value: string | string[]) => {
    const updatedFoundation = { ...foundation, [field]: value };
    setFoundation(updatedFoundation);
    updateActiveProject(p => ({ ...p, foundation: updatedFoundation }));
  };

  const hasSuggestions = activeProject?.suggestions && activeProject.suggestions.audiences.length > 0;

  const businessTypes = [
    'B2B', 'B2C', 'SaaS', 'E-commerce', 'Marketplace', 'D2C', 'Non-Profit', 'Other'
  ];

  const industries = [
    'Marketing', 'Technology', 'E-commerce', 'Professional Services', 'Healthcare', 'Finance', 'Retail', 'Education', 'Manufacturing', 'Entertainment', 'Hospitality', 'Real Estate', 'Other'
  ];

  const brandVoices = ['Professional', 'Friendly', 'Witty', 'Inspirational', 'Authoritative', 'Supportive', 'Bold', 'Minimalist'];

  const inputClasses = "block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <ToolShell moduleId="settings">
      <div className="space-y-8">
        <Section
          step={1}
          title="Define Your Foundation"
          description="This is the central 'brain' for your project. Every piece of information here provides essential context for the AI and automatically updates suggestions across the app."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <label className={labelClasses}>Business Name</label>
              <input type="text" value={foundation.businessName} onChange={e => handleUpdate('businessName', e.target.value)} className={inputClasses} />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className={labelClasses}>Business Type</label>
                <select
                  value={foundation.businessType}
                  onChange={e => handleUpdate('businessType', e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Select a type</option>
                  {businessTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="w-1/2">
                <label className={labelClasses}>Industry</label>
                <select
                  value={foundation.industry}
                  onChange={e => handleUpdate('industry', e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Select an industry</option>
                  {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Target Audience(s)</label>
              <MultiValueInput values={foundation.targetAudience} onChange={values => handleUpdate('targetAudience', values)} placeholder="Add an audience and press Enter..." />
              <SuggestionGenerator
                preloadedSuggestions={activeProject?.suggestions?.audiences || []}
                generationFn={() => geminiService.suggestTargetAudience(activeProject!)}
                onSelect={(value) => handleUpdate('targetAudience', [...foundation.targetAudience, value])}
                dependencies={[foundation.businessType, foundation.businessDescription]}
                buttonText="Suggest Audiences"
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Primary Marketing Objective(s)</label>
              <MultiValueInput values={foundation.objective} onChange={values => handleUpdate('objective', values)} placeholder="Add an objective and press Enter..." />
              <SuggestionGenerator
                preloadedSuggestions={activeProject?.suggestions?.objectives || []}
                generationFn={() => geminiService.suggestObjective(activeProject!)}
                onSelect={(value) => handleUpdate('objective', [...foundation.objective, value])}
                dependencies={[foundation.businessType, foundation.businessDescription]}
                buttonText="Suggest Objectives"
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Business Description</label>
              <textarea
                value={foundation.businessDescription}
                onChange={e => handleUpdate('businessDescription', e.target.value)}
                className={`${inputClasses} h-32 py-3 px-4`}
                placeholder="Describe your business, products, and unique value proposition..."
              />
            </div>
            <div>
              <label className={labelClasses}>Website URL</label>
              <input
                type="url"
                value={foundation.websiteUrl}
                onChange={e => handleUpdate('websiteUrl', e.target.value)}
                className={inputClasses}
                placeholder="https://yourbusiness.com"
              />
            </div>
            <div>
              <label className={labelClasses}>Geographic Focus</label>
              <select
                value={foundation.geographicFocus || ''}
                onChange={e => handleUpdate('geographicFocus', e.target.value)}
                className={inputClasses}
              >
                <option value="">-- Select Focus --</option>
                {['Local', 'Regional', 'National', 'Global'].map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Competitor URLs</label>
              <MultiValueInput
                values={foundation.competitorUrls || []}
                onChange={values => handleUpdate('competitorUrls', values)}
                placeholder="Add a competitor URL and press Enter..."
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Brand Voice</label>
              <select
                value={foundation.brandVoice}
                onChange={e => handleUpdate('brandVoice', e.target.value)}
                className={inputClasses}
              >
                <option value="">Select a brand voice</option>
                {brandVoices.map(voice => <option key={voice} value={voice}>{voice}</option>)}
              </select>
            </div>
          </div>
        </Section>

        <Section
          step={2}
          title="AI Suggestion Engine"
          description="Suggestions are now refreshed automatically in the background as you work. You can also trigger a manual refresh here."
        >
          <Button onClick={handleRefreshSuggestions} isLoading={isLoading} disabled={!foundation.businessName || !foundation.businessType}>
            {isLoading ? 'Analyzing project...' : 'Refresh Suggestions Now'}
          </Button>
          {hasSuggestions && !isLoading && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">✓ Suggestion pack is active. You will see pre-filled ideas in relevant tools like the PersonaLab and Content Creator.</p>
            </div>
          )}
        </Section>
      </div>
    </ToolShell>
  );
};

export default Settings;