import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import * as geminiService from '../services/geminiService';
import { Persona, CxStage } from '../types';
import Section from '../components/Section';
import Drawer from '../components/Drawer';
import SuggestionGenerator from '../components/SuggestionGenerator';

const CxMapViewer: React.FC<{ stages: CxStage[] }> = ({ stages }) => {
    if (!stages || stages.length === 0) return <p className="text-gray-500">No journey map data available.</p>;

    return (
        <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-[800px]">
                {stages.map((stage, i) => (
                    <Card key={i} className="w-64 flex-shrink-0 p-4 flex flex-col bg-white border-t-4 border-indigo-500 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 text-lg">{stage.name}</h4>

                        <div className="space-y-4 flex-grow">
                            <div>
                                <p className="text-xs font-bold text-indigo-400 uppercase mb-1">Touchpoints</p>
                                <ul className="list-disc list-inside text-xs text-gray-600">
                                    {stage.touchpoints.map((t, j) => <li key={j}>{t}</li>)}
                                </ul>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-indigo-400 uppercase mb-1">Emotions</p>
                                <div className="flex flex-wrap gap-1">
                                    {stage.emotions.map((e, j) => (
                                        <span key={j} className="text-xs bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">{e}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Friction</p>
                                <ul className="list-disc list-inside text-xs text-gray-600">
                                    {stage.frictionPoints.map((f, j) => <li key={j}>{f}</li>)}
                                </ul>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-400 uppercase mb-1">Opportunities</p>
                                <ul className="list-disc list-inside text-xs text-gray-600">
                                    {stage.opportunities.map((o, j) => <li key={j}>{o}</li>)}
                                </ul>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const PersonaLab: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigateToModule } = useProject();
    const [isLoading, setIsLoading] = useState(false);

    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<'view' | 'create'>('view');
    const [createMode, setCreateMode] = useState<'single' | 'batch'>('single');

    // Creation State (Single)
    const [role, setRole] = useState('');
    const [goals, setGoals] = useState('');
    const [painPoints, setPainPoints] = useState('');

    // Creation State (Batch)
    const [batchCount, setBatchCount] = useState(3);
    const [batchCriteria, setBatchCriteria] = useState({ roles: '', goals: '', painPoints: '' });

    const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const personas = activeProject?.personas || [];
    const selectedPersona = personas.find(p => p.id === selectedPersonaId);

    const handleOpenCreate = (mode: 'single' | 'batch' = 'single') => {
        setCreateMode(mode);
        setDrawerMode('create');
        setIsDrawerOpen(true);
    };

    const handleViewPersona = (id: string) => {
        setSelectedPersonaId(id);
        setDrawerMode('view');
        setIsDrawerOpen(true);
    };

    const handleGenerateSingle = async () => {
        if (!activeProject) return;
        setIsLoading(true);
        try {
            const criteria = { role, goals: goals.split(','), painPoints: painPoints.split(',') };
            const newPersona = await geminiService.createPersonaWithCxMap(activeProject, criteria);

            updateActiveProject(p => ({ ...p, personas: [...p.personas, newPersona] }));
            logActivity(`Created persona: ${newPersona.name} (${newPersona.role})`, 'audience', newPersona);

            handleViewPersona(newPersona.id);
            setRole(''); setGoals(''); setPainPoints('');
        } catch (error) {
            console.error("Failed to generate persona", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateBatch = async () => {
        if (!activeProject) return;
        setIsLoading(true);
        try {
            const criteria = {
                roles: batchCriteria.roles ? batchCriteria.roles.split(',') : [],
                goals: batchCriteria.goals ? batchCriteria.goals.split(',') : [],
                painPoints: batchCriteria.painPoints ? batchCriteria.painPoints.split(',') : []
            };
            const newPersonas = await geminiService.generatePersonaBatch(activeProject, criteria, batchCount);
            const personasWithIds = newPersonas.map(p => ({ ...p, id: crypto.randomUUID() }));

            updateActiveProject(p => ({ ...p, personas: [...p.personas, ...personasWithIds] }));
            logActivity(`Batch generated ${batchCount} personas`, 'audience', personasWithIds);

            setIsDrawerOpen(false);
            setBatchCriteria({ roles: '', goals: '', painPoints: '' });
        } catch (error) {
            console.error("Failed to batch generate personas", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlanContent = (persona: Persona) => {
        navigateToModule('keyword-strategist', { personaId: persona.id });
    };

    const filteredPersonas = personas.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    // Colors for avatars
    const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];

    return (
        <ToolShell moduleId="audience">
            <div className="space-y-6">
                {/* Top Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search personas..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => handleOpenCreate('batch')}>Batch Generate</Button>
                        <Button onClick={() => handleOpenCreate('single')}>Create New Persona</Button>
                    </div>
                </div>

                {/* Persona Grid */}
                {filteredPersonas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPersonas.map((p, idx) => (
                            <Card
                                key={p.id}
                                className="p-6 flex flex-col items-center text-center cursor-pointer hover:border-primary transition-all group"
                                onClick={() => handleViewPersona(p.id)}
                            >
                                <div className={`w-20 h-20 rounded-full ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                                    {getInitials(p.name)}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                                <p className="text-sm text-indigo-600 font-medium mb-2">{p.role}</p>

                                {p.strategicFit !== undefined && (
                                    <div className="flex items-center gap-1.5 mb-4">
                                        <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${p.strategicFit > 80 ? 'bg-google-green' : p.strategicFit > 50 ? 'bg-google-yellow' : 'bg-google-red'}`}
                                                style={{ width: `${p.strategicFit}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">{p.strategicFit}% Fit</span>
                                    </div>
                                )}

                                <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                    {p.goals.slice(0, 2).map((g, i) => (
                                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full truncate max-w-[120px]">{g}</span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="mx-auto h-16 w-16 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No personas yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating your first target audience profile.</p>
                        <div className="mt-6">
                            <Button onClick={() => handleOpenCreate('single')}>Create Persona</Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Drawer for Create/View */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title={drawerMode === 'create' ? (createMode === 'single' ? "Create New Persona" : "Batch Generate Personas") : "Persona Insights"}
                subtitle={drawerMode === 'create' ? (createMode === 'single' ? "Define a role, or let AI generate one." : "Generate multiple profiles at once.") : "AI-generated profile & journey map"}
                width={drawerMode === 'view' ? '4xl' : 'lg'}
                footer={drawerMode === 'create' ? (
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                        <Button onClick={createMode === 'single' ? handleGenerateSingle : handleGenerateBatch} isLoading={isLoading} disabled={createMode === 'single' ? !role : false}>
                            {createMode === 'single' ? 'Create Persona' : `Generate Batch (${batchCount})`}
                        </Button>
                    </div>
                ) : null}
            >
                {drawerMode === 'create' ? (
                    <div className="space-y-6">
                        {/* Mode Toggle */}
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setCreateMode('single')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${createMode === 'single' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Single Persona
                            </button>
                            <button
                                onClick={() => setCreateMode('batch')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${createMode === 'batch' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Batch Generate
                            </button>
                        </div>

                        {createMode === 'single' ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role / Segment</label>
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        placeholder="e.g., Marketing Manager"
                                        className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900 p-2"
                                    />
                                    <SuggestionGenerator
                                        preloadedSuggestions={activeProject?.suggestions?.personaRoles || []}
                                        onSelect={(val) => setRole(val)}
                                        buttonText="Suggest Roles"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goals (Optional)</label>
                                    <textarea
                                        rows={2}
                                        value={goals}
                                        onChange={e => setGoals(e.target.value)}
                                        placeholder="e.g., Increase ROI, Save Time"
                                        className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900 p-2"
                                    />
                                    <SuggestionGenerator
                                        generationFn={() => geminiService.suggestPersonaGoals(activeProject!, role)}
                                        onSelect={(val) => setGoals(prev => prev ? `${prev}, ${val}` : val)}
                                        dependencies={[role]}
                                        buttonText="Suggest Goals"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pain Points (Optional)</label>
                                    <textarea
                                        rows={2}
                                        value={painPoints}
                                        onChange={e => setPainPoints(e.target.value)}
                                        placeholder="e.g., Limited budget, fragmented data"
                                        className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900 p-2"
                                    />
                                    <SuggestionGenerator
                                        generationFn={() => geminiService.suggestPersonaPainPoints(activeProject!, role, goals)}
                                        onSelect={(val) => setPainPoints(prev => prev ? `${prev}, ${val}` : val)}
                                        dependencies={[role, goals]}
                                        buttonText="Suggest Pain Points"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Personas</label>
                                    <select
                                        value={batchCount}
                                        onChange={e => setBatchCount(parseInt(e.target.value))}
                                        className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900 p-2"
                                    >
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Roles / Segments (Optional)</label>
                                    <input
                                        type="text"
                                        value={batchCriteria.roles}
                                        onChange={e => setBatchCriteria({ ...batchCriteria, roles: e.target.value })}
                                        placeholder="e.g., Small Business Owners, Enterprise Execs"
                                        className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900 p-2"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Leave blank to let AI decide based on your project foundation.</p>
                                    <SuggestionGenerator
                                        preloadedSuggestions={activeProject?.suggestions?.personaRoles || []}
                                        onSelect={(val) => setBatchCriteria({ ...batchCriteria, roles: batchCriteria.roles ? `${batchCriteria.roles}, ${val}` : val })}
                                        buttonText="Suggest Segments"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Common Goals (Optional)</label>
                                    <input
                                        type="text"
                                        value={batchCriteria.goals}
                                        onChange={e => setBatchCriteria({ ...batchCriteria, goals: e.target.value })}
                                        placeholder="e.g., Growth, Efficiency"
                                        className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900 p-2"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    selectedPersona ? (
                        <div className="space-y-6 animate-slide-in-up">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold`}>
                                        {getInitials(selectedPersona.name)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedPersona.name}</h2>
                                        <p className="text-lg text-indigo-600">{selectedPersona.role}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="secondary" onClick={() => handlePlanContent(selectedPersona)}>Plan Strategy</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="p-6 bg-green-50 border-green-100 shadow-none">
                                    <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">Goals</h3>
                                    <ul className="space-y-2">
                                        {selectedPersona.goals.map((goal, i) => (
                                            <li key={i} className="text-sm text-green-900 flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
                                                {goal}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                                <Card className="p-6 bg-red-50 border-red-100 shadow-none">
                                    <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">Pain Points</h3>
                                    <ul className="space-y-2">
                                        {selectedPersona.painPoints.map((point, i) => (
                                            <li key={i} className="text-sm text-red-900 flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>

                            {selectedPersona.psychologicalProfile && (
                                <Section title="Psychological Intelligence" description="Understanding motivators, tactics, and biases.">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-google-blue uppercase tracking-widest flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">psychology</span>
                                                Core Motivators
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedPersona.psychologicalProfile.motivators.map((m, i) => (
                                                    <li key={i} className="text-sm text-gray-600 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">{m}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-google-green uppercase tracking-widest flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">campaign</span>
                                                Persuasion Tactics
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedPersona.psychologicalProfile.persuasionTactics.map((t, i) => (
                                                    <li key={i} className="text-sm text-gray-600 bg-green-50/50 p-3 rounded-xl border border-green-100/50">{t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-google-red uppercase tracking-widest flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">visibility_off</span>
                                                Cognitive Biases
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedPersona.psychologicalProfile.cognitiveBiases.map((b, i) => (
                                                    <li key={i} className="text-sm text-gray-600 bg-red-50/50 p-3 rounded-xl border border-red-100/50">{b}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Section>
                            )}

                            <Section title="Customer Journey Map" description="Visualizing the path from awareness to loyalty.">
                                <CxMapViewer stages={selectedPersona.cxMap.stages} />
                            </Section>
                        </div>
                    ) : <p>Select a persona.</p>
                )}
            </Drawer>
        </ToolShell>
    );
};

export default PersonaLab;