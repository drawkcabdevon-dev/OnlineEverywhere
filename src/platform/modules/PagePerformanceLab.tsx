import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { SeoAuditResult, SeoAction, PersonalizationOpportunity, SeoIssue, ZeroClickAnalysis, AiSearchLayerAnalysis } from '../types';
import Modal from '../components/Modal';
import Section from '../components/Section';
import CodeBlock from '../components/CodeBlock';

const ScoreCircle: React.FC<{ score: number; label: string }> = ({ score, label }) => {
    const getScoreColor = () => {
        if (score >= 90) return 'text-green-400 border-green-400';
        if (score >= 50) return 'text-yellow-400 border-yellow-400';
        return 'text-red-400 border-red-400';
    };

    return (
        <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${getScoreColor()}`}>
                <span className="text-3xl font-bold">{score}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-300">{label}</p>
        </div>
    );
};

const StatusIcon: React.FC<{ status: 'Pass' | 'Fail' | 'Warning' }> = ({ status }) => {
    switch (status) {
        case 'Pass':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'Fail':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'Warning':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
        default:
            return null;
    }
};

const ActionPlanCard: React.FC<{ action: SeoAction | ZeroClickAnalysis['recommendations'][0], step: string }> = ({ action, step }) => {
    const { navigateToModule } = useProject();
    const canBuild = action.isGenerative;

    const handleBuild = () => {
        let prompt = `Fulfill the following SEO recommendation: "${action.title}. ${action.description}"`;
        let mode: 'qa' | 'article' = 'qa';
        if (action.title.toLowerCase().includes('faq')) {
            mode = 'qa';
        }
        navigateToModule('content-creator', { topic: prompt, mode });
    };

    return (
        <Card className="p-4 bg-surface flex items-start space-x-4">
            <div className="flex-shrink-0 bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">{step}</div>
            <div className="flex-grow">
                <h4 className="font-semibold text-white">{action.title}</h4>
                <p className="text-sm text-text-muted mt-1 font-serif">{action.description}</p>
                {canBuild && (
                    <div className="mt-3">
                        <Button size="sm" variant="ghost" onClick={handleBuild}>Create in Content Creator</Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

const AiSearchLayerCard: React.FC<{ title: string, fullName: string, analysis: { score: number; justification: string } }> = ({ title, fullName, analysis }) => {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <Card className="p-4 bg-gray-900/50">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-white">{title}</h4>
                    <p className="text-xs text-text-muted">{fullName}</p>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>{analysis.score}/100</div>
            </div>
            <p className="text-sm text-text-muted mt-3 pt-3 border-t border-border/50 font-serif">{analysis.justification}</p>
        </Card>
    );
};


const PagePerformanceLab: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigateToModule } = useProject();
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState(activeProject?.seoAudit?.auditedUrl || 'https://www.example.com/ai-marketing-guide');
    const [isFindingOpportunities, setIsFindingOpportunities] = useState(false);
    const [opportunities, setOpportunities] = useState<PersonalizationOpportunity[]>([]);
    const [isOpportunitiesModalOpen, setIsOpportunitiesModalOpen] = useState(false);

    const auditResult = activeProject?.seoAudit;

    const handleAudit = async () => {
        if (!activeProject || !url) return;
        setIsLoading(true);
        setOpportunities([]);
        try {
            const result = await geminiService.seoAudit(activeProject, url);
            updateActiveProject(p => ({ ...p, seoAudit: result }));
            logActivity(`Audited page: ${url}`, 'page-performance-lab', { url, result });
        } catch (error) {
            console.error("Failed to audit page", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFindOpportunities = async () => {
        if (!activeProject || !auditResult?.issues) return;
        setIsFindingOpportunities(true);
        try {
            const results = await geminiService.suggestPersonalizationForSeo(activeProject, auditResult.issues);
            setOpportunities(results);
            setIsOpportunitiesModalOpen(true);
        } catch (error) {
            console.error("Failed to find personalization opportunities", error);
        } finally {
            setIsFindingOpportunities(false);
        }
    };

    const handleGoToBehavioralHub = (prompt: string) => {
        navigateToModule('behavioral-hub', { behavior: prompt });
    }

    const severityBadge = (severity: SeoIssue['severity']) => {
        switch (severity) {
            case 'High': return 'bg-red-500/30 text-red-300';
            case 'Medium': return 'bg-yellow-500/30 text-yellow-300';
            case 'Low': return 'bg-gray-600 text-gray-300';
            default: return '';
        }
    }

    const auditLoadingMessages = [
        "Dispatching AI crawler to URL...",
        "Analyzing on-page content structure...",
        "Executing technical SEO checks...",
        "Cross-referencing with live Google Search data...",
        "Evaluating for Zero-Click and AI Search readiness...",
        "Compiling actionable report...",
    ];

    return (
        <ToolShell moduleId="page-performance-lab">
            <div className="space-y-8">
                <Section
                    step={1}
                    title="Run Audit"
                    description="Enter a URL to run a live, AI-powered SEO and performance audit."
                >
                    <div className="flex items-end gap-4">
                        <div className="flex-grow">
                            <label className="text-sm font-medium text-text-muted">Page URL</label>
                            <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                        </div>
                        <Button onClick={handleAudit} isLoading={isLoading} disabled={!url}>Audit Page</Button>
                    </div>
                    <p className="text-xs text-secondary mt-2 text-center">
                        Note: Audits are performed using real-time Google Search data for maximum accuracy, not simulated results.
                    </p>
                </Section>

                {isLoading && <div className="flex justify-center p-8"><Spinner size={40} showMessages messages={auditLoadingMessages} /></div>}

                {auditResult && !isLoading && (
                    <div className="space-y-8">
                        <Section
                            step={2}
                            title="Audit Summary"
                            description={`High-level scores for ${auditResult.auditedUrl}`}
                        >
                            <div className="flex justify-around py-4">
                                <ScoreCircle score={auditResult.scores.organic} label="Overall SEO" />
                                <ScoreCircle score={auditResult.scores.technical} label="Technical" />
                                <ScoreCircle score={auditResult.scores.content} label="Content" />
                            </div>
                        </Section>

                        <Section
                            step={3}
                            title="AI-Search Layer Analysis"
                            description="How well your page is optimized for modern, AI-driven search frameworks."
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AiSearchLayerCard title="AEO" fullName="Answer Engine Optimization" analysis={auditResult.aiSearchLayerAnalysis.aeo} />
                                <AiSearchLayerCard title="GEO" fullName="Generative Engine Optimization" analysis={auditResult.aiSearchLayerAnalysis.geo} />
                                <AiSearchLayerCard title="AIO" fullName="AI Integration Optimization" analysis={auditResult.aiSearchLayerAnalysis.aio} />
                                <AiSearchLayerCard title="SXO" fullName="Search Experience Optimization" analysis={auditResult.aiSearchLayerAnalysis.sxo} />
                            </div>
                        </Section>

                        {auditResult.suggestedSchema && (
                            <Section
                                step={4}
                                title="Suggested Schema Markup"
                                description="AI-generated JSON-LD schema based on your page content to help you win rich snippets."
                            >
                                <CodeBlock code={auditResult.suggestedSchema} />
                            </Section>
                        )}

                        <Section
                            step={5}
                            title="Zero-Click Search Analysis"
                            description="Analyzes the page's readiness to be featured in SERP snippets, where 70% of searches end."
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                <div className="lg:col-span-1 flex justify-center">
                                    <ScoreCircle score={auditResult.zeroClickAnalysis.readinessScore} label="Readiness Score" />
                                </div>
                                <div className="lg:col-span-2 space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-green-400">Opportunities</h4>
                                        <ul className="list-disc list-inside text-sm text-text-muted font-serif space-y-1 mt-1">
                                            {auditResult.zeroClickAnalysis.opportunities.map((opp, i) => <li key={i}>{opp}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-red-400">Threats</h4>
                                        <ul className="list-disc list-inside text-sm text-text-muted font-serif space-y-1 mt-1">
                                            {auditResult.zeroClickAnalysis.threats.map((threat, i) => <li key={i}>{threat}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="lg:col-span-3 border-t border-border pt-4">
                                    <h4 className="font-semibold text-white mb-3">Recommendations</h4>
                                    <div className="space-y-3">
                                        {auditResult.zeroClickAnalysis.recommendations.map((rec, i) => <ActionPlanCard key={i} action={rec} step={`Z${i + 1}`} />)}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section
                            step={6}
                            title="Issues & Technical Checks"
                            description="Prioritized issues and a detailed technical checklist."
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Top Issues</h3>
                                    <ul className="space-y-3">
                                        {auditResult.issues.map((issue, i) => (
                                            <li key={i} className="flex items-start space-x-3">
                                                <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${severityBadge(issue.severity)}`}>{issue.severity}</span>
                                                <p className="text-sm text-text-muted font-serif">{issue.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 border-t border-border pt-6">
                                        <Button onClick={handleFindOpportunities} isLoading={isFindingOpportunities}>Find Personalization Opportunities</Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Technical Audit</h3>
                                    <div className="overflow-x-auto max-h-96">
                                        <table className="min-w-full">
                                            <tbody>
                                                {auditResult.technicalAudit.map((item, i) => (
                                                    <tr key={i} className="border-b border-border">
                                                        <td className="py-2 pr-2"><StatusIcon status={item.status} /></td>
                                                        <td className="py-2 text-sm font-medium text-gray-200">{item.check}</td>
                                                        <td className="py-2 text-sm text-text-muted">{item.details}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section
                            step={7}
                            title="Action Plan"
                            description="A prioritized, step-by-step plan to address the most critical issues."
                        >
                            <div className="space-y-4">
                                {auditResult.actions.map(action => <ActionPlanCard key={action.step} action={action} step={`${action.step}`} />)}
                            </div>
                        </Section>
                    </div>
                )}
            </div>

            <Modal isOpen={isOpportunitiesModalOpen} onClose={() => setIsOpportunitiesModalOpen(false)} title="Personalization Opportunities">
                <div className="space-y-6">
                    <p className="text-gray-300">Based on the SEO issues, here are some personalization strategies to consider, along with prompts for the Behavioral Intelligence Hub.</p>
                    {opportunities.map((opp, i) => (
                        <div key={i} className="bg-surface/50 p-4 rounded-lg border border-border">
                            <h4 className="font-semibold text-secondary">Opportunity</h4>
                            <p className="text-gray-200 mb-2 font-serif">{opp.opportunity}</p>
                            <h4 className="font-semibold text-secondary">Behavioral Hub Prompt</h4>
                            <p className="text-sm text-text-muted italic mb-3 font-serif">"{opp.behaviorPrompt}"</p>
                            <Button size="sm" variant="secondary" onClick={() => handleGoToBehavioralHub(opp.behaviorPrompt)}>Send to Hub</Button>
                        </div>
                    ))}
                </div>
            </Modal>
        </ToolShell>
    );
};

export default PagePerformanceLab;