import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as geminiService from '../../platform/services/geminiService';
import { Persona, Project } from '../../platform/types';
import Button from '../../platform/components/Button';
import Card from '../../platform/components/Card';

const PersonaDemo: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [persona, setPersona] = useState<Persona | null>(null);
    const [formData, setFormData] = useState({
        businessName: '',
        industry: '',
        audience: ''
    });

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const mockProject: any = {
            id: 'demo',
            userId: 'demo-user',
            name: formData.businessName,
            createdAt: new Date().toISOString(),
            foundation: {
                businessName: formData.businessName,
                businessType: 'Retail',
                industry: formData.industry,
                businessDescription: `A business in ${formData.industry} targeting ${formData.audience}.`,
                targetAudience: [formData.audience],
                brandVoice: 'Professional',
                objective: ['Growth'],
                websiteUrl: ''
            },
            suggestions: {
                audiences: [],
                objectives: [],
                personaRoles: [],
                personaGoals: [],
                personaPainPoints: []
            },
            personas: [],
            personaComparison: null,
            swot: null,
            competitors: [],
            competitorComparison: null,
            keywordStrategy: null,
            websiteComponents: [],
            activityLog: [],
            dashboardInsights: null,
            seoAudit: null,
            cmoBriefing: null,
            behavioralPlans: [],
            emailCampaigns: [],
            strategyBriefs: [],
            customization: {
                theme: 'Professional',
                colorMode: 'Light',
                primaryColor: '#4285F4',
                secondaryColor: '#34A853',
                accentColor: '#FBBC05',
                font: 'Inter',
                borderRadius: '1rem',
                buttonStyle: 'Solid'
            },
            integrations: {
                ga4: { connected: false },
                gsc: { connected: false }
            },
            visualAssets: [],
            googleSearchUpdates: [],
            googleSearchUpdatesLastChecked: null,
            lastContentCreatorResult: null
        };

        try {
            const result = await geminiService.createPersonaWithCxMap(mockProject, {
                role: 'Primary Customer',
                goals: [],
                painPoints: []
            });
            setPersona(result);
        } catch (error) {
            console.error("Demo generation failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-24 bg-surface border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4 font-display">The Central Brain in Action</h2>
                    <h3 className="text-4xl lg:text-5xl font-display font-bold text-navy-deep tracking-tight mb-6">Experience Ollie's Intelligence.</h3>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Input your business details and watch Ollie architect a complete target persona and customer journey map in seconds.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Input Form */}
                    <div className="w-full lg:w-1/3 bg-white p-8 lg:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-navy-deep mb-2 uppercase tracking-tighter">Business Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-surface focus:ring-2 focus:ring-google-blue outline-none transition-all font-medium"
                                    placeholder="e.g., Global Logistics Pro"
                                    value={formData.businessName}
                                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-navy-deep mb-2 uppercase tracking-tighter">Industry</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-surface focus:ring-2 focus:ring-google-blue outline-none transition-all font-medium"
                                    placeholder="e.g., Supply Chain Automation"
                                    value={formData.industry}
                                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-navy-deep mb-2 uppercase tracking-tighter">Target Segment</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-surface focus:ring-2 focus:ring-google-blue outline-none transition-all font-medium"
                                    placeholder="e.g., Mid-market CTOs"
                                    value={formData.audience}
                                    onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full py-5 rounded-2xl bg-google-blue text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-lg shadow-google-blue/20"
                                isLoading={isLoading}
                                disabled={isLoading}
                            >
                                <span className="material-symbols-outlined">psychology</span>
                                Generate Strategy
                            </Button>
                        </form>
                    </div>

                    {/* Output Area */}
                    <div className="w-full lg:w-2/3 min-h-[500px] relative">
                        <AnimatePresence mode="wait">
                            {!persona && !isLoading && (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/50 border-2 border-dashed border-gray-200 rounded-[3rem]"
                                >
                                    <div className="w-24 h-24 rounded-full bg-google-blue/5 flex items-center justify-center text-google-blue mb-6">
                                        <span className="material-symbols-outlined text-5xl animate-pulse">monitoring</span>
                                    </div>
                                    <h4 className="text-2xl font-display font-bold text-navy-deep mb-2">Awaiting Intelligence</h4>
                                    <p className="text-gray-400">Your strategic blueprint will appear here.</p>
                                </motion.div>
                            )}

                            {isLoading && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3rem] border border-gray-100 shadow-inner"
                                >
                                    <div className="relative mb-8">
                                        <div className="w-32 h-32 rounded-full border-4 border-google-blue/10 border-t-google-blue animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-google-blue">psychology</span>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-display font-bold text-navy-deep mb-2">Ollie is Architecting...</h4>
                                    <p className="text-gray-400">Mapping psychological motivators and journey friction points.</p>
                                </motion.div>
                            )}

                            {persona && !isLoading && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Persona Card */}
                                    <Card className="p-8 lg:p-12 border-none shadow-2xl bg-white rounded-[3rem]">
                                        <div className="flex items-center gap-6 mb-10">
                                            <div className="w-20 h-20 rounded-full bg-google-blue text-white flex items-center justify-center text-3xl font-bold font-display shadow-lg shadow-google-blue/20">
                                                {persona.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-3xl font-display font-bold text-navy-deep">{persona.name}</h4>
                                                <p className="text-lg text-google-blue font-bold">{persona.role}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <h5 className="flex items-center gap-2 text-google-green font-bold uppercase tracking-widest text-xs">
                                                    <span className="material-symbols-outlined text-sm">target</span>
                                                    Strategic Goals
                                                </h5>
                                                <ul className="space-y-3">
                                                    {persona.goals.map((g, i) => (
                                                        <li key={i} className="flex gap-3 text-gray-600 font-medium leading-relaxed">
                                                            <span className="text-google-green text-sm">●</span> {g}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="space-y-6">
                                                <h5 className="flex items-center gap-2 text-google-red font-bold uppercase tracking-widest text-xs">
                                                    <span className="material-symbols-outlined text-sm">error</span>
                                                    Pain Points
                                                </h5>
                                                <ul className="space-y-3">
                                                    {persona.painPoints.map((p, i) => (
                                                        <li key={i} className="flex gap-3 text-gray-600 font-medium leading-relaxed">
                                                            <span className="text-google-red text-sm">●</span> {p}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Journey Map Preview */}
                                    <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                                        <div className="flex gap-6 min-w-max">
                                            {persona.cxMap.stages.map((stage, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="w-72 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-sm"
                                                >
                                                    <span className="text-[10px] font-bold text-google-blue uppercase tracking-widest mb-2 block">{`Stage 0${i + 1}`}</span>
                                                    <h6 className="text-lg font-bold text-navy-deep mb-4">{stage.name}</h6>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Touchpoints</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {stage.touchpoints.map((t, j) => (
                                                                    <span key={j} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-lg border border-gray-100">{t}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-500 italic leading-relaxed">
                                                            "{stage.actionPrompt.substring(0, 100)}..."
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonaDemo;
