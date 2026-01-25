import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import * as geminiService from '../services/geminiService';
import { HtmlComponent, Customization, KeywordCluster, SeoIssue, Persona } from '../types';
import Modal from '../components/Modal';
import Section from '../components/Section';
import Spinner from '../components/Spinner';

const ThemePanel: React.FC = () => {
    const { activeProject, updateCustomization } = useProject();
    if (!activeProject) return null;

    const { customization } = activeProject;

    const handleUpdate = (field: keyof Customization, value: string) => {
        updateCustomization({ [field]: value });
    };

    const ColorInput: React.FC<{ label: string; value: string; field: keyof Customization }> = ({ label, value, field }) => (
        <div>
            <label className="text-sm font-medium text-text-muted flex items-center justify-between">
                {label}
                <span className="text-xs uppercase opacity-70">{value}</span>
            </label>
            <div className="relative mt-1">
                <input type="color" value={value} onChange={e => handleUpdate(field, e.target.value)} className="absolute w-full h-full opacity-0 cursor-pointer" />
                <div className="w-full h-10 rounded-md border border-border" style={{ backgroundColor: value }}></div>
            </div>
        </div>
    );
    
    const SelectInput: React.FC<{ label: string; value: string; field: keyof Customization; options: string[]}> = ({ label, value, field, options }) => (
        <div>
            <label className="text-sm font-medium text-text-muted">{label}</label>
            <select value={value} onChange={e => handleUpdate(field, e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white">
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );

    return (
        <Section title="Project Theme" description="Define the visual style for all generated components.">
            <div className="space-y-4">
                 <div className="grid grid-cols-3 gap-2">
                    <ColorInput label="Primary" value={customization.primaryColor} field="primaryColor" />
                    <ColorInput label="Secondary" value={customization.secondaryColor} field="secondaryColor" />
                    <ColorInput label="Accent" value={customization.accentColor} field="accentColor" />
                 </div>
                 <SelectInput label="Theme / Tone" value={customization.theme} field="theme" options={['Professional', 'Playful', 'Minimalist', 'Elegant']} />
                 <SelectInput label="Font" value={customization.font} field="font" options={['Inter', 'Roboto', 'Lora', 'Montserrat']} />
                 <SelectInput label="Corner Style" value={customization.borderRadius} field="borderRadius" options={['0px', '4px', '8px', '16px', '999px']} />
            </div>
        </Section>
    );
};


const WebsiteBuilder: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigationPayload, clearNavigationPayload, updateCustomization } = useProject();
    
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [isWireframe, setIsWireframe] = useState(false);
    const [inspiration, setInspiration] = useState<any>(null);
    const [selectedComponent, setSelectedComponent] = useState<HtmlComponent | null>(null);

    // Refinement State
    const [refinePrompt, setRefinePrompt] = useState('');
    const [isRefining, setIsRefining] = useState(false);
    
    // Style Variation State
    const [styleVariations, setStyleVariations] = useState<Omit<HtmlComponent, 'id'>[]>([]);
    const [isGeneratingVariations, setIsGeneratingVariations] = useState(false);
    const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);

    // Strategic Generation State
    const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
    type GenerationStrategy = 'keyword' | 'seo' | 'persona';
    const [strategyTab, setStrategyTab] = useState<GenerationStrategy>('keyword');
    const [selectedStrategyId, setSelectedStrategyId] = useState<string>('');


    useEffect(() => {
        if (navigationPayload) {
            if(navigationPayload.description) setDescription(navigationPayload.description);
            if(navigationPayload.inspiration) setInspiration(navigationPayload.inspiration);
            clearNavigationPayload();
        }
    }, [navigationPayload, clearNavigationPayload]);

    useEffect(() => {
        if (activeProject && activeProject.websiteComponents.length > 0 && !selectedComponent) {
            setSelectedComponent(activeProject.websiteComponents[0]);
        }
        if (activeProject && activeProject.websiteComponents.length === 0) {
            setSelectedComponent(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeProject?.websiteComponents]);


    const handleGenerate = async () => {
        if (!activeProject || !description) return;
        setIsLoading(true);
        try {
            let resultData;
            if(isWireframe) {
                resultData = await geminiService.generateWireframe(activeProject, description);
            } else {
                resultData = await geminiService.generateHtmlSection(activeProject, description, inspiration);
            }
            const newComponent: HtmlComponent = {
                ...resultData,
                id: crypto.randomUUID(),
                isWireframe,
                inspiration,
            };

            updateActiveProject(p => ({ ...p, websiteComponents: [...p.websiteComponents, newComponent] }));
            logActivity(`Generated ${isWireframe ? 'wireframe' : 'component'}: ${newComponent.name}`, 'website-dev', newComponent);
            
            setSelectedComponent(newComponent);
            setDescription('');
            setInspiration(null);
            setIsWireframe(false);
        } catch (error) {
            console.error("Failed to generate component", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStrategicGenerate = async () => {
        if (!activeProject || !selectedStrategyId) return;

        let payload: geminiService.StrategicComponentPayload | null = null;
        let logMessage = '';

        if (strategyTab === 'keyword' && activeProject.keywordStrategy) {
            const cluster = activeProject.keywordStrategy.clusters.find(c => c.theme === selectedStrategyId);
            if (cluster) {
                payload = { strategy: 'keyword', data: cluster };
                logMessage = `Generated component from keyword cluster: "${cluster.theme}"`;
            }
        } else if (strategyTab === 'seo' && activeProject.seoAudit) {
            const issue = activeProject.seoAudit.issues.find(i => i.description === selectedStrategyId);
            if (issue) {
                payload = { strategy: 'seo', data: issue };
                logMessage = `Generated component to fix SEO issue: "${issue.description.substring(0, 30)}..."`;
            }
        } else if (strategyTab === 'persona' && activeProject.personas) {
            const persona = activeProject.personas.find(p => p.id === selectedStrategyId);
            if (persona) {
                payload = { strategy: 'persona', data: persona };
                logMessage = `Generated component for persona: "${persona.name}"`;
            }
        }

        if (!payload) return;

        setIsLoading(true);
        setIsStrategyModalOpen(false);
        try {
            const resultData = await geminiService.generateStrategicHtmlSection(activeProject, payload);
             const newComponent: HtmlComponent = {
                ...resultData,
                id: crypto.randomUUID(),
            };
            updateActiveProject(p => ({ ...p, websiteComponents: [...p.websiteComponents, newComponent] }));
            logActivity(logMessage, 'website-dev', newComponent);
            setSelectedComponent(newComponent);
        } catch (error) {
            console.error("Failed to generate strategic component", error);
        } finally {
            setIsLoading(false);
            setSelectedStrategyId('');
        }
    };
    
    const handleRefine = async () => {
        if (!activeProject || !selectedComponent || !refinePrompt) return;
        setIsRefining(true);
        try {
            const refinedData = await geminiService.refineHtmlSection(activeProject, selectedComponent.htmlCode, refinePrompt);
            const updatedComponent = { ...selectedComponent, ...refinedData };
            
            updateActiveProject(p => ({
                ...p,
                websiteComponents: p.websiteComponents.map(c => c.id === updatedComponent.id ? updatedComponent : c),
            }));
            
            logActivity(`Refined component: ${updatedComponent.name}`, 'website-dev', { before: selectedComponent, after: updatedComponent, prompt: refinePrompt });
            setSelectedComponent(updatedComponent);
            setRefinePrompt('');
        } catch (error) {
            console.error("Failed to refine component", error);
        } finally {
            setIsRefining(false);
        }
    };
    
    const handleGenerateVariations = async () => {
        if (!activeProject || !selectedComponent) return;
        setIsGeneratingVariations(true);
        setIsVariationModalOpen(true);
        try {
            const variations = await geminiService.generateStyleVariations(activeProject, selectedComponent);
            setStyleVariations(variations);
        } catch (error) {
            console.error("Failed to generate style variations", error);
        } finally {
            setIsGeneratingVariations(false);
        }
    };

    const handleAdoptStyle = (customization: Customization) => {
        updateCustomization(customization);
        logActivity(`Adopted new style: ${customization.theme}`, 'website-dev', customization);
        setIsVariationModalOpen(false);
    };

    const handleDesignWireframe = async () => {
        if (!activeProject || !selectedComponent || !selectedComponent.isWireframe) return;
        setIsLoading(true);
        try {
            const designedData = await geminiService.designWireframe(activeProject, selectedComponent.htmlCode);
            const updatedComponent = { ...selectedComponent, ...designedData, isWireframe: false };
            
            updateActiveProject(p => ({
                ...p,
                websiteComponents: p.websiteComponents.map(c => c.id === updatedComponent.id ? updatedComponent : c),
            }));

            logActivity(`Designed wireframe: ${updatedComponent.name}`, 'website-dev', updatedComponent);
            setSelectedComponent(updatedComponent);
        } catch (error) {
            console.error("Failed to design wireframe", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePreview = () => {
        if (!selectedComponent || !activeProject) return;

        const { customization } = activeProject;
        const fontName = customization.font.replace(/ /g, '+');
        const bodyBackgroundColor = customization.colorMode === 'Dark' ? '#111827' : '#ffffff';

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Preview: ${selectedComponent.name}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=${fontName}:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    body {
                        background-color: ${bodyBackgroundColor};
                        margin: 0;
                        padding: 0;
                    }
                </style>
            </head>
            <body>
                ${selectedComponent.htmlCode}
            </body>
            </html>
        `;

        const newWindow = window.open("", "_blank");
        if (newWindow) {
            newWindow.document.write(htmlContent);
            newWindow.document.close();
        }
    };


    const components = activeProject?.websiteComponents || [];

    const renderStrategyOptions = () => {
        if (!activeProject) return <option>No project data available.</option>;
        
        const InfoCard: React.FC<{ title: string, moduleId: string }> = ({ title, moduleId }) => (
            <div className="text-center p-4 bg-surface rounded-lg border border-border">
                <p className="text-sm text-text-muted">No {title} found.</p>
                <Button variant="ghost" size="sm" className="mt-2" onClick={() => logActivity(`Navigated to ${moduleId}`, 'website-dev')}>
                    Go to {moduleId} to create one.
                </Button>
            </div>
        );

        switch (strategyTab) {
            case 'keyword':
                if (!activeProject.keywordStrategy?.clusters.length) return <InfoCard title="Keyword Strategies" moduleId="Keyword Strategist" />;
                return activeProject.keywordStrategy.clusters.map(cluster => (
                    <option key={cluster.theme} value={cluster.theme}>{cluster.theme}: {cluster.contentStrategy}</option>
                ));
            case 'seo':
                const contentIssues = activeProject.seoAudit?.issues.filter(i => i.description.toLowerCase().includes('content')) || [];
                 if (!contentIssues.length) return <InfoCard title="Content-related SEO Issues" moduleId="Page Performance Lab" />;
                return contentIssues.map(issue => (
                    <option key={issue.description} value={issue.description}>({issue.severity}) {issue.description}</option>
                ));
            case 'persona':
                 if (!activeProject.personas.length) return <InfoCard title="Personas" moduleId="PersonaLab" />;
                return activeProject.personas.map(persona => (
                    <option key={persona.id} value={persona.id}>{persona.name} ({persona.role})</option>
                ));
            default:
                return null;
        }
    };


    return (
        <ToolShell moduleId="website-dev">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <ThemePanel />

                    <Section title="Generate Component" description="Describe a section, or generate from project intelligence.">
                        {inspiration && (
                            <div className="mb-4 p-3 bg-secondary/10 rounded-lg text-sm text-secondary border border-secondary/20">
                                ✨ Inspired by: <span className="font-semibold">{inspiration.details}</span>
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-text-muted">Simple Prompt</label>
                                <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., A hero section with a title, subtitle, and a call-to-action button." className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Button onClick={handleGenerate} isLoading={isLoading} disabled={!description}>Generate</Button>
                                <div className="flex items-center">
                                    <input id="wireframe" type="checkbox" checked={isWireframe} onChange={e => setIsWireframe(e.target.checked)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-primary focus:ring-primary" />
                                    <label htmlFor="wireframe" className="ml-2 text-sm text-text-muted">as Wireframe</label>
                                </div>
                            </div>
                             <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-dashed border-border"></div>
                                <span className="flex-shrink mx-4 text-xs text-text-muted">OR</span>
                                <div className="flex-grow border-t border-dashed border-border"></div>
                            </div>
                             <Button onClick={() => setIsStrategyModalOpen(true)} variant="secondary" className="w-full">
                                ✨ Generate with Strategy
                            </Button>
                        </div>
                    </Section>
                    
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Saved Components ({components.length})</h3>
                        <ul className="space-y-1">
                             {components.map(c => (
                                <li key={c.id}>
                                    <button 
                                        onClick={() => setSelectedComponent(c)} 
                                        className={`w-full text-left p-2 rounded ${selectedComponent?.id === c.id ? 'bg-primary' : 'bg-surface hover:bg-border'}`}
                                        aria-current={selectedComponent?.id === c.id}
                                    >
                                        <p className="font-semibold text-white truncate">{c.name}</p>
                                        {c.isWireframe && <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-0.5 rounded-full">Wireframe</span>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <div className="p-4 bg-surface border-b border-border flex flex-wrap justify-between items-center gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white truncate">{selectedComponent?.name || 'Preview'}</h3>
                                <p className="text-sm text-text-muted truncate">{selectedComponent?.description}</p>
                            </div>
                            <div className="flex-shrink-0 flex items-center gap-2">
                                {selectedComponent && (
                                    <>
                                        {selectedComponent.isWireframe ? (
                                             <Button size="sm" onClick={handleDesignWireframe} isLoading={isLoading}>Design Wireframe</Button>
                                        ) : (
                                            <>
                                                <Button size="sm" variant="secondary" onClick={handleGenerateVariations}>Variations</Button>
                                                <Button size="sm" variant="ghost" onClick={handlePreview}>
                                                    Preview
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                                </Button>
                                            </>
                                        )}
                                        <Button size="sm" onClick={() => navigator.clipboard.writeText(selectedComponent.htmlCode)}>Copy HTML</Button>
                                    </>
                                )}
                            </div>
                        </div>


                        {selectedComponent && !selectedComponent.isWireframe && (
                            <div className="p-4 bg-surface border-b border-border">
                                <h4 className="text-sm font-semibold text-white mb-2">Refine with AI</h4>
                                <div className="flex items-center gap-2">
                                    <input type="text" value={refinePrompt} onChange={e => setRefinePrompt(e.target.value)} placeholder="e.g., Make the headline bolder and change the button text." className="flex-grow bg-gray-700 border-gray-600 rounded-md text-white text-sm p-2" />
                                    <Button size="sm" onClick={handleRefine} isLoading={isRefining} disabled={!refinePrompt}>Refine</Button>
                                </div>
                            </div>
                        )}
                        
                        <div className="bg-white rounded-b-lg">
                           {selectedComponent ? (
                                <iframe
                                    title="Component Preview"
                                    srcDoc={`<html><head></head><body style="margin:0;">${selectedComponent.htmlCode}</body></html>`}
                                    className="w-full h-[600px] border-0"
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            ) : (
                                <div className="h-[600px] flex items-center justify-center bg-gray-800 text-text-muted">
                                    {isLoading ? <Spinner showMessages/> : 'Generate a component to see the preview here.'}
                                </div>
                           )}
                        </div>
                    </Card>
                </div>
            </div>
            
            <Modal isOpen={isVariationModalOpen} onClose={() => setIsVariationModalOpen(false)} title={`Style Variations for "${selectedComponent?.name}"`}>
                {isGeneratingVariations ? (
                    <div className="flex justify-center items-center h-96"><Spinner showMessages size={40}/></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {styleVariations.map((v, i) => (
                            <Card key={i} className="flex flex-col">
                                <div className="bg-white rounded-t-lg h-48 overflow-hidden">
                                     <iframe
                                        title={`Variation ${i}`}
                                        srcDoc={`<html><head></head><body style="margin:0; overflow:hidden;"><div style="transform: scale(0.5); transform-origin: top left; width: 200%; height: 200%;">${v.htmlCode}</div></body></html>`}
                                        className="w-full h-full border-0"
                                        scrolling="no"
                                        sandbox="allow-scripts allow-same-origin"
                                    />
                                </div>
                                <div className="p-3 flex-grow flex flex-col">
                                    <h4 className="font-semibold text-white">{v.name}</h4>
                                    <p className="text-xs text-text-muted flex-grow">{v.description}</p>
                                    <Button size="sm" variant="secondary" className="w-full mt-3" onClick={() => handleAdoptStyle(v.customization!)}>
                                        Adopt Style
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Modal>

            <Modal isOpen={isStrategyModalOpen} onClose={() => setIsStrategyModalOpen(false)} title="Generate with Strategy">
                <div className="space-y-4">
                    <p className="text-sm text-text-muted">Create a component based on strategic data from other modules. This ensures your website is built with purpose.</p>
                    <div className="flex border-b border-border">
                        {(['keyword', 'seo', 'persona'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => { setStrategyTab(tab); setSelectedStrategyId(''); }}
                                className={`px-4 py-2 text-sm font-semibold transition-colors ${strategyTab === tab ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-white'}`}
                            >
                                {tab === 'keyword' ? 'From Keywords' : tab === 'seo' ? 'From SEO Audit' : 'For Persona'}
                            </button>
                        ))}
                    </div>
                    <div className="pt-4">
                         <label className="text-sm font-medium text-text-muted mb-2 block">
                            {strategyTab === 'keyword' && 'Select a Keyword Cluster'}
                            {strategyTab === 'seo' && 'Select an SEO Issue to Address'}
                            {strategyTab === 'persona' && 'Select a Target Persona'}
                        </label>
                        <select
                            value={selectedStrategyId}
                            onChange={(e) => setSelectedStrategyId(e.target.value)}
                            className="w-full bg-gray-700 border-gray-600 rounded-md text-white p-2"
                        >
                            <option value="">-- Select an option --</option>
                            {renderStrategyOptions()}
                        </select>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button onClick={handleStrategicGenerate} disabled={!selectedStrategyId}>Generate Strategic Component</Button>
                    </div>
                </div>
            </Modal>

        </ToolShell>
    );
};

export default WebsiteBuilder;