import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useError } from '../contexts/ErrorContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { SwotAnalysis, Insight, GoogleUpdate } from '../types';
import Section from '../components/Section';

const Dashboard: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigateToModule, openSettings } = useProject();
    const { setError } = useError();
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);
    const [quickActionInput, setQuickActionInput] = useState('');

    const insights = activeProject?.dashboardInsights;

    const handleRefreshInsights = async () => {
        if (!activeProject) return;
        setIsLoadingInsights(true);
        try {
            const result = await geminiService.getDashboardInsights(activeProject);
            updateActiveProject(p => ({ ...p, dashboardInsights: result }));
            logActivity("Refreshed dashboard insights.", 'dashboard', result);
        } catch (error: any) {
            console.error("Failed to refresh insights", error);
            setError(error.message);
        } finally {
            setIsLoadingInsights(false);
        }
    };

    useEffect(() => {
        if (!insights) {
            handleRefreshInsights();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const InsightFeedItem: React.FC<{
        type: 'risk' | 'opportunity' | 'action',
        title: string,
        insight: Insight | undefined,
        delay: number
    }> = ({ type, title, insight, delay }) => {
        const styles = {
            risk: { accent: 'bg-google-red', iconText: 'text-google-red', icon: 'warning' },
            opportunity: { accent: 'bg-google-yellow', iconText: 'text-google-yellow', icon: 'trending_up' },
            action: { accent: 'bg-google-blue', iconText: 'text-google-blue', icon: 'rocket_launch' },
        };

        const style = styles[type];
        if (!insight && !isLoadingInsights) return null;

        return (
            <div
                className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500"
            >
                <div className={`absolute top-0 left-0 w-2 h-full ${style.accent}`}></div>
                <div className="flex items-start gap-6">
                    <div className={`size-12 rounded-2xl bg-gray-50 flex items-center justify-center ${style.iconText} group-hover:scale-110 transition-transform duration-500`}>
                        <span className="material-symbols-outlined">{style.icon}</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</h4>
                        </div>
                        {isLoadingInsights ? (
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-50 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-50 rounded w-1/2 animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <h3 className="font-display font-bold text-gray-900 text-xl mb-2">{insight?.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{insight?.detail}</p>
                                {insight?.callToAction && (
                                    <button
                                        onClick={() => {
                                            let payload = insight.callToAction!.payload;
                                            if (typeof payload === 'string') {
                                                try { payload = JSON.parse(payload); } catch { }
                                            }
                                            navigateToModule(insight.callToAction!.moduleId, payload);
                                        }}
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-google-blue hover:gap-3 transition-all"
                                    >
                                        <span>{insight.callToAction.text}</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const handleQuickAction = () => {
        if (!quickActionInput) return;
        navigateToModule('content-creator', { topic: quickActionInput, mode: 'post' });
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
            {/* Premium Welcome Header */}
            <div className="text-center space-y-8 py-12 relative overflow-hidden rounded-[3rem] bg-slate-50 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1.5 flex">
                    <div className="flex-1 bg-google-blue"></div>
                    <div className="flex-1 bg-google-red"></div>
                    <div className="flex-1 bg-google-yellow"></div>
                    <div className="flex-1 bg-google-green"></div>
                </div>

                <div className="relative z-10 px-6">
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight leading-[0.9]">
                        Master the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-green">Marketing Flow.</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6 font-medium">
                        Project <span className="text-gray-900 font-bold">{activeProject?.name}</span> is online. Orchestrate your next move.
                    </p>

                    <div className="relative max-w-2xl mx-auto mt-12 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-google-blue via-google-red to-google-green rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                        <div className="relative flex bg-white rounded-[2rem] p-2 shadow-2xl border border-gray-100">
                            <input
                                type="text"
                                className="flex-grow px-8 py-4 rounded-[2rem] text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent font-medium"
                                placeholder="Command AI (e.g. 'Draft a strategic brief for our next campaign')"
                                value={quickActionInput}
                                onChange={(e) => setQuickActionInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleQuickAction()}
                            />
                            <button
                                onClick={handleQuickAction}
                                className="bg-gray-900 text-white rounded-2xl px-8 py-4 font-bold active:scale-95 transition-all shadow-xl hover:bg-black"
                            >
                                Execute
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Intelligence Feed */}
            <div className="space-y-8">
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Strategy Feed</h2>
                    <button onClick={handleRefreshInsights} className="text-[10px] text-google-blue hover:text-blue-700 font-bold uppercase tracking-widest flex items-center gap-2 transition-all">
                        <span className={`material-symbols-outlined text-sm ${isLoadingInsights ? 'animate-spin' : ''}`}>sync</span>
                        <span>Refresh Pipeline</span>
                    </button>
                </div>

                {!activeProject?.foundation.businessDescription ? (
                    <div className="bg-white border border-gray-100 p-12 text-center rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-google-yellow"></div>
                        <h3 className="font-display font-bold text-gray-900 text-2xl mb-4">Strategic Foundation Required</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed font-medium">The AI engine needs business context to generate strategic insights for this project.</p>
                        <button onClick={openSettings} className="bg-google-blue text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-google-blue/20 hover:scale-[1.02] transition-all">Configure Project Brain</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InsightFeedItem type="action" title="Recommended Next Move" insight={insights?.nextMove} delay={0} />
                        <InsightFeedItem type="risk" title="Risk Mitigation" insight={insights?.biggestRisk} delay={100} />
                        <InsightFeedItem type="opportunity" title="Growth Opportunity" insight={insights?.topOpportunity} delay={200} />
                    </div>
                )}
            </div>

            {/* Modern Quick Access Grid */}
            <div className="space-y-8">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4">Core Orchestrators</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { id: 'audience', name: 'PersonaLab', desc: 'Refine audiences', icon: 'groups', color: 'text-google-blue', bg: 'bg-blue-50' },
                        { id: 'content-creator', name: 'Creator', desc: 'Draft content', icon: 'edit_note', color: 'text-google-red', bg: 'bg-red-50' },
                        { id: 'market-radar', name: 'Radar', desc: 'Check competitors', icon: 'radar', color: 'text-google-yellow', bg: 'bg-yellow-50' },
                        { id: 'website-dev', name: 'Builder', desc: 'Design components', icon: 'web', color: 'text-google-green', bg: 'bg-green-50' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => navigateToModule(item.id as any)}
                            className="bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 text-left group border-b-4 border-b-transparent hover:border-b-gray-100"
                        >
                            <div className={`size-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </div>
                            <p className="font-display font-bold text-gray-900 text-xl mb-1">{item.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{item.desc}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;