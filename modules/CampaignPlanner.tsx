import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Section from '../components/Section';

const CampaignPlanner: React.FC = () => {
    const { activeProject, navigateToModule } = useProject();

    if (!activeProject) {
        return <ToolShell moduleId="campaign-planner"><p>No active project.</p></ToolShell>;
    }

    const { strategyBriefs, emailCampaigns, personas } = activeProject;
    
    const getPersonaName = (id: string) => personas.find(p => p.id === id)?.name || 'N/A';

    return (
        <ToolShell moduleId="campaign-planner">
            <div className="space-y-8">
                <Section 
                    title="Strategic Briefs" 
                    description="High-level plans for your marketing campaigns. Click to view details in the Strategy Briefs module."
                >
                    <div className="space-y-4">
                        {strategyBriefs.length > 0 ? (
                            strategyBriefs.map(brief => (
                                <Card key={brief.id} className="p-4 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-white">{brief.campaignGoal}</h4>
                                        <p className="text-sm text-text-muted">Targeting: {getPersonaName(brief.targetPersonaId)}</p>
                                    </div>
                                    <Button size="sm" variant="secondary" onClick={() => navigateToModule('strategy-briefs', { briefId: brief.id })}>
                                        View Brief
                                    </Button>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-text-muted py-4">No strategy briefs have been generated yet.</p>
                        )}
                    </div>
                </Section>
                
                <Section 
                    title="Email Campaigns" 
                    description="Generated email sequences for nurturing and engagement. Click to view details in the Email Campaigner module."
                >
                    <div className="space-y-4">
                        {emailCampaigns.length > 0 ? (
                            emailCampaigns.map(campaign => (
                                <Card key={campaign.id} className="p-4 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-white">{campaign.name}</h4>
                                        <p className="text-sm text-text-muted">Goal: {campaign.goal}</p>
                                        <p className="text-sm text-text-muted">Targeting: {getPersonaName(campaign.personaId)}</p>
                                    </div>
                                    <Button size="sm" variant="secondary" onClick={() => navigateToModule('email-campaigner', { campaignId: campaign.id })}>
                                        View Campaign
                                    </Button>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-text-muted py-4">No email campaigns have been generated yet.</p>
                        )}
                    </div>
                </Section>
            </div>
        </ToolShell>
    );
};

export default CampaignPlanner;
