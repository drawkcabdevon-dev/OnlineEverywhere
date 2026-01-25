import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { StrategyBrief, CampaignTask, KeyMessage } from '../types';
import Section from '../components/Section';
import SuggestionGenerator from '../components/SuggestionGenerator';
import Drawer from '../components/Drawer';
import Modal from '../components/Modal';
import CodeBlock from '../components/CodeBlock';

const GanttChart: React.FC<{ tasks: CampaignTask[] }> = ({ tasks }) => {
    if (!tasks || tasks.length === 0) return <p className="text-gray-500">No timeline data available.</p>;

    // 1. Find range
    const dates = tasks.flatMap(t => [new Date(t.start).getTime(), new Date(t.end).getTime()]);
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const totalDuration = maxDate - minDate || 1; // Avoid division by zero

    // 2. Generate Grid Lines (Simple approach: start, mid, end)
    const formatDate = (ts: number) => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    return (
        <div className="mt-4 overflow-x-auto">
            <div className="min-w-[600px] relative">
                {/* Header Dates */}
                <div className="flex justify-between text-xs text-gray-400 border-b border-gray-200 pb-2 mb-2 font-mono">
                    <span>{formatDate(minDate)}</span>
                    <span>{formatDate(minDate + totalDuration * 0.25)}</span>
                    <span>{formatDate(minDate + totalDuration * 0.5)}</span>
                    <span>{formatDate(minDate + totalDuration * 0.75)}</span>
                    <span>{formatDate(maxDate)}</span>
                </div>

                {/* Grid Background */}
                <div className="absolute top-8 bottom-0 left-0 right-0 flex justify-between pointer-events-none z-0">
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                </div>

                {/* Tasks */}
                <div className="space-y-3 relative z-10">
                    {tasks.map((task, i) => {
                        const start = new Date(task.start).getTime();
                        const end = new Date(task.end).getTime();
                        const offset = ((start - minDate) / totalDuration) * 100;
                        const width = ((end - start) / totalDuration) * 100;
                        // Ensure width is at least visible
                        const displayWidth = Math.max(width, 2); 

                        return (
                            <div key={task.id} className="group relative">
                                <div 
                                    className="h-8 rounded bg-indigo-100 border border-indigo-300 flex items-center px-2 hover:bg-indigo-200 transition-colors cursor-pointer"
                                    style={{ 
                                        marginLeft: `${offset}%`, 
                                        width: `${displayWidth}%` 
                                    }}
                                    title={`${task.name} (${task.start} - ${task.end})`}
                                >
                                    <span className="text-xs font-semibold text-indigo-900 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {task.name}
                                    </span>
                                </div>
                                {/* Tooltip on Hover */}
                                <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-20 whitespace-nowrap">
                                    {task.name}<br/>
                                    <span className="text-gray-400">{task.start} to {task.end}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const StrategyBriefs: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigateToModule, navigationPayload, clearNavigationPayload } = useProject();
    const [isLoading, setIsLoading] = useState(false);
    const [campaignGoal, setCampaignGoal] = useState('');
    const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state here

    const briefs = activeProject?.strategyBriefs || [];
    const personas = activeProject?.personas || [];
    
    useEffect(() => {
        if (navigationPayload?.briefId) {
            setSelectedBriefId(navigationPayload.briefId);
            setIsDetailOpen(true);
            clearNavigationPayload();
        }
    }, [navigationPayload, clearNavigationPayload]);

    const handleGenerate = async () => {
        if (!activeProject || !campaignGoal) return;
        setIsLoading(true);
        try {
            const briefData = await geminiService.generateStrategyBrief(activeProject, campaignGoal);
            const newBrief: StrategyBrief = {
                ...briefData,
                id: crypto.randomUUID(),
            };
            updateActiveProject(p => ({ ...p, strategyBriefs: [newBrief, ...p.strategyBriefs] }));
            logActivity(`Generated strategy brief for goal: "${campaignGoal}"`, 'strategy-briefs', newBrief);
            setCampaignGoal('');
            setIsModalOpen(false); // Close modal on success
            setSelectedBriefId(newBrief.id);
            setIsDetailOpen(true);
        } catch (error) {
            console.error("Failed to generate brief", error);
        } finally {
            setIsLoading(false);
        }
    };

    const selectedBrief = briefs.find(b => b.id === selectedBriefId);
    const targetPersona = personas.find(p => p.id === selectedBrief?.targetPersonaId);

    return (
        <ToolShell moduleId="strategy-briefs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Section title="Create New Brief" description="Define a high-level goal and let AI create a comprehensive campaign plan.">
                         <Button onClick={() => setIsModalOpen(true)} className="w-full">Generate New Brief</Button>
                    </Section>

                    <Section title="Brief Library" description="Your saved strategies.">
                        {briefs.length > 0 ? (
                            <div className="space-y-2">
                                {briefs.map(brief => (
                                    <button 
                                        key={brief.id} 
                                        onClick={() => { setSelectedBriefId(brief.id); setIsDetailOpen(true); }}
                                        className="w-full text-left p-3 bg-white rounded-md border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        <p className="font-semibold text-gray-800 truncate">{brief.campaignGoal}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Targeting: {personas.find(p => p.id === brief.targetPersonaId)?.name || 'Unknown'}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No briefs generated yet.</p>
                        )}
                    </Section>
                </div>

                <div className="lg:col-span-2">
                    <div className="h-full flex items-center justify-center text-gray-400 bg-white/50 rounded-lg border border-dashed border-gray-300 min-h-[400px]">
                         <p>Generate a brief or select one to view details.</p>
                    </div>
                </div>
            </div>

             {/* Creation Modal */}
             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate New Strategy Brief">
                 <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Goal</label>
                        <textarea 
                            value={campaignGoal} 
                            onChange={e => setCampaignGoal(e.target.value)} 
                            rows={3}
                            className="w-full bg-white border border-gray-300 rounded-md text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            placeholder="e.g., Increase brand awareness among small business owners in Q4."
                        />
                    </div>
                    <SuggestionGenerator 
                        preloadedSuggestions={activeProject?.suggestions?.campaignGoals || []}
                        generationFn={() => geminiService.suggestCampaignObjectives(activeProject!)}
                        onSelect={(val) => setCampaignGoal(val)}
                        buttonText="Suggest Goals"
                    />
                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <Button onClick={handleGenerate} isLoading={isLoading} disabled={!campaignGoal}>Generate Brief</Button>
                    </div>
                 </div>
             </Modal>

            {/* Drawer for Brief Details */}
            <Drawer 
                isOpen={isDetailOpen} 
                onClose={() => setIsDetailOpen(false)} 
                title="Strategy Brief"
                subtitle={selectedBrief?.campaignGoal}
                width="2xl"
            >
                {selectedBrief && (
                    <div className="space-y-8 animate-slide-in-up">
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                            <h3 className="text-lg font-bold text-indigo-900 mb-2">Strategic Alignment</h3>
                            <p className="text-sm text-indigo-800">{selectedBrief.strategicAlignment}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                Target Audience
                            </h3>
                            {targetPersona ? (
                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <p className="font-semibold text-gray-800">{targetPersona.name}</p>
                                    <p className="text-sm text-gray-600">{targetPersona.role}</p>
                                </div>
                            ) : <p className="text-sm text-gray-500">Persona data not found.</p>}
                        </div>

                         <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Messaging</h3>
                            <div className="grid gap-4">
                                {selectedBrief.keyMessaging.map((msg, i) => {
                                    const messageText = typeof msg === 'string' ? msg : msg.message;
                                    const alignment = typeof msg === 'object' ? msg.personaAlignment : null;
                                    return (
                                        <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-800 font-medium">"{messageText}"</p>
                                            {alignment && <p className="text-xs text-gray-500 mt-2 border-t pt-2">Why: {alignment}</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Competitor Angle</h3>
                            <Card className="p-4 bg-gray-50 border-l-4 border-teal-500">
                                <p className="text-sm text-gray-700">{selectedBrief.competitorAngle}</p>
                            </Card>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Action Plan</h3>
                            <div className="space-y-4">
                                {selectedBrief.recommendedActions.map((action, i) => (
                                    <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-800">{action.title}</h4>
                                            {action.callToAction && (
                                                 <Button 
                                                    size="sm" 
                                                    variant="ghost" 
                                                    className="text-indigo-600 hover:bg-indigo-50"
                                                    onClick={() => {
                                                        let payload = action.callToAction!.payload;
                                                        try { payload = JSON.parse(payload); } catch {}
                                                        navigateToModule(action.callToAction!.moduleId, payload);
                                                    }}
                                                >
                                                    {action.callToAction.text} &rarr;
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{action.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Campaign Timeline (Gantt)</h3>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <GanttChart tasks={selectedBrief.campaignTimeline} />
                            </div>
                        </div>
                        
                        {selectedBrief.kpiAndMeasurement && (
                             <div className="bg-gray-800 text-white p-6 rounded-lg">
                                <h3 className="text-lg font-bold text-white mb-4">Success Measurement</h3>
                                <div className="mb-4">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Primary KPIs</p>
                                    <ul className="list-disc list-inside text-sm mt-1">
                                        {selectedBrief.kpiAndMeasurement.primaryKPIs.map((kpi, i) => <li key={i}>{kpi}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Measurement Plan</p>
                                    <p className="text-sm mt-1 text-gray-300">{selectedBrief.kpiAndMeasurement.measurementPlan}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Drawer>
        </ToolShell>
    );
};

export default StrategyBriefs;