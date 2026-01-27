import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useError } from '../contexts/ErrorContext';
import * as geminiService from '../services/geminiService';
import { Insight } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigateToModule, openSettings } = useProject();
    const { isGuest } = useAuth();
    const { setError } = useError();
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);
    const [isLoadingUpdates, setIsLoadingUpdates] = useState(false);
    const [quickActionInput, setQuickActionInput] = useState('');

    const insights = activeProject?.dashboardInsights;
    const updates = activeProject?.googleSearchUpdates || [];

    const handleRefreshInsights = async () => {
        if (!activeProject) return;
        setIsLoadingInsights(true);
        try {
            const result = await geminiService.getDashboardInsights(activeProject);
            updateActiveProject(p => ({ ...p, dashboardInsights: result }));
            logActivity("Refreshed strategic intelligence feed.", 'dashboard', result);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoadingInsights(false);
        }
    };

    const handleRefreshUpdates = async () => {
        if (!activeProject) return;
        setIsLoadingUpdates(true);
        try {
            const result = await geminiService.getGoogleSearchUpdates(activeProject);
            updateActiveProject(p => ({
                ...p,
                googleSearchUpdates: result,
                googleSearchUpdatesLastChecked: new Date().toISOString()
            }));
            logActivity("Synchronized with Google Search Central updates.", 'dashboard');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoadingUpdates(false);
        }
    };

    useEffect(() => {
        if (!insights) handleRefreshInsights();
        if (updates.length === 0) handleRefreshUpdates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQuickAction = () => {
        const input = quickActionInput.toLowerCase();
        if (!input) return;

        // Smart Intent Detection
        if (input.includes('audience') || input.includes('persona') || input.includes('target')) {
            navigateToModule('audience');
        } else if (input.includes('market') || input.includes('radar') || input.includes('competitor')) {
            navigateToModule('market-radar');
        } else if (input.includes('brief') || input.includes('strategy')) {
            navigateToModule('strategy-briefs');
        } else if (input.includes('write') || input.includes('post') || input.includes('content')) {
            navigateToModule('content-creator', { topic: quickActionInput });
        } else {
            navigateToModule('content-creator', { topic: quickActionInput, mode: 'post' });
        }
        setQuickActionInput('');
    }

    const InsightFeedItem: React.FC<{
        type: 'risk' | 'opportunity' | 'action',
        title: string,
        insight: Insight | undefined
    }> = ({ type, title, insight }) => {
        const styles = {
            risk: { accent: 'bg-google-red', iconText: 'text-google-red', icon: 'warning', bg: 'bg-red-50/50' },
            opportunity: { accent: 'bg-google-yellow', iconText: 'text-google-yellow', icon: 'trending_up', bg: 'bg-yellow-50/50' },
            action: { accent: 'bg-google-blue', iconText: 'text-google-blue', icon: 'rocket_launch', bg: 'bg-blue-50/50' },
        };

        const style = styles[type];
        if (!insight && !isLoadingInsights) return null;

        return (
            <div className={`p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 bg-white group flex flex-col h-full`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className={`size-10 rounded-xl ${style.bg} ${style.iconText} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-xl">{style.icon}</span>
                    </div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</h4>
                </div>

                {isLoadingInsights ? (
                    <div className="space-y-3">
                        <div className="h-6 bg-gray-50 rounded-lg w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-50 rounded-lg w-2/3 animate-pulse"></div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        <h3 className="font-display font-bold text-gray-900 text-xl mb-3 leading-tight">{insight?.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{insight?.detail}</p>
                        {insight?.callToAction && (
                            <button
                                onClick={() => {
                                    let payload = insight.callToAction!.payload;
                                    if (typeof payload === 'string' && payload.startsWith('{')) {
                                        try { payload = JSON.parse(payload); } catch { }
                                    }
                                    navigateToModule(insight.callToAction!.moduleId, payload);
                                }}
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-google-blue group/btn"
                            >
                                <span>{insight.callToAction.text}</span>
                                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_right_alt</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto space-y-16 pb-24 px-6 md:px-0">
            {/* Command Center Header */}
            <div className="relative pt-16 pb-20 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-google-blue via-google-red to-google-yellow rounded-full"></div>

                <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
                    Propel Your <br />
                    Strategic Edge.
                </h1>

                <div className="max-w-3xl mx-auto relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-google-blue/10 via-google-red/10 to-google-yellow/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative flex items-center bg-white rounded-[2.5rem] p-3 shadow-2x-strong border border-gray-100">
                        <span className="material-symbols-outlined text-gray-300 ml-6">terminal</span>
                        <input
                            type="text"
                            className="flex-grow px-6 py-4 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent font-medium text-lg"
                            placeholder="Type a command (e.g., 'Refine target audience')"
                            value={quickActionInput}
                            onChange={(e) => setQuickActionInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleQuickAction()}
                        />
                        <button
                            onClick={handleQuickAction}
                            className="bg-gray-900 text-white rounded-2xl px-10 py-4 font-bold active:scale-95 transition-all shadow-xl hover:bg-black group"
                        >
                            <span className="flex items-center gap-2">
                                Execute
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">play_arrow</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Guest Progress Alert */}
            {isGuest && (
                <div className="bg-gradient-to-r from-google-blue/10 via-google-red/10 to-google-yellow/10 p-1 rounded-[2.5rem]">
                    <div className="bg-white rounded-[2.4rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-white">
                        <div className="flex items-center gap-6">
                            <div className="size-16 rounded-3xl bg-slate-50 flex items-center justify-center text-google-blue shadow-inner">
                                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-display font-bold text-gray-900 text-2xl mb-1">Save Your Strategic Progress</h3>
                                <p className="text-gray-500 font-medium">Guest sessions are volatile. Sign in to persist this project and unlock full AI depth.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-black transition-all whitespace-nowrap shadow-xl"
                        >
                            Sign In to Save
                        </button>
                    </div>
                </div>
            )}

            {/* Strategy Hub */}
            <div className="space-y-10">
                <div className="flex items-end justify-between px-4">
                    <div>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-2">OS Intelligence</h2>
                        <h3 className="text-3xl font-display font-bold text-gray-900">Current Strategic Focus</h3>
                    </div>
                    <button
                        onClick={handleRefreshInsights}
                        className="p-3 rounded-full hover:bg-gray-50 text-gray-400 hover:text-google-blue transition-all"
                        title="Re-run Strategic Engine"
                    >
                        <span className={`material-symbols-outlined text-2xl ${isLoadingInsights ? 'animate-spin' : ''}`}>refresh</span>
                    </button>
                </div>

                {!activeProject?.foundation.businessDescription ? (
                    <div className="bg-slate-50 border border-dashed border-gray-200 p-16 text-center rounded-[3rem] group hover:border-google-blue/30 transition-colors">
                        <div className="size-20 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 text-google-yellow group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-4xl">lightbulb</span>
                        </div>
                        <h3 className="font-display font-bold text-gray-900 text-2xl mb-3">Project Brain is Empty</h3>
                        <p className="text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed font-medium">Provide business context in the Project Brain to unlock real-time strategic insights.</p>
                        <button onClick={openSettings} className="bg-google-blue text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-google-blue/20 hover:bg-blue-600 transition-all">Setup Foundation</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InsightFeedItem type="action" title="Strategic Priority" insight={insights?.nextMove} />
                        <InsightFeedItem type="risk" title="Technical Risk" insight={insights?.biggestRisk} />
                        <InsightFeedItem type="opportunity" title="Growth Vector" insight={insights?.topOpportunity} />
                    </div>
                )}
            </div>

            {/* Google Ecosystem Pulse */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em]">Google Ecosystem Pulse</h2>
                        <button onClick={handleRefreshUpdates} className="text-[10px] text-google-blue hover:underline font-bold tracking-widest uppercase">Sync with Search Central</button>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-google-blue/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>

                        <div className="relative space-y-12">
                            {isLoadingUpdates ? (
                                Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="flex gap-8 items-start opacity-50">
                                        <div className="size-4 rounded-full bg-gray-100 mt-1 animate-pulse"></div>
                                        <div className="space-y-3 flex-1">
                                            <div className="h-5 bg-gray-50 rounded w-1/3 animate-pulse"></div>
                                            <div className="h-4 bg-gray-50 rounded w-full animate-pulse"></div>
                                        </div>
                                    </div>
                                ))
                            ) : updates.length > 0 ? (
                                updates.slice(0, 3).map((update, idx) => (
                                    <div key={idx} className="flex gap-8 group">
                                        <div className="flex flex-col items-center">
                                            <div className="size-4 rounded-full bg-google-blue group-hover:scale-150 transition-transform ring-4 ring-blue-50"></div>
                                            {idx < 2 && <div className="w-px h-full bg-gray-100 mt-2"></div>}
                                        </div>
                                        <div className="flex-1 pb-2">
                                            <span className="text-[10px] font-bold text-google-blue uppercase tracking-widest">{update.date}</span>
                                            <h4 className="font-bold text-gray-900 text-lg mt-1 mb-2 group-hover:text-google-blue transition-colors leading-tight">{update.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-4">{update.summary}</p>
                                            <a href={update.sourceUri} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest flex items-center gap-1">
                                                Read Official Documentation
                                                <span className="material-symbols-outlined text-xs">open_in_new</span>
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-10 font-medium italic">No recent updates detected. Synchronize to check metadata.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] px-4">Quick Orbits</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { id: 'audience', name: 'PersonaLab', icon: 'groups', color: 'text-google-blue' },
                            { id: 'market-radar', name: 'Market Radar', icon: 'radar', color: 'text-google-red' },
                            { id: 'content-creator', name: 'Content Engine', icon: 'edit_note', color: 'text-google-yellow' },
                            { id: 'strategy-briefs', name: 'StratBriefs', icon: 'auto_stories', color: 'text-google-green' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigateToModule(item.id as any)}
                                className="bg-white border border-gray-50 p-6 rounded-[2rem] hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-6 group"
                            >
                                <div className={`size-12 rounded-2xl bg-gray-50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-lg leading-tight">{item.name}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Launch Orbit</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;