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
        if(!insights) {
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
            risk: { border: 'border-l-4 border-l-rose-500', iconBg: 'bg-rose-100', iconText: 'text-rose-600', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
            opportunity: { border: 'border-l-4 border-l-emerald-500', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
            action: { border: 'border-l-4 border-l-indigo-500', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        };
        
        const style = styles[type];

        if (!insight && !isLoadingInsights) return null;

        return (
            <div 
                className={`glass-panel p-5 rounded-xl ${style.border} mb-4 animate-fade-in-up card-hover`} 
                style={{ animationDelay: `${delay}ms` }}
            >
                <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${style.iconBg} ${style.iconText} flex-shrink-0`}>
                        {style.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                             <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</h4>
                             <span className="text-xs text-gray-400">Just now</span>
                        </div>
                        {isLoadingInsights ? (
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <h3 className="font-display font-bold text-gray-800 text-lg mb-2">{insight?.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{insight?.detail}</p>
                                {insight?.callToAction && (
                                    <Button 
                                        size="sm" 
                                        onClick={() => {
                                            let payload = insight.callToAction!.payload;
                                            if (typeof payload === 'string') {
                                                try { payload = JSON.parse(payload); } catch {}
                                            }
                                            navigateToModule(insight.callToAction!.moduleId, payload);
                                        }}
                                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
                                    >
                                        {insight.callToAction.text} &rarr;
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const handleQuickAction = () => {
        if(!quickActionInput) return;
        navigateToModule('content-creator', { topic: quickActionInput, mode: 'post' });
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Welcome / Quick Action Header */}
            <div className="text-center space-y-6 py-8">
                <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
                    Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">User Admin</span>.
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Your project <span className="font-semibold text-gray-800">{activeProject?.name}</span> is active. What would you like to create today?
                </p>
                
                <div className="relative max-w-xl mx-auto group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative flex bg-white rounded-full p-2 shadow-xl border border-gray-100">
                        <input 
                            type="text" 
                            className="flex-grow px-6 py-3 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent font-medium"
                            placeholder="e.g. Write a LinkedIn post about our new feature..."
                            value={quickActionInput}
                            onChange={(e) => setQuickActionInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleQuickAction()}
                        />
                        <button 
                            onClick={handleQuickAction}
                            className="bg-indigo-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>

            {/* Smart Feed */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-display">Your Smart Feed</h2>
                    <button onClick={handleRefreshInsights} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                        <svg className={`w-4 h-4 ${isLoadingInsights ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Refresh
                    </button>
                </div>

                {!activeProject?.foundation.businessDescription ? (
                    <div className="glass-panel p-8 text-center rounded-xl border-l-4 border-l-yellow-400">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Foundation Missing</h3>
                        <p className="text-gray-600 mb-4">The AI needs more context to generate insights for you.</p>
                        <Button onClick={openSettings}>Complete Project Foundation</Button>
                    </div>
                ) : (
                    <>
                        <InsightFeedItem type="action" title="Recommended Next Move" insight={insights?.nextMove} delay={0} />
                        <InsightFeedItem type="risk" title="Critical Risk" insight={insights?.biggestRisk} delay={100} />
                        <InsightFeedItem type="opportunity" title="Top Opportunity" insight={insights?.topOpportunity} delay={200} />
                    </>
                )}
            </div>
            
            {/* Modules Grid Quick Access */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200/50">
                 <button onClick={() => navigateToModule('audience')} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all text-left group">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <p className="font-bold text-gray-900">PersonaLab</p>
                    <p className="text-xs text-gray-500 mt-1">Refine audiences</p>
                 </button>
                 <button onClick={() => navigateToModule('content-creator')} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all text-left group">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
                    </div>
                    <p className="font-bold text-gray-900">Creator</p>
                    <p className="text-xs text-gray-500 mt-1">Draft content</p>
                 </button>
                 <button onClick={() => navigateToModule('market-radar')} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all text-left group">
                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 0 0 3.34 17.01"/><path d="M6 20h.01"/><path d="M9.62 21.71A10 10 0 0 0 17.01 20.66"/><path d="M20 18h.01"/><path d="M21.71 14.38A10 10 0 0 0 20.66 6.99"/><path d="M18 4h.01"/><path d="M12 12a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1Z"/></svg>
                    </div>
                    <p className="font-bold text-gray-900">Radar</p>
                    <p className="text-xs text-gray-500 mt-1">Check competitors</p>
                 </button>
                 <button onClick={() => navigateToModule('website-dev')} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all text-left group">
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.667 0-.424-.16-.832-.435-1.155-.55-.644-1.353-1.13-2.21-1.328a3.174 3.174 0 0 0-1.002-.128c-1.78 0-3.22 1.44-3.22 3.22s1.44 3.22 3.22 3.22a3.22 3.22 0 0 0 2.21-.803c.55-.472.856-1.14.856-1.843 0-1.49-1.21-2.7-2.7-2.7-1.1 0-2.22.6-2.22 1.5 0 .5.5 1 1 1s1-.5 1-1-.5-1-1-1-1 .5-1 1c0 .5.5 1 1 1s1-.5 1-1"/></svg>
                    </div>
                    <p className="font-bold text-gray-900">Builder</p>
                    <p className="text-xs text-gray-500 mt-1">Design components</p>
                 </button>
            </div>
        </div>
    );
};

export default Dashboard;