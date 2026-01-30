

import React, { useState, useMemo } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { BehavioralIntelligencePlan, Persona, InferredBehaviorProfile, PsychologicalAnalysis, PersonalizationStrategy, ImplementationPlan } from '../types';
import CodeBlock from '../components/CodeBlock';
import Section from '../components/Section';

const PlanViewer: React.FC<{ plan: BehavioralIntelligencePlan }> = ({ plan }) => {
    const [activeTab, setActiveTab] = useState<'ga4' | 'meta'>('ga4');

    return (
        <div className="space-y-6 animate-slide-in-up">
            <Section title="Psychology Deep Dive" description={`Uncovering the 'why' behind the behavior: ${plan.behavior}`}>
                <Card className="p-6 bg-gray-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        <div className="md:col-span-1 flex flex-col items-center text-center p-4 bg-surface rounded-lg border border-border">
                            <div className="text-secondary p-2 bg-secondary/10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20V16" /></svg>
                            </div>
                            <h4 className="font-semibold text-white mt-3">Primary Motivator</h4>
                            <p className="text-xl font-bold text-secondary font-serif mt-1">{plan.psychologicalAnalysis.primaryMotivator.split(' - ')[0]}</p>
                            <p className="text-xs text-text-muted">{plan.psychologicalAnalysis.primaryMotivator.split(' - ')[1] || ''}</p>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <h4 className="font-semibold text-white flex items-center mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-secondary mr-2"><path d="M16.42 7.42 12 12.01l-4.42-4.42" /><path d="m18 16-7.5-7.5L3 16" /></svg>
                                    Identified Biases
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {plan.psychologicalAnalysis.identifiedBiases.map((bias, i) => (
                                        <span key={i} className="bg-surface text-text-base text-sm font-medium px-3 py-1 rounded-full border border-border">{bias}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white flex items-center mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-secondary mr-2"><path d="m3.85 8.62 9.42-4.93c.65-.34 1.42.02 1.55.78l1.43 6.8c.13.63-.3 1.25-.95 1.38l-9.43 2.35c-.65.16-1.29-.2-1.42-.85L2.3 7.78c-.13-.65.2-1.32.85-1.42Z" /><path d="M12 12h.01" /></svg>
                                    Recommended Persuasion Tactic
                                </h4>
                                <p className="text-lg text-secondary font-semibold font-serif">{plan.psychologicalAnalysis.recommendedPersuasionTactic}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-semibold text-white mb-1">Analysis Summary</h4>
                        <p className="text-sm text-text-muted font-serif">{plan.psychologicalAnalysis.analysisSummary}</p>
                    </div>
                </Card>
            </Section>

            <Section title="Personalization Strategy & Activation" description="A three-part tactical plan to ethically influence this user behavior.">
                <div className="space-y-4">
                    <div className="rounded-lg border border-green-500/30 bg-green-900/20 p-4">
                        <h4 className="font-semibold text-green-300">Suggestion (For You)</h4>
                        <p className="text-green-200 mt-1 font-serif">{plan.personalizationStrategy.suggestion}</p>
                    </div>
                    <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
                        <h4 className="font-semibold text-blue-300">Explanation (For the User)</h4>
                        <p className="text-blue-200 mt-1 font-serif">{plan.personalizationStrategy.userExplanation}</p>
                    </div>
                    <div className="rounded-lg border border-gray-600/50 bg-gray-800/30 p-4">
                        <h4 className="font-semibold text-gray-300">Reasoning (For Your Team)</h4>
                        <p className="text-gray-400 mt-1 font-serif">{plan.personalizationStrategy.teamReasoning}</p>
                    </div>
                </div>
            </Section>

            <Section title="Implementation & Measurement" description="Technical details for tracking and measuring the impact of your strategy.">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-white mb-2">Key Metrics</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-text-muted font-serif">
                            {plan.implementationPlan.keyMetrics.map((metric, i) => <li key={i}>{metric}</li>)}
                        </ul>
                    </div>
                    <div className="border-t border-border pt-4">
                        <div className="flex border-b border-border">
                            <button onClick={() => setActiveTab('ga4')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'ga4' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-white'}`}>GA4</button>
                            <button onClick={() => setActiveTab('meta')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'meta' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-white'}`}>Meta</button>
                        </div>
                        <div className="pt-4">
                            {activeTab === 'ga4' && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-indigo-300 mb-2">Suggested Tags</h4>
                                    {plan.implementationPlan.ga4Plan.suggestedTags.map((tag, i) => (
                                        <div key={i}><p className="text-sm text-gray-200 mb-1">{tag.name}</p><CodeBlock code={tag.snippet} /></div>
                                    ))}
                                    <h4 className="font-semibold text-indigo-300 mb-1">Report Guide</h4>
                                    <p className="text-sm text-gray-300 font-serif">{plan.implementationPlan.ga4Plan.reportGuide}</p>
                                </div>
                            )}
                            {activeTab === 'meta' && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-indigo-300 mb-2">Pixel Events</h4>
                                    {plan.implementationPlan.metaPlan.pixelEvents.map((event, i) => (
                                        <p key={i} className="text-sm text-gray-300"><strong>{event.eventName}:</strong> {event.description}</p>
                                    ))}
                                    <h4 className="font-semibold text-indigo-300 mb-2">API Payloads</h4>
                                    {plan.implementationPlan.metaPlan.apiPayloads.map((payload, i) => (
                                        <div key={i}><p className="text-sm text-gray-200 mb-1">{payload.name}</p><CodeBlock code={payload.payload} /></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

const BehavioralIntelligenceHub: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity } = useProject();
    const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
    const [inferredBehaviors, setInferredBehaviors] = useState<InferredBehaviorProfile[]>([]);
    const [isLoadingPlanFor, setIsLoadingPlanFor] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<BehavioralIntelligencePlan | null>(null);

    const personas = activeProject?.personas || [];
    const plans = activeProject?.behavioralPlans || [];
    const isGa4Connected = activeProject?.integrations.ga4.connected;

    const selectedPersona = useMemo(() => {
        return personas.find(p => p.id === selectedPersonaId) || null;
    }, [personas, selectedPersonaId]);

    const personaPlans = useMemo(() => {
        if (!selectedPersonaId) return [];
        return plans.filter(p => p.personaId === selectedPersonaId);
    }, [plans, selectedPersonaId]);

    const handleSelectPersona = (personaId: string) => {
        setSelectedPersonaId(personaId);
        setSelectedPlan(null);
        setInferredBehaviors([]);
    };

    const handleAnalyze = async () => {
        if (!activeProject || !selectedPersona) return;
        setIsLoadingAnalysis(true);
        setInferredBehaviors([]);
        setSelectedPlan(null);
        try {
            const results = await geminiService.analyzePersonaTouchpoints(activeProject, selectedPersona);
            setInferredBehaviors(results);
            logActivity(`Analyzed touchpoints for persona: ${selectedPersona.name}`, 'behavioral-hub', { persona: selectedPersona, results });
        } catch (error) {
            console.error("Failed to analyze persona touchpoints", error);
        } finally {
            setIsLoadingAnalysis(false);
        }
    };

    const handleGeneratePlan = async (profile: InferredBehaviorProfile) => {
        if (!activeProject || !selectedPersona) return;
        setIsLoadingPlanFor(profile.profileName);
        setSelectedPlan(null);
        try {
            const planData = await geminiService.generateBehavioralIntelligencePlan(activeProject, selectedPersona, profile);
            const newPlan = {
                ...planData,
                id: crypto.randomUUID(),
                personaId: selectedPersona.id,
            };

            updateActiveProject(p => ({ ...p, behavioralPlans: [...p.behavioralPlans, newPlan] }));
            logActivity(`Generated intelligence plan for behavior: "${profile.profileName}"`, 'behavioral-hub', newPlan);
            setSelectedPlan(newPlan);
        } catch (error) {
            console.error("Failed to generate intelligence plan", error);
        } finally {
            setIsLoadingPlanFor(null);
        }
    };

    return (
        <ToolShell moduleId="behavioral-hub">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Section title="1. Select Persona" description="Choose a persona to analyze their digital journey and infer behaviors.">
                        {personas.length > 0 ? (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {personas.map((p: Persona) => (
                                    <button
                                        key={p.id}
                                        onClick={() => handleSelectPersona(p.id)}
                                        className={`w-full text-left p-3 rounded-md border-2 transition-colors ${selectedPersonaId === p.id ? 'bg-primary/20 border-primary' : 'bg-surface border-border hover:border-gray-500'}`}
                                        aria-current={selectedPersonaId === p.id}
                                    >
                                        <p className="font-semibold text-white">{p.name}</p>
                                        <p className="text-xs text-text-muted">{p.role}</p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-yellow-400 bg-yellow-900/20 p-3 rounded-md">Please create a persona in the PersonaLab first.</p>
                        )}
                    </Section>

                    {selectedPersona && (
                        <Section title="Saved Plans" description={`Intelligence plans generated for ${selectedPersona.name}.`}>
                            {personaPlans.length > 0 ? (
                                <ul className="space-y-2">
                                    {personaPlans.map(p => (
                                        <li key={p.id}>
                                            <button
                                                onClick={() => setSelectedPlan(p)}
                                                className={`w-full text-left p-2 rounded ${selectedPlan?.id === p.id ? 'bg-primary/50' : 'bg-surface hover:bg-border'}`}
                                                aria-current={selectedPlan?.id === p.id}
                                            >
                                                <p className="font-semibold text-white truncate">{p.behavior}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-text-muted">No plans generated for this persona yet.</p>
                            )}
                        </Section>
                    )}
                </div>

                <div className="lg:col-span-2">
                    {!selectedPersona ? (
                        <Card className="h-full flex items-center justify-center p-8">
                            <p className="text-center text-text-muted">Select a persona from the left to begin analyzing their behavior.</p>
                        </Card>
                    ) : selectedPlan ? (
                        <PlanViewer plan={selectedPlan} />
                    ) : (
                        <Section title={`2. Analyze ${selectedPersona.name}`} description="Generate behavioral profiles based on this persona's journey map.">
                            <div className="text-center">
                                <Button onClick={handleAnalyze} isLoading={isLoadingAnalysis} size="lg" disabled={!selectedPersona}>
                                    Analyze Digital Touchpoints
                                </Button>
                                {isGa4Connected && (
                                    <p className="text-xs text-green-400 mt-2 flex items-center justify-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                        GA4 connection is active and will be used to enhance analysis.
                                    </p>
                                )}
                            </div>

                            {isLoadingAnalysis && <div className="flex justify-center p-8"><Spinner showMessages /></div>}

                            {inferredBehaviors.length > 0 && (
                                <div className="mt-8 space-y-4">
                                    <h3 className="text-lg font-semibold text-white">Inferred Behavioral Profiles</h3>
                                    {inferredBehaviors.map((profile, i) => (
                                        <Card key={i} className="p-4">
                                            <h4 className="font-bold text-secondary">{profile.profileName}</h4>
                                            <p className="text-sm text-text-muted mt-1 font-serif">{profile.description}</p>
                                            <div className="mt-3">
                                                <h5 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Predicted GA4 Path</h5>
                                                <div className="flex items-center space-x-2 text-sm text-primary-light mt-1 flex-wrap">
                                                    {profile.predictedGa4Path.map((step, j) => (
                                                        <React.Fragment key={j}>
                                                            <span className="bg-primary/10 px-2 py-1 rounded">{step}</span>
                                                            {j < profile.predictedGa4Path.length - 1 && <span className="text-text-muted">&rarr;</span>}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4 border-t border-border pt-3">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => handleGeneratePlan(profile)}
                                                    isLoading={isLoadingPlanFor === profile.profileName}
                                                >
                                                    Generate Intelligence Plan
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </Section>
                    )}
                </div>
            </div>
        </ToolShell>
    );
};

export default BehavioralIntelligenceHub;