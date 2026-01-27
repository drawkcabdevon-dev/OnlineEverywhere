import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { EmailCampaign, Persona } from '../types';
import Section from '../components/Section';

const EmailCampaigner: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity } = useProject();
    const [isLoading, setIsLoading] = useState(false);
    const [campaignName, setCampaignName] = useState('');
    const [campaignGoal, setCampaignGoal] = useState('');
    const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
    const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);

    const personas = activeProject?.personas || [];
    const campaigns = activeProject?.emailCampaigns || [];

    const handleGenerate = async () => {
        if (!activeProject || !campaignName || !campaignGoal || !selectedPersonaId) return;

        const persona = personas.find(p => p.id === selectedPersonaId);
        if (!persona) return;

        setIsLoading(true);
        try {
            const emailsData = await geminiService.generateEmailCampaign(activeProject, campaignGoal, persona, 3);

            const newCampaign: EmailCampaign = {
                id: crypto.randomUUID(),
                name: campaignName,
                goal: campaignGoal,
                personaId: selectedPersonaId,
                emails: emailsData.map(e => ({ ...e, id: crypto.randomUUID() })),
                template: selectedTemplate,
            };

            updateActiveProject(p => ({ ...p, emailCampaigns: [...p.emailCampaigns, newCampaign] }));
            logActivity(`Generated email campaign: "${campaignName}"`, 'email-campaigner', newCampaign);

            setSelectedCampaign(newCampaign);
            setCampaignName('');
            setCampaignGoal('');
            setSelectedPersonaId(null);

        } catch (error) {
            console.error("Failed to generate email campaign", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPersonaById = (id: string) => personas.find(p => p.id === id);

    const [selectedTemplate, setSelectedTemplate] = useState<'plain' | 'modern' | 'urgent'>('modern');
    const [sendingState, setSendingState] = useState<{ campaignId: string; progress: number } | null>(null);

    const handleLaunch = (campaignId: string) => {
        setSendingState({ campaignId, progress: 0 });

        // Simulate sending process
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setSendingState({ campaignId, progress });

            if (progress >= 100) {
                clearInterval(interval);
                setSendingState(null);
                updateActiveProject(p => ({
                    ...p,
                    emailCampaigns: p.emailCampaigns.map(c =>
                        c.id === campaignId
                            ? {
                                ...c,
                                status: 'sent',
                                stats: {
                                    sent: 1250,
                                    opened: Math.floor(Math.random() * 500) + 200,
                                    clicked: Math.floor(Math.random() * 100) + 20
                                }
                            }
                            : c
                    )
                }));
                // Refresh selection if needed
                if (selectedCampaign?.id === campaignId) {
                    setSelectedCampaign(current => current ? { ...current, status: 'sent' } : null);
                }
            }
        }, 500);
    };

    const getTemplateStyle = (template?: string) => {
        switch (template) {
            case 'plain': return 'font-mono text-sm bg-gray-50 text-gray-900 border-l-4 border-gray-400';
            case 'urgent': return 'bg-red-50 border border-red-200 text-gray-900 font-bold';
            case 'modern':
            default: return 'bg-white border border-gray-200 text-gray-800 font-sans shadow-sm';
        }
    };

    return (
        <ToolShell moduleId="email-campaigner">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Section title="1. Create New Campaign" description="Define your goal, select a target persona, and let the AI craft a tailored email sequence.">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-300">Campaign Name</label>
                                <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="e.g., New User Welcome Sequence" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-300">Campaign Goal</label>
                                <textarea rows={3} value={campaignGoal} onChange={e => setCampaignGoal(e.target.value)} placeholder="e.g., Nurture new sign-ups and guide them to their 'aha!' moment in the first week." className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-300">Template Style</label>
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value as any)}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white"
                                >
                                    <option value="modern">Modern Professional</option>
                                    <option value="plain">Plain Text (Personal)</option>
                                    <option value="urgent">Urgent / Alert</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Target Persona</label>
                                {personas.length > 0 ? (
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                        {personas.map((p: Persona) => (
                                            <button key={p.id} onClick={() => setSelectedPersonaId(p.id)} className={`w-full text-left p-3 rounded-md border-2 transition-colors ${selectedPersonaId === p.id ? 'bg-primary/20 border-primary' : 'bg-surface border-border hover:border-gray-500'}`}>
                                                <p className="font-semibold text-white">{p.name}</p>
                                                <p className="text-xs text-text-muted">{p.role}</p>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-yellow-400 bg-yellow-900/20 p-3 rounded-md">Please create a persona in the PersonaLab first.</p>
                                )}
                            </div>
                            <Button onClick={handleGenerate} isLoading={isLoading} disabled={!campaignName || !campaignGoal || !selectedPersonaId}>Generate Sequence</Button>
                        </div>
                    </Section>

                    <Section title="2. Campaign Library" description="Review and manage your generated email campaigns.">
                        <ul className="space-y-2">
                            {campaigns.map(c => (
                                <li key={c.id}>
                                    <button
                                        onClick={() => setSelectedCampaign(c)}
                                        className={`w-full text-left p-3 rounded-md border ${selectedCampaign?.id === c.id ? 'bg-indigo-900/50 border-indigo-500' : 'bg-surface border-transparent hover:border-gray-600'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold text-white truncate">{c.name}</p>
                                            {c.status === 'sent' && <span className="text-[10px] bg-green-900 text-green-300 px-1.5 py-0.5 rounded">SENT</span>}
                                        </div>
                                        <p className="text-xs text-text-muted mt-1">For: {getPersonaById(c.personaId)?.name || 'N/A'}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Section>
                </div>
                <div className="lg:col-span-2">
                    <Section title="3. Campaign Workbench" description="Review drafts, edit content, and launch your campaign.">
                        <div className="min-h-[600px]">
                            {isLoading && <div className="flex justify-center p-8"><Spinner size={40} showMessages /></div>}
                            {!isLoading && selectedCampaign ? (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{selectedCampaign.name}</h3>
                                            <p className="text-indigo-300">Goal: {selectedCampaign.goal}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-gray-400 text-sm">Targeting: <span className="font-semibold">{getPersonaById(selectedCampaign.personaId)?.name}</span></p>
                                                <span className="text-gray-600">•</span>
                                                <p className="text-gray-400 text-sm">Style: <span className="capitalize">{selectedCampaign.template || 'Modern'}</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            {selectedCampaign.status === 'sent' ? (
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-green-400">{((selectedCampaign.stats?.opened || 0) / (selectedCampaign.stats?.sent || 1) * 100).toFixed(1)}%</div>
                                                    <p className="text-xs text-gray-500 uppercase">Open Rate</p>
                                                </div>
                                            ) : (
                                                sendingState?.campaignId === selectedCampaign.id ? (
                                                    <div className="w-32">
                                                        <div className="text-xs text-center text-indigo-400 mb-1">Sending... {sendingState.progress}%</div>
                                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                                            <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{ width: `${sendingState.progress}%` }}></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button onClick={() => handleLaunch(selectedCampaign.id)}>🚀 Launch Campaign</Button>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {selectedCampaign.status === 'sent' && (
                                        <div className="grid grid-cols-3 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-white">{selectedCampaign.stats?.sent}</p>
                                                <p className="text-xs text-gray-500 uppercase">Emails Sent</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-white">{selectedCampaign.stats?.opened}</p>
                                                <p className="text-xs text-gray-500 uppercase">Opened</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-white">{selectedCampaign.stats?.clicked}</p>
                                                <p className="text-xs text-gray-500 uppercase">Clicked</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        {selectedCampaign.emails.map((email, index) => (
                                            <div key={email.id} className={`p-6 rounded-lg shadow-sm ${getTemplateStyle(selectedCampaign.template)}`}>
                                                <div className="flex justify-between items-center mb-4 border-b border-gray-200/50 pb-2">
                                                    <p className="text-xs font-bold uppercase tracking-wider opacity-50">Email {index + 1}</p>
                                                    <div className="space-x-2">
                                                        <span className="text-xs opacity-50 cursor-pointer hover:opacity-100">Edit</span>
                                                        <span className="text-xs opacity-50 cursor-pointer hover:opacity-100">Copy</span>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <span className="font-semibold opacity-70 mr-2">Subject:</span>
                                                    <span className="font-medium text-lg">{email.subject}</span>
                                                </div>
                                                <div className="whitespace-pre-wrap leading-relaxed opacity-90">
                                                    {email.body}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                !isLoading && <div className="flex items-center justify-center h-full text-gray-400">Select or generate a campaign to view it here.</div>
                            )}
                        </div>
                    </Section>
                </div>
            </div>
        </ToolShell>
    );
};

export default EmailCampaigner;