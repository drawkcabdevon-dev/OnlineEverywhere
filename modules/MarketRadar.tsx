import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import { CompetitiveAnalysis, KeywordInfo } from '../types';
import * as geminiService from '../services/geminiService';
import Section from '../components/Section';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';

const SocialCard: React.FC<{ platform: string, data: { handle: string, followers: string } | null }> = ({ platform, data }) => {
    if (!data) return null;
    return (
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-center">
            <p className="font-bold text-gray-800 capitalize">{platform}</p>
            <p className="text-sm text-gray-600">{data.handle}</p>
            <p className="text-xs text-gray-500">{data.followers} followers</p>
        </div>
    );
};

const ComparisonDetail: React.FC<{ title: string; value1: React.ReactNode; value2: React.ReactNode; }> = ({ title, value1, value2 }) => (
    <div className="py-3 border-b border-gray-200">
        <h5 className="font-semibold text-secondary mb-2">{title}</h5>
        <div className="grid grid-cols-2 gap-4 text-sm font-serif text-gray-700">
            <div>{value1}</div>
            <div>{value2}</div>
        </div>
    </div>
);


const MarketRadar: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigateToModule } = useProject();
    const [isLoading, setIsLoading] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const [competitorUrl, setCompetitorUrl] = useState('');
    const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
    const [compareIds, setCompareIds] = useState<string[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestedCompetitors, setSuggestedCompetitors] = useState<{ url: string, reason: string }[]>([]);
    const [isRequestingLocation, setIsRequestingLocation] = useState(false);

    const [activeKeywordAnalysis, setActiveKeywordAnalysis] = useState<{
        keyword: string;
        details: KeywordInfo | null;
        isLoading: boolean;
        error: string | null;
    } | null>(null);

    const competitors = activeProject?.competitors || [];
    const comparisonResult = activeProject?.competitorComparison;

    useEffect(() => {
        if (activeProject?.foundation.websiteUrl && suggestedCompetitors.length === 0 && competitors.length === 0) {
            handleSuggestCompetitors();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeProject?.foundation.websiteUrl, competitors.length]);


    useEffect(() => {
        if (competitors.length > 0 && !selectedAnalysisId) {
            setSelectedAnalysisId(competitors[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [competitors]);

    const runAnalysis = async (urlToAnalyze: string) => {
        if (!activeProject || !urlToAnalyze) return;
        setIsLoading(true);
        try {
            logActivity(`Started competitor analysis for: ${urlToAnalyze}`, 'market-radar');
            const result = await geminiService.analyzeCompetitor(activeProject, urlToAnalyze);
            const newAnalysis = { ...result, id: crypto.randomUUID() };
            updateActiveProject(p => ({ ...p, competitors: [...p.competitors, newAnalysis] }));
            logActivity(`Completed analysis for: ${urlToAnalyze}`, 'market-radar', newAnalysis);
            setSelectedAnalysisId(newAnalysis.id);
            setCompetitorUrl('');
            setSuggestedCompetitors(prev => prev.filter(s => s.url !== urlToAnalyze));
        } catch (error) {
            console.error("Failed to analyze competitor", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestCompetitors = async () => {
        if (!activeProject) return;
        setIsSuggesting(true);
        setSuggestedCompetitors([]);
        try {
            const suggestions = await geminiService.suggestCompetitors(activeProject);
            setSuggestedCompetitors(suggestions);
            if (suggestions.length > 0) {
                logActivity('Identified potential competitors with AI.', 'market-radar');
            }
        } catch (error) {
            console.error("Failed to suggest competitors", error);
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleRequestLocation = () => {
        setIsRequestingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                updateActiveProject(p => ({ ...p, location: { latitude, longitude } }));
                logActivity('User location captured for localized results.', 'market-radar');
                setIsRequestingLocation(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                setIsRequestingLocation(false);
            }
        );
    };

    const handleCompareToggle = (id: string) => {
        setCompareIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(i => i !== id);
            }
            if (prev.length < 2) {
                return [...prev, id];
            }
            return [prev[1], id]; // Keep last two selected
        });
    };

    const handleRunComparison = async () => {
        if (!activeProject || compareIds.length !== 2) return;
        const competitor1 = competitors.find(c => c.id === compareIds[0]);
        const competitor2 = competitors.find(c => c.id === compareIds[1]);
        if (!competitor1 || !competitor2) return;

        setIsComparing(true);
        try {
            const result = await geminiService.compareCompetitors(activeProject, competitor1, competitor2);
            updateActiveProject(p => ({ ...p, competitorComparison: result }));
            logActivity(`Compared ${competitor1.competitorUrl} and ${competitor2.competitorUrl}`, 'market-radar', result);
        } catch (error) {
            console.error("Failed to compare competitors", error);
        } finally {
            setIsComparing(false);
        }
    };

    const handleBuildInspired = (competitor: CompetitiveAnalysis) => {
        const payload = {
            description: `Create a section inspired by our competitor, ${competitor.competitorUrl}. Their executive summary is: "${competitor.executiveSummary}". Their value proposition is: "${competitor.profile.valueProposition}"`,
            inspiration: {
                source: 'Market Radar',
                details: competitor.competitorUrl,
                refCode: competitor.competitorUrl,
            }
        };
        navigateToModule('website-dev', payload);
    };

    const selectedAnalysis = competitors.find(c => c.id === selectedAnalysisId);

    const ReportSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
        <div className={className}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
            <Card className="p-4 bg-white border-gray-200">
                {children}
            </Card>
        </div>
    );

    const SwotList: React.FC<{ title: string; items: string[] | undefined; color: string }> = ({ title, items, color }) => (
        <div>
            <h4 className={`font-semibold ${color} mb-2`}>{title}</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 font-serif">
                {items?.map((item, index) => <li key={index}>{item}</li>) ?? <li>No data yet.</li>}
            </ul>
        </div>
    );

    const handleKeywordClick = async (keyword: string) => {
        if (!activeProject) return;
        setActiveKeywordAnalysis({ keyword, details: null, isLoading: true, error: null });
        try {
            const details = await geminiService.getKeywordDetails(activeProject, keyword);
            setActiveKeywordAnalysis({ keyword, details, isLoading: false, error: null });
        } catch (error) {
            console.error("Failed to get keyword details", error);
            setActiveKeywordAnalysis({ keyword, details: null, isLoading: false, error: "Failed to load keyword details." });
        }
    };

    const Badge: React.FC<{ text: string; color: string; }> = ({ text, color }) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
            {text}
        </span>
    );

    const intentColor = (intent: KeywordInfo['intent']) => {
        switch (intent) {
            case 'Informational': return 'bg-blue-50 text-blue-700';
            case 'Navigational': return 'bg-gray-100 text-gray-700';
            case 'Commercial': return 'bg-yellow-50 text-yellow-700';
            case 'Transactional': return 'bg-green-50 text-green-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const levelColor = (level: 'Low' | 'Medium' | 'High') => {
        switch (level) {
            case 'Low': return 'bg-green-50 text-green-700';
            case 'Medium': return 'bg-yellow-50 text-yellow-700';
            case 'High': return 'bg-red-50 text-red-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-sm text-gray-500">{label}</p>
            <div className="mt-1 font-semibold text-gray-900">{children}</div>
        </div>
    );

    const getRankColor = (rank: number) => {
        if (rank > 75) return 'bg-red-50 text-red-700 border-red-200';
        if (rank > 40) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        return 'bg-green-50 text-green-700 border-green-200';
    };

    const inputClasses = "mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-900";
    const labelClasses = "text-sm font-medium text-gray-700";


    return (
        <ToolShell moduleId="market-radar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Section title="Analyze Competitor" description="Enter a competitor's URL or let AI discover them for you.">
                        {!activeProject?.location && (
                            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg mb-4 text-center">
                                <p className="text-sm text-indigo-700">Enable location for more relevant local competitor suggestions.</p>
                                <Button size="sm" variant="ghost" onClick={handleRequestLocation} isLoading={isRequestingLocation} className="mt-2 text-primary hover:bg-indigo-100">Enable Location</Button>
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className={labelClasses}>Competitor Website URL</label>
                                <input type="url" value={competitorUrl} onChange={e => setCompetitorUrl(e.target.value)} placeholder="https://competitor.com" className={inputClasses} />
                            </div>
                            <Button onClick={() => runAnalysis(competitorUrl)} isLoading={isLoading} disabled={!competitorUrl}>Analyze Manually</Button>
                        </div>
                        <div className="relative flex py-4 items-center">
                            <div className="flex-grow border-t border-dashed border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-xs text-gray-500">OR</span>
                            <div className="flex-grow border-t border-dashed border-gray-300"></div>
                        </div>
                        <div>
                            <Button onClick={handleSuggestCompetitors} isLoading={isSuggesting} disabled={!activeProject?.foundation.websiteUrl} variant="secondary" className="w-full">
                                ✨ Discover Competitors with AI
                            </Button>
                            {!activeProject?.foundation.websiteUrl && (
                                <p className="text-xs text-yellow-600 mt-2 text-center">
                                    Add your website URL in Project Foundation to enable AI discovery.
                                </p>
                            )}
                            {suggestedCompetitors.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {suggestedCompetitors.map((s, i) => (
                                        <Card key={i} className="p-3 bg-gray-50 border-gray-200">
                                            <div>
                                                <p className="font-semibold text-primary truncate">{s.url}</p>
                                                <p className="text-xs text-gray-600 mt-1 font-serif">{s.reason}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="mt-2"
                                                onClick={() => runAnalysis(s.url)}
                                                disabled={isLoading}
                                            >
                                                Analyze this Competitor
                                            </Button>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Section>

                    <Section title="Intelligence Reports" description="Select a report to view details, or choose two to run a comparative analysis.">
                        <ul className="space-y-2">
                            {competitors.map(c => (
                                <li key={c.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={compareIds.includes(c.id)}
                                        onChange={() => handleCompareToggle(c.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <button
                                        onClick={() => setSelectedAnalysisId(c.id)}
                                        className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between ${selectedAnalysisId === c.id ? 'bg-primary/10 border border-primary/30' : 'bg-white hover:bg-gray-50 border border-transparent'}`}
                                        aria-current={selectedAnalysisId === c.id}
                                    >
                                        <p className={`font-semibold truncate ${selectedAnalysisId === c.id ? 'text-primary' : 'text-gray-700'}`}>{c.competitorUrl}</p>
                                        {c.rank && (
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getRankColor(c.rank)}`}>
                                                {c.rank}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    {competitors.length >= 2 && (
                        <Section title="Comparative Analysis" description="Compare two competitors head-to-head for strategic recommendations.">
                            <Button onClick={handleRunComparison} isLoading={isComparing} disabled={compareIds.length !== 2}>
                                Compare ({compareIds.length}/2)
                            </Button>
                            {comparisonResult && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    {(() => {
                                        const c1 = competitors.find(c => c.competitorUrl === comparisonResult.competitor1Url);
                                        const c2 = competitors.find(c => c.competitorUrl === comparisonResult.competitor2Url);

                                        if (!c1 || !c2) {
                                            return <p className="text-sm text-yellow-600">Could not find competitor data for comparison. Please try again.</p>;
                                        }

                                        return (
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">Head-to-Head Comparison</h4>
                                                    <div className="grid grid-cols-2 gap-4 mt-2 mb-4 text-center">
                                                        <p className="font-semibold text-primary truncate">{c1.competitorUrl}</p>
                                                        <p className="font-semibold text-primary truncate">{c2.competitorUrl}</p>
                                                    </div>
                                                </div>
                                                <ComparisonDetail
                                                    title="Value Proposition"
                                                    value1={<p>{c1.profile.valueProposition}</p>}
                                                    value2={<p>{c2.profile.valueProposition}</p>}
                                                />
                                                <ComparisonDetail
                                                    title="Target Audience"
                                                    value1={<p>{c1.profile.targetAudience}</p>}
                                                    value2={<p>{c2.profile.targetAudience}</p>}
                                                />
                                                <ComparisonDetail
                                                    title="Strengths"
                                                    value1={<ul className="list-disc list-inside space-y-1">{c1.swot.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                                                    value2={<ul className="list-disc list-inside space-y-1">{c2.swot.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                                                />
                                                <ComparisonDetail
                                                    title="Weaknesses"
                                                    value1={<ul className="list-disc list-inside space-y-1">{c1.swot.weaknesses.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                                                    value2={<ul className="list-disc list-inside space-y-1">{c2.swot.weaknesses.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                                                />
                                                <div className="pt-4">
                                                    <h4 className="font-semibold text-secondary mb-2">AI-Powered Analysis</h4>
                                                    <p className="text-sm text-gray-700 font-serif">{comparisonResult.analysis}</p>
                                                </div>
                                                <div className="pt-4">
                                                    <h4 className="font-semibold text-secondary mb-2">Strategic Recommendation for You</h4>
                                                    <p className="text-sm text-gray-700 font-serif">{comparisonResult.recommendation}</p>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}
                        </Section>
                    )}
                </div>

                <div className="lg:col-span-2">
                    {selectedAnalysis ? (
                        <Card className="p-6 space-y-6 animate-slide-in-up">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedAnalysis.competitorUrl}</h2>
                                    {selectedAnalysis.rank && selectedAnalysis.contextualSummary && (
                                        <div className={`mt-2 p-3 rounded-lg border text-sm ${getRankColor(selectedAnalysis.rank)}`}>
                                            <span className="font-bold">Threat Score: {selectedAnalysis.rank}/100.</span> {selectedAnalysis.contextualSummary}
                                        </div>
                                    )}
                                </div>
                                <Button size="sm" onClick={() => handleBuildInspired(selectedAnalysis)}>Build Inspired Section</Button>
                            </div>

                            <ReportSection title="Executive Summary">
                                <p className="text-sm text-gray-600 font-serif">{selectedAnalysis.executiveSummary}</p>
                            </ReportSection>

                            <ReportSection title="Competitor Profile">
                                <div className="space-y-2 text-sm">
                                    <p><strong className="font-semibold text-gray-700">Value Proposition:</strong> <span className="text-gray-600 font-serif">{selectedAnalysis.profile.valueProposition}</span></p>
                                    <p><strong className="font-semibold text-gray-700">Target Audience:</strong> <span className="text-gray-600 font-serif">{selectedAnalysis.profile.targetAudience}</span></p>
                                    <p><strong className="font-semibold text-gray-700">Market Share:</strong> <span className="text-gray-600 font-serif">{selectedAnalysis.profile.marketShare}</span></p>
                                    <div>
                                        <strong className="font-semibold text-gray-700">Product Offerings:</strong>
                                        <ul className="list-disc list-inside pl-4 text-gray-600 font-serif">
                                            {Array.isArray(selectedAnalysis.profile.productOfferings)
                                                ? selectedAnalysis.profile.productOfferings.map((item, i) => <li key={i}>{item}</li>)
                                                : <li>{selectedAnalysis.profile.productOfferings}</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </ReportSection>

                            <ReportSection title="SWOT Analysis">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SwotList title="Strengths" items={selectedAnalysis.swot.strengths} color="text-green-600" />
                                    <SwotList title="Weaknesses" items={selectedAnalysis.swot.weaknesses} color="text-red-600" />
                                    <SwotList title="Opportunities" items={selectedAnalysis.swot.opportunities} color="text-blue-600" />
                                    <SwotList title="Threats" items={selectedAnalysis.swot.threats} color="text-yellow-600" />
                                </div>
                            </ReportSection>

                            {selectedAnalysis.winningAngles && selectedAnalysis.winningAngles.length > 0 && (
                                <Section title="Strategic Winning Angles" description="AI-identified gaps where you can outperform this competitor.">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {selectedAnalysis.winningAngles.map((angle, i) => (
                                            <div key={i} className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] shadow-none hover:shadow-md transition-shadow group flex flex-col">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="size-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                                                        {i + 1}
                                                    </div>
                                                    <h4 className="font-bold text-indigo-900 leading-tight">{angle.title}</h4>
                                                </div>
                                                <p className="text-xs text-indigo-700/80 leading-relaxed mb-6 font-serif flex-1">{angle.description}</p>
                                                {angle.isGenerative && (
                                                    <button
                                                        onClick={() => navigateToModule('content-creator', { topic: `Exploit gap: ${angle.title}`, context: { competitorUrl: selectedAnalysis.competitorUrl } })}
                                                        className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors mt-auto"
                                                    >
                                                        <span>Generate Counter-Asset</span>
                                                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            )}

                            <ReportSection title="Marketing & SEO">
                                <div>
                                    <h4 className="font-semibold text-secondary mb-2">Overall Marketing Strategy</h4>
                                    <p className="text-sm text-gray-600 font-serif">{selectedAnalysis.marketingStrategy}</p>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-secondary mb-2">SEO Keyword Strategy</h4>
                                    <p className="text-sm text-gray-600 font-serif">{selectedAnalysis.seoMetrics.keywordStrategy}</p>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-secondary mb-2">Top Keyword Clusters</h4>
                                    <div className="space-y-3">
                                        {selectedAnalysis.seoMetrics.topKeywordClusters.map((cluster, i) => (
                                            <div key={i}>
                                                <p className="font-medium text-gray-800">{cluster.theme}</p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {cluster.keywords.map((kw, j) => (
                                                        <button
                                                            key={j}
                                                            onClick={() => handleKeywordClick(kw)}
                                                            className="bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                                        >
                                                            {kw}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ReportSection>

                            <ReportSection title="Social Media Presence">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <SocialCard platform="instagram" data={selectedAnalysis.socialPresence.instagram} />
                                    <SocialCard platform="facebook" data={selectedAnalysis.socialPresence.facebook} />
                                    <SocialCard platform="linkedin" data={selectedAnalysis.socialPresence.linkedin} />
                                    <SocialCard platform="twitter" data={selectedAnalysis.socialPresence.twitter} />
                                </div>
                            </ReportSection>

                            <ReportSection title="Sources">
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {selectedAnalysis.sources?.map((s, i) => <li key={i}><a href={s.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.title || s.uri}</a></li>)}
                                </ul>
                            </ReportSection>
                        </Card>
                    ) : (
                        <Card className="p-6 h-full flex items-center justify-center">
                            {isLoading || isSuggesting ? <Spinner showMessages messages={["Scanning the web for competitors...", "Analyzing SERPs for overlaps...", "Identifying strategic threats..."]} /> : <p className="text-gray-400">Analyze a competitor or select one to see the report.</p>}
                        </Card>
                    )}
                </div>
            </div>
            <Modal
                isOpen={!!activeKeywordAnalysis}
                onClose={() => setActiveKeywordAnalysis(null)}
                title={`Keyword Analysis: "${activeKeywordAnalysis?.keyword}"`}
            >
                {activeKeywordAnalysis?.isLoading && <div className="flex justify-center p-8"><Spinner /></div>}
                {activeKeywordAnalysis?.error && <p className="text-red-500 text-center">{activeKeywordAnalysis.error}</p>}
                {activeKeywordAnalysis?.details && (
                    <div className="space-y-4 animate-slide-in-up">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <DetailItem label="Search Volume">
                                {activeKeywordAnalysis.details.searchVolume}
                            </DetailItem>
                            <DetailItem label="Est. CPC">
                                {activeKeywordAnalysis.details.cpc}
                            </DetailItem>
                            <DetailItem label="Intent">
                                <Badge text={activeKeywordAnalysis.details.intent} color={intentColor(activeKeywordAnalysis.details.intent)} />
                            </DetailItem>
                            <DetailItem label="SEO Difficulty">
                                <Badge text={activeKeywordAnalysis.details.difficulty} color={levelColor(activeKeywordAnalysis.details.difficulty)} />
                            </DetailItem>
                            <DetailItem label="Ad Competition">
                                <Badge text={activeKeywordAnalysis.details.competition} color={levelColor(activeKeywordAnalysis.details.competition)} />
                            </DetailItem>
                        </div>
                    </div>
                )}
            </Modal>
        </ToolShell>
    );
};

export default MarketRadar;