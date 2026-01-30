import React, { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { GeneratedContentResult, PostGenerationResult, ZeroClickResult, HtmlComponent, ContentOpportunity, ContentMode } from '../types';
import CodeBlock from '../components/CodeBlock';
import Section from '../components/Section';
import Modal from '../components/Modal';
import SuggestionGenerator from '../components/SuggestionGenerator';

interface ModeConfig {
    title: string;
    inputLabel: string;
    placeholder: string;
    isTextarea: boolean;
}

const modeConfig: Record<ContentMode, ModeConfig> = {
    post: { title: 'Social Post', inputLabel: 'Topic', placeholder: 'e.g., The benefits of AI in content marketing.', isTextarea: false },
    comment: { title: 'Social Comments', inputLabel: 'Post to Reply To', placeholder: 'e.g., "AI is going to replace all marketing jobs..."', isTextarea: true },
    qa: { title: 'Q&A Snippets', inputLabel: 'Topic for Q&A', placeholder: 'e.g., How to improve website SEO in 2024.', isTextarea: false },
    article: { title: 'Blog Post Component', inputLabel: 'Topic for Article', placeholder: 'e.g., A complete guide to B2B SaaS marketing funnels.', isTextarea: false },
    email: { title: 'Email Campaign', inputLabel: 'Campaign Goal', placeholder: 'e.g., Nurture leads for the new SaaS product launch.', isTextarea: false },
    ad_copy: { title: 'Ad Copy', inputLabel: 'Product/Service', placeholder: 'e.g., AI Marketing Suite for Small Business.', isTextarea: false },
    video_script: { title: 'Video Script', inputLabel: 'Video Topic', placeholder: 'e.g., 3 ways to save time on marketing.', isTextarea: false },
};

const ContentCreator: React.FC = () => {
    const { activeProject, logActivity, updateActiveProject, navigateToModule } = useProject();
    const [isLoading, setIsLoading] = useState(false);

    // FIX: Read result from central state and get a setter for it.
    const result = activeProject?.lastContentCreatorResult ?? null;
    const setResult = (newResult: GeneratedContentResult | null) => {
        updateActiveProject(p => ({ ...p, lastContentCreatorResult: newResult }));
    };

    const [generatedImage, setGeneratedImage] = useState<{ url: string; isLoading: boolean } | null>(null);

    const [isManualMode, setIsManualMode] = useState(false);
    const [manualMode, setManualMode] = useState<ContentMode>('post');
    const [manualInput, setManualInput] = useState('');

    const [opportunities, setOpportunities] = useState<ContentOpportunity[]>([]);
    const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(true);

    const [refinePrompt, setRefinePrompt] = useState('');
    const [isRefining, setIsRefining] = useState(false);


    const fetchOpportunities = async () => {
        if (!activeProject) return;
        setIsLoadingOpportunities(true);
        try {
            const ops = await geminiService.generateContentOpportunities(activeProject);
            setOpportunities(ops);
        } catch (error) {
            console.error("Failed to fetch content opportunities", error);
        } finally {
            setIsLoadingOpportunities(false);
        }
    };

    useEffect(() => {
        fetchOpportunities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const runGeneration = async (mode: ContentMode, topic: string) => {
        if (!activeProject || !topic) return;
        setIsLoading(true);
        setResult(null);
        setGeneratedImage(null);
        setIsManualMode(false); // Close manual modal if open
        try {
            let response: GeneratedContentResult | null = null;
            let details: any = { mode, topic };
            switch (mode) {
                case 'post':
                    const postResponse = await geminiService.generatePost(activeProject, topic);
                    response = postResponse;
                    details = { ...details, ...postResponse };
                    if (postResponse.imagePrompt) {
                        setGeneratedImage({ url: '', isLoading: true });
                        try {
                            const imageB64 = await geminiService.generateImage(activeProject, postResponse.imagePrompt);
                            setGeneratedImage({ url: `data:image/png;base64,${imageB64}`, isLoading: false });
                        } catch (imgError) {
                            console.error("Image generation failed", imgError);
                            setGeneratedImage(null);
                        }
                    }
                    break;
                case 'comment':
                    response = await geminiService.generateComments(activeProject, topic);
                    details.comments = response;
                    break;
                case 'qa':
                    response = await geminiService.zeroClick(activeProject, topic);
                    details.qa = response;
                    break;
                case 'article':
                    const articleComponentData = await geminiService.generateArticleComponent(activeProject, topic);
                    const newArticleComponent: HtmlComponent = { ...articleComponentData, id: crypto.randomUUID() };
                    updateActiveProject(p => ({ ...p, websiteComponents: [...p.websiteComponents, newArticleComponent] }));
                    response = newArticleComponent;
                    details = newArticleComponent;
                    break;
                case 'email':
                    response = await geminiService.generateEmailContent(activeProject, topic);
                    details.email = response;
                    break;
                case 'ad_copy':
                    // Default to Google for now, or could add a selector
                    response = await geminiService.generateAdCopy(activeProject, topic, 'Google');
                    details.ad = response;
                    break;
                case 'video_script':
                    response = await geminiService.generateVideoScript(activeProject, topic);
                    details.video = response;
                    break;
            }
            if (response) setResult(response);
            logActivity(`Generated content in '${mode}' mode`, 'content-creator', details);
        } catch (error) {
            console.error(`Failed to generate content in mode ${mode}`, error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefinePost = async () => {
        if (!activeProject || !result || !('text' in result) || !refinePrompt) return;

        setIsRefining(true);
        try {
            const originalPost = result as PostGenerationResult;
            const refinedPost = await geminiService.refinePost(activeProject, originalPost, refinePrompt);
            setResult(refinedPost);

            // If image prompt changed, regenerate image
            if (refinedPost.imagePrompt !== originalPost.imagePrompt) {
                setGeneratedImage({ url: '', isLoading: true });
                try {
                    const imageB64 = await geminiService.generateImage(activeProject, refinedPost.imagePrompt);
                    setGeneratedImage({ url: `data:image/png;base64,${imageB64}`, isLoading: false });
                } catch (imgError) {
                    console.error("Image regeneration failed", imgError);
                    setGeneratedImage(null);
                }
            }

            logActivity(`Refined post with prompt: "${refinePrompt}"`, 'content-creator', { before: originalPost, after: refinedPost });
            setRefinePrompt('');

        } catch (error) {
            console.error("Failed to refine post", error);
        } finally {
            setIsRefining(false);
        }
    };


    const renderResult = () => {
        if (!result) return null;

        if ('htmlCode' in result) {
            const articleResult = result as HtmlComponent;
            return (
                <div className="text-center p-8 animate-slide-in-up space-y-4">
                    <div className="inline-block p-3 bg-green-500/20 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Article Component Created!</h3>
                    <p className="text-gray-300">Your article, <span className="font-semibold text-secondary">"{articleResult.name}"</span>, has been successfully added to the Website Builder.</p>
                    <Button onClick={() => navigateToModule('website-dev')}>View in Website Builder</Button>
                </div>
            );
        }
        if ('text' in result && 'hashtags' in result) {
            const postResult = result as PostGenerationResult;
            return (
                <div className="space-y-4 animate-slide-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-indigo-300 mb-1">Post Text</h4>
                                <p className="text-gray-200 whitespace-pre-wrap font-serif">{postResult.text}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-indigo-300 mb-2">Hashtags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {postResult.hashtags.map((tag, i) => <span key={i} className="bg-gray-700 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>)}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-indigo-300 mb-1">AI Image Prompt</h4>
                                <p className="text-sm text-gray-400 italic font-serif">"{postResult.imagePrompt}"</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-indigo-300 mb-2">Generated Image</h4>
                            <div className="w-full aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center overflow-hidden">
                                {generatedImage?.isLoading && <Spinner />}
                                {generatedImage?.url && !generatedImage.isLoading && <img src={generatedImage.url} alt={postResult.imagePrompt} className="w-full h-full object-cover" />}
                                {!generatedImage && <p className="text-xs text-gray-500">Image will appear here</p>}
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-semibold text-white mb-2">Refine with AI</h4>
                        <div className="flex items-center gap-2">
                            <input type="text" value={refinePrompt} onChange={e => setRefinePrompt(e.target.value)} placeholder="e.g., Make it more professional and add a CTA." className="flex-grow bg-gray-700 border-gray-600 rounded-md text-white text-sm p-2" />
                            <Button size="sm" onClick={handleRefinePost} isLoading={isRefining} disabled={!refinePrompt}>Refine</Button>
                        </div>
                    </div>
                </div>
            );
        }
        if (Array.isArray(result)) {
            return (
                <div className="space-y-3 animate-slide-in-up">
                    {result.map((comment, i) => (
                        <div key={i} className="bg-gray-900/50 p-3 rounded-md flex items-start space-x-3">
                            <div className="flex-shrink-0 bg-gray-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                            <p className="text-gray-200 font-serif">{comment}</p>
                        </div>
                    ))}
                </div>
            );
        }
        if ('items' in result) {
            const qaResult = result as ZeroClickResult;
            return (
                <div className="space-y-6 animate-slide-in-up">
                    {qaResult.items.map((item, i) => (
                        <div key={i}>
                            <h4 className="font-semibold text-indigo-300">{item.question}</h4>
                            <p className="text-sm text-gray-300 mt-1 font-serif">{item.answer}</p>
                        </div>
                    ))}
                    <div>
                        <h4 className="font-semibold text-indigo-300 mb-2">FAQPage Schema</h4>
                        <CodeBlock code={qaResult.faqSchema} />
                    </div>
                </div>
            );
        }
        if ('subjectLines' in result) {
            const emailResult = result as any; // Cast to EmailContentResult
            return (
                <div className="space-y-6 animate-slide-in-up">
                    <div>
                        <h4 className="font-semibold text-indigo-300 mb-2">Subject Lines</h4>
                        <ul className="list-disc list-inside text-gray-300 font-serif space-y-1">
                            {emailResult.subjectLines.map((s: string, i: number) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-indigo-300 mb-2">Email Body</h4>
                        <div className="bg-white text-gray-900 p-6 rounded-lg font-serif whitespace-pre-wrap">
                            <p className="text-sm text-gray-500 mb-4">{emailResult.previewText}</p>
                            {emailResult.body}
                            <div className="mt-6 text-center">
                                <span className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md font-sans font-bold">{emailResult.ctaButton}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if ('headlines' in result) {
            const adResult = result as any; // Cast to AdCopyResult
            return (
                <div className="space-y-6 animate-slide-in-up">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">Ad Copy ({adResult.platform})</h3>
                    </div>
                    <div className="grid gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                            <span className="text-xs text-indigo-400 uppercase font-bold">Headlines</span>
                            <ul className="mt-2 space-y-2">
                                {adResult.headlines.map((h: string, i: number) => <li key={i} className="text-gray-200 font-medium">{h}</li>)}
                            </ul>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                            <span className="text-xs text-indigo-400 uppercase font-bold">Primary Text</span>
                            <ul className="mt-2 space-y-2">
                                {adResult.primaryText.map((t: string, i: number) => <li key={i} className="text-gray-300 font-serif text-sm">{t}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        if ('script' in result) {
            const videoResult = result as any; // Cast to VideoScriptResult
            return (
                <div className="space-y-6 animate-slide-in-up">
                    <div>
                        <h3 className="text-xl font-bold text-white">{videoResult.title}</h3>
                        <p className="text-indigo-400 italic mt-1">{videoResult.hook}</p>
                    </div>
                    <div className="space-y-4">
                        {videoResult.script.map((scene: any, i: number) => (
                            <div key={i} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 font-bold text-sm">
                                    {i + 1}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">{scene.scene}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Visual</span>
                                            <p className="text-gray-300 text-sm">{scene.visual}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Audio/Script</span>
                                            <p className="text-white text-sm font-serif">"{scene.audio}"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30 text-center">
                        <span className="text-indigo-300 font-bold uppercase text-xs">Call to Action</span>
                        <p className="text-white font-bold mt-1">{videoResult.cta}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const contentLoadingMessages = [
        "Consulting with project personas...",
        "Reviewing keyword strategy...",
        "Analyzing competitor weaknesses...",
        "Brainstorming creative angles...",
        "Writing first draft...",
        "Optimizing for brand voice..."
    ];

    return (
        <ToolShell moduleId="content-creator">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Section
                        title="Your Next Move"
                        description="The AI has analyzed your project and recommends creating these assets next."
                    >
                        <div className="flex justify-end mb-4">
                            <Button onClick={fetchOpportunities} isLoading={isLoadingOpportunities} size="sm" variant="ghost">Refresh Suggestions</Button>
                        </div>
                        {isLoadingOpportunities && <div className="flex justify-center p-8"><Spinner /></div>}
                        {!isLoadingOpportunities && opportunities.length > 0 && (
                            <div className="space-y-3">
                                {opportunities.map((op, i) => (
                                    <Card key={i} className="p-4">
                                        <h4 className="font-semibold text-white">{op.title}</h4>
                                        <p className="text-sm text-text-muted mt-1 mb-3 font-serif">{op.description}</p>
                                        <Button size="sm" variant="secondary" onClick={() => runGeneration(op.generationPayload.mode, op.generationPayload.topic)}>
                                            {op.callToAction} &rarr;
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        )}
                        {!isLoadingOpportunities && opportunities.length === 0 && (
                            <p className="text-center text-text-muted p-4">No opportunities found yet. Try adding more data in other modules.</p>
                        )}
                        <div className="mt-4 border-t border-border pt-4">
                            <Button variant="ghost" className="w-full" onClick={() => setIsManualMode(true)}>
                                Or, create content manually...
                            </Button>
                        </div>
                    </Section>
                </div>
                <div>
                    <Section title="Generated Content" description="Your AI-crafted content appears here.">
                        <div className="min-h-[400px]">
                            {isLoading
                                ? <div className="flex justify-center p-8"><Spinner showMessages size={40} messages={contentLoadingMessages} /></div>
                                : result
                                    ? renderResult()
                                    : <div className="text-center p-8 text-gray-400">Select an opportunity to generate content.</div>
                            }
                        </div>
                    </Section>
                </div>
            </div>
            <Modal isOpen={isManualMode} onClose={() => setIsManualMode(false)} title="Manual Content Creation">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-text-muted">Content Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                            {Object.entries(modeConfig).map(([key, config]) => (
                                <button
                                    key={key}
                                    onClick={() => setManualMode(key as ContentMode)}
                                    className={`p-3 rounded-md text-sm font-semibold transition-colors ${manualMode === key ? 'bg-primary text-white' : 'bg-surface hover:bg-border text-text-base'}`}
                                >
                                    {config.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">{modeConfig[manualMode].inputLabel}</label>
                        {modeConfig[manualMode].isTextarea ? (
                            <textarea rows={5} value={manualInput} onChange={e => setManualInput(e.target.value)} placeholder={modeConfig[manualMode].placeholder} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                        ) : (
                            <input type="text" value={manualInput} onChange={e => setManualInput(e.target.value)} placeholder={modeConfig[manualMode].placeholder} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                        )}
                        <SuggestionGenerator
                            preloadedSuggestions={activeProject?.suggestions?.contentTopics || []}
                            onSelect={(suggestion) => setManualInput(suggestion)}
                            buttonText="Suggest Topics"
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button onClick={() => runGeneration(manualMode, manualInput)} disabled={!manualInput}>Generate</Button>
                    </div>
                </div>
            </Modal>
        </ToolShell>
    );
};

export default ContentCreator;