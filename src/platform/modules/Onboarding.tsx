import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { IconCpu } from '../constants';

const Onboarding: React.FC = () => {
    const { createProject } = useProject();
    const [step, setStep] = useState<'welcome' | 'education' | 'setup'>('welcome');
    const [projectName, setProjectName] = useState('');
    const [projectPurpose, setProjectPurpose] = useState('');
    const [projectUrl, setProjectUrl] = useState('');

    const handleStart = () => setStep('education');
    const handleNextToSetup = () => setStep('setup');

    const handleInitialize = () => {
        if (projectName && projectPurpose) {
            createProject(projectName, projectPurpose, projectUrl);
        }
    };

    const tools = [
        {
            title: "AI Marketing Co-Pilot",
            description: "Your digital strategist that helps you navigate complex market landscapes and identifies growth opportunities.",
            icon: "rocket_launch",
            color: "bg-google-blue/10 text-google-blue"
        },
        {
            title: "Automated Content",
            description: "Generate high-quality, brand-consistent content across all your channels in seconds, not hours.",
            icon: "auto_fix_high",
            color: "bg-google-red/10 text-google-red"
        },
        {
            title: "Data Insights",
            description: "Deep analytics that reveal exactly how your brand is performing and where to pivot for maximum impact.",
            icon: "insights",
            color: "bg-google-yellow/10 text-google-yellow"
        }
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-gray-900">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-google-blue/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] size-[600px] bg-google-red/5 rounded-full blur-[120px]"></div>

            <div className="max-w-4xl w-full z-10">
                {step === 'welcome' && (
                    <div className="text-center animate-slide-in-up">
                        <div className="inline-flex items-center justify-center bg-google-blue p-5 rounded-3xl mb-8 shadow-xl shadow-google-blue/20">
                            <IconCpu className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 tracking-tight mb-6">
                            Welcome to <span className="text-google-blue">OnLine.ai</span>
                        </h1>
                        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Your Strategic Operating System for the digital age. Let's initialize your first project and elevate your brand's presence.
                        </p>
                        <Button size="lg" className="px-12 py-4 text-lg rounded-2xl shadow-2xl shadow-google-blue/30" onClick={handleStart}>
                            Get Started
                        </Button>
                    </div>
                )}

                {step === 'education' && (
                    <div className="animate-slide-in-up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Powerful Tools at Your Fingertips</h2>
                            <p className="text-gray-500">Everything you need to orchestrate your business intelligence.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {tools.map((tool, idx) => (
                                <Card key={idx} className="p-8 border-none bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tool.color}`}>
                                        <span className="material-symbols-outlined text-3xl">{tool.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
                                </Card>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <Button size="lg" className="px-12 rounded-2xl" onClick={handleNextToSetup}>
                                Power Up My Brand
                            </Button>
                        </div>
                    </div>
                )}

                {step === 'setup' && (
                    <div className="max-w-2xl mx-auto animate-slide-in-up">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Initialize Your Strategic OS</h2>
                            <p className="text-gray-500">Provide some basic details and let the AI do the heavy lifting.</p>
                        </div>
                        <Card className="p-10 bg-white shadow-2xl border-gray-100 rounded-[2rem]">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Business Name</label>
                                    <input
                                        type="text"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl text-lg focus:bg-white focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue transition-all"
                                        placeholder="e.g., TechFlow Solutions"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Business Purpose / Description</label>
                                    <textarea
                                        rows={4}
                                        value={projectPurpose}
                                        onChange={(e) => setProjectPurpose(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl text-lg focus:bg-white focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue transition-all"
                                        placeholder="What does your business do? Who are your customers?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Existing Website (Optional)</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">language</span>
                                        <input
                                            type="url"
                                            value={projectUrl}
                                            onChange={(e) => setProjectUrl(e.target.value)}
                                            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent rounded-2xl text-lg focus:bg-white focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue transition-all"
                                            placeholder="https://yourwebsite.com"
                                        />
                                    </div>
                                    <p className="mt-3 text-xs text-gray-400 italic">We'll use this to pull brand assets and market data automatically.</p>
                                </div>
                                <div className="pt-6">
                                    <Button
                                        size="lg"
                                        className="w-full py-5 rounded-2xl text-lg font-bold shadow-xl shadow-google-blue/20"
                                        onClick={handleInitialize}
                                        disabled={!projectName || !projectPurpose}
                                    >
                                        Initialize Strategic OS
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
