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
                emails: emailsData.map(e => ({...e, id: crypto.randomUUID()})),
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
                            <Button onClick={handleGenerate} isLoading={isLoading} disabled={!campaignName || !campaignGoal || !selectedPersonaId}>Generate 3-Email Sequence</Button>
                        </div>
                    </Section>

                     <Section title="2. Campaign Library" description="Review and manage your generated email campaigns.">
                        <ul className="space-y-2">
                             {campaigns.map(c => (
                                <li key={c.id}>
                                    <button 
                                        onClick={() => setSelectedCampaign(c)} 
                                        className={`w-full text-left p-3 rounded-md ${selectedCampaign?.id === c.id ? 'bg-primary' : 'bg-surface hover:bg-border'}`}
                                        aria-current={selectedCampaign?.id === c.id}
                                    >
                                        <p className="font-semibold text-white truncate">{c.name}</p>
                                        <p className="text-xs text-indigo-200">For: {getPersonaById(c.personaId)?.name || 'N/A'}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Section>
                </div>
                <div className="lg:col-span-2">
                   <Section title="3. Campaign Preview" description="Here are the generated emails for your campaign.">
                        <div className="min-h-[600px]">
                           {isLoading && <div className="flex justify-center p-8"><Spinner size={40} showMessages/></div>}
                           {!isLoading && selectedCampaign ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedCampaign.name}</h3>
                                        <p className="text-indigo-300">Goal: {selectedCampaign.goal}</p>
                                        <p className="text-gray-400 text-sm">Targeting: <span className="font-semibold">{getPersonaById(selectedCampaign.personaId)?.name}</span></p>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedCampaign.emails.map((email, index) => (
                                            <Card key={email.id} className="p-4 bg-gray-900/50">
                                                <p className="text-sm font-semibold text-gray-400 mb-2">EMAIL {index + 1} of {selectedCampaign.emails.length}</p>
                                                <h4 className="font-semibold text-white mb-1"><span className="text-gray-300">Subject:</span> {email.subject}</h4>
                                                <div className="border-t border-border my-2"></div>
                                                <p className="text-sm text-gray-200 whitespace-pre-wrap font-serif">{email.body}</p>
                                            </Card>
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