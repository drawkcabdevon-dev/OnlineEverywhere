import React, { useMemo, useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Section from '../components/Section';
import GanttChart from '../components/GanttChart';
import { CampaignTask } from '../types';

const CampaignPlanner: React.FC = () => {
    const { activeProject, navigateToModule } = useProject();
    const [selectedBriefId, setSelectedBriefId] = useState<string | 'all'>('all');

    if (!activeProject) {
        return <ToolShell moduleId="campaign-planner"><p>No active project.</p></ToolShell>;
    }

    const { strategyBriefs, emailCampaigns, personas } = activeProject;

    const getPersonaName = (id: string) => personas.find(p => p.id === id)?.name || 'N/A';

    // Aggregate all tasks from strategic briefs
    const allTasks = useMemo(() => {
        let tasks: CampaignTask[] = [];
        strategyBriefs.forEach(brief => {
            if (selectedBriefId === 'all' || brief.id === selectedBriefId) {
                // Add brief name context to task name for clarity in master view
                const briefTasks = brief.campaignTimeline.map(t => ({
                    ...t,
                    name: selectedBriefId === 'all' ? `[${brief.campaignGoal.substring(0, 15)}...] ${t.name}` : t.name
                }));
                tasks = [...tasks, ...briefTasks];
            }
        });
        // Sort by start date
        return tasks.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    }, [strategyBriefs, selectedBriefId]);

    return (
        <ToolShell moduleId="campaign-planner">
            <div className="space-y-8 animate-slide-in-up">

                {/* Master Timeline */}
                <Section title="Master Campaign Timeline" description="Visualizing your strategic roadmap across all campaigns.">
                    <Card className="p-6 bg-white border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {selectedBriefId === 'all' ? 'All Campaigns' : strategyBriefs.find(b => b.id === selectedBriefId)?.campaignGoal}
                            </h3>
                            <select
                                value={selectedBriefId}
                                onChange={(e) => setSelectedBriefId(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
                            >
                                <option value="all">Check All Schedules</option>
                                {strategyBriefs.map(b => (
                                    <option key={b.id} value={b.id}>{b.campaignGoal}</option>
                                ))}
                            </select>
                        </div>

                        {allTasks.length > 0 ? (
                            <GanttChart tasks={allTasks} className="pb-4" />
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <p className="text-gray-500 mb-2">No timeline data available.</p>
                                <Button size="sm" onClick={() => navigateToModule('strategy-briefs')}>Generate a Strategy Brief</Button>
                            </div>
                        )}
                    </Card>
                </Section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Section
                        title="Strategic Briefs"
                        description="Active strategic plans."
                    >
                        <div className="space-y-3">
                            {strategyBriefs.slice(0, 3).map(brief => (
                                <Card key={brief.id} className="p-4 flex justify-between items-center bg-indigo-50/50 border-indigo-100">
                                    <div className="overflow-hidden">
                                        <h4 className="font-semibold text-indigo-900 truncate pr-4">{brief.campaignGoal}</h4>
                                        <p className="text-xs text-indigo-600">Targeting: {getPersonaName(brief.targetPersonaId)}</p>
                                    </div>
                                    <Button size="sm" variant="ghost" onClick={() => navigateToModule('strategy-briefs', { briefId: brief.id })}>
                                        Details &rarr;
                                    </Button>
                                </Card>
                            ))}
                            {strategyBriefs.length === 0 && <p className="text-sm text-gray-500 italic">No briefs yet.</p>}
                            <Button variant="secondary" className="w-full mt-2" onClick={() => navigateToModule('strategy-briefs')}>Create New Strategy</Button>
                        </div>
                    </Section>

                    <Section
                        title="Email Campaigns"
                        description="Nurture sequences."
                    >
                        <div className="space-y-3">
                            {emailCampaigns.slice(0, 3).map(campaign => (
                                <Card key={campaign.id} className="p-4 flex justify-between items-center bg-green-50/50 border-green-100">
                                    <div>
                                        <h4 className="font-semibold text-green-900">{campaign.name}</h4>
                                        <p className="text-xs text-green-600">Goal: {campaign.goal}</p>
                                    </div>
                                    <Button size="sm" variant="ghost" onClick={() => navigateToModule('email-campaigner', { campaignId: campaign.id })}>
                                        Details &rarr;
                                    </Button>
                                </Card>
                            ))}
                            {emailCampaigns.length === 0 && <p className="text-sm text-gray-500 italic">No email campaigns yet.</p>}
                            <Button variant="secondary" className="w-full mt-2" onClick={() => navigateToModule('email-campaigner')}>Create New Campaign</Button>
                        </div>
                    </Section>
                </div>
            </div>
        </ToolShell>
    );
};

export default CampaignPlanner;
