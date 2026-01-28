

import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useError } from '../contexts/ErrorContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { VisualAsset, GeneratedImage, EditedImage, GeneratedVideo } from '../types';
import Section from '../components/Section';
import AssetGallery from '../components/AssetGallery';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); // Remove the data URI prefix
        };
        reader.onerror = error => reject(error);
    });
};

const VisualStudio: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity } = useProject();
    const { setError } = useError();
    const [activeTab, setActiveTab] = useState<'generate' | 'edit' | 'video'>('generate');

    // Image Generation State
    const [genPrompt, setGenPrompt] = useState('');
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

    // Image Editing State
    const [editPrompt, setEditPrompt] = useState('');
    const [originalImage, setOriginalImage] = useState<{ file: File; base64: string; url: string } | null>(null);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [editedImage, setEditedImage] = useState<EditedImage | null>(null);

    // Video Generation State
    const [videoPrompt, setVideoPrompt] = useState('');
    const [videoImage, setVideoImage] = useState<{ file: File; base64: string; url: string } | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoStatus, setVideoStatus] = useState('');
    const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(null);


    const handleGenerateImage = async () => {
        if (!activeProject || !genPrompt) return;
        setIsGeneratingImage(true);
        setGeneratedImage(null);
        try {
            const base64 = await geminiService.generateImage(activeProject, genPrompt);
            const newAsset: GeneratedImage = {
                id: crypto.randomUUID(),
                type: 'generated-image',
                prompt: genPrompt,
                base64Image: base64,
                createdAt: new Date().toISOString(),
            };
            setGeneratedImage(newAsset);
            updateActiveProject(p => ({ ...p, visualAssets: [newAsset, ...p.visualAssets] }));
            logActivity(`Generated image with prompt: "${genPrompt.substring(0, 30)}..."`, 'visual-studio', newAsset);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'edit' | 'video') => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            const url = URL.createObjectURL(file);
            if (type === 'edit') {
                setOriginalImage({ file, base64, url });
                setEditedImage(null);
            } else {
                setVideoImage({ file, base64, url });
                setGeneratedVideo(null);
            }
        }
    };

    const handleEditImage = async () => {
        if (!activeProject || !originalImage || !editPrompt) return;
        setIsEditingImage(true);
        setEditedImage(null);
        try {
            const editedBase64 = await geminiService.editImage(originalImage.base64, originalImage.file.type, editPrompt);
            const newAsset: EditedImage = {
                id: crypto.randomUUID(),
                type: 'edited-image',
                prompt: editPrompt,
                originalBase64Image: originalImage.base64,
                editedBase64Image: editedBase64,
                createdAt: new Date().toISOString(),
            };
            setEditedImage(newAsset);
            updateActiveProject(p => ({ ...p, visualAssets: [newAsset, ...p.visualAssets] }));
            logActivity(`Edited image with prompt: "${editPrompt.substring(0, 30)}..."`, 'visual-studio', newAsset);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsEditingImage(false);
        }
    };

    const handleGenerateVideo = async () => {
        if (!activeProject || !videoImage) return;
        setIsGeneratingVideo(true);
        setGeneratedVideo(null);
        setVideoStatus("Checking API key...");

        try {
            setVideoStatus("Initializing video generation...");
            const videoUrl = await geminiService.generateVideo(activeProject, videoPrompt, videoImage.base64, videoImage.file.type, aspectRatio);
            setVideoStatus("Video generation complete!");

            const newAsset: GeneratedVideo = {
                id: crypto.randomUUID(),
                type: 'generated-video',
                prompt: videoPrompt,
                imageBase64: videoImage.base64,
                videoUrl: videoUrl,
                aspectRatio,
                createdAt: new Date().toISOString(),
            };
            setGeneratedVideo(newAsset);
            updateActiveProject(p => ({ ...p, visualAssets: [newAsset, ...p.visualAssets] }));
            logActivity(`Generated video from image.`, 'visual-studio', newAsset);

        } catch (err: any) {
            setError(err.message);
            setVideoStatus(`Error: ${err.message}`);
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    const renderTabs = () => (
        <div className="flex border-b border-border">
            {(['generate', 'edit', 'video'] as const).map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-white'}`}
                >
                    {tab === 'generate' ? 'Image Generation' : tab === 'edit' ? 'Image Editing' : 'Video Generation'}
                </button>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'generate':
                return (
                    <Section title="Image Generation" description="Create high-quality images from text prompts using Imagen 4.">
                        <div className="flex items-end gap-2">
                            <div className="flex-grow">
                                <label className="text-sm font-medium text-text-muted">Prompt</label>
                                <input type="text" value={genPrompt} onChange={e => setGenPrompt(e.target.value)} placeholder="e.g., A photo of a Shiba Inu dog wearing a beret and black turtleneck." className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                            </div>
                            <Button onClick={handleGenerateImage} isLoading={isGeneratingImage} disabled={!genPrompt}>Generate</Button>
                        </div>
                        <div className="mt-4 w-full aspect-square bg-surface rounded-lg flex items-center justify-center overflow-hidden border border-border">
                            {isGeneratingImage && <Spinner showMessages />}
                            {generatedImage && <img src={`data:image/png;base64,${generatedImage.base64Image}`} alt={generatedImage.prompt} className="w-full h-full object-contain" />}
                        </div>
                    </Section>
                );
            case 'edit':
                return (
                    <Section title="Image Editing" description="Upload an image and use a prompt to modify it with Gemini 2.5 Flash Image.">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full aspect-square bg-surface rounded-lg flex items-center justify-center overflow-hidden border border-border">
                                {originalImage ? <img src={originalImage.url} alt="Original" className="w-full h-full object-contain" /> : <p className="text-sm text-text-muted">Upload Original Image</p>}
                            </div>
                            <div className="w-full aspect-square bg-surface rounded-lg flex items-center justify-center overflow-hidden border border-border">
                                {isEditingImage && <Spinner />}
                                {editedImage && <img src={`data:image/png;base64,${editedImage.editedBase64Image}`} alt="Edited" className="w-full h-full object-contain" />}
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div>
                                <label className="text-sm font-medium text-text-muted">Upload Image</label>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'edit')} className="mt-1 block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light" />
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="flex-grow">
                                    <label className="text-sm font-medium text-text-muted">Editing Prompt</label>
                                    <input type="text" value={editPrompt} onChange={e => setEditPrompt(e.target.value)} placeholder="e.g., Add a retro filter" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                                </div>
                                <Button onClick={handleEditImage} isLoading={isEditingImage} disabled={!originalImage || !editPrompt}>Edit</Button>
                            </div>
                        </div>
                    </Section>
                );
            case 'video':
                return (
                    <Section title="Video Generation" description="Upload a starting image and generate a short video with Veo.">
                        <div className="w-full bg-surface rounded-lg p-4 border border-border flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2 aspect-video bg-gray-900/50 rounded flex items-center justify-center overflow-hidden">
                                {isGeneratingVideo && <Spinner showMessages messages={[videoStatus, "This can take a few minutes..."]} />}
                                {generatedVideo && <video src={generatedVideo.videoUrl} controls autoPlay loop className="w-full h-full object-contain" />}
                                {!isGeneratingVideo && !generatedVideo && (videoImage ? <img src={videoImage.url} alt="Video start frame" className="w-full h-full object-contain" /> : <p className="text-sm text-text-muted">Preview</p>)}
                            </div>
                            <div className="w-full md:w-1/2 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-text-muted">1. Upload Starting Image</label>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'video')} className="mt-1 block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-text-muted">2. Add a Prompt (Optional)</label>
                                    <input type="text" value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} placeholder="e.g., The cat starts chasing a laser pointer" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-text-muted">3. Choose Aspect Ratio</label>
                                    <div className="flex gap-2 mt-1">
                                        <Button variant={aspectRatio === '16:9' ? 'primary' : 'secondary'} onClick={() => setAspectRatio('16:9')}>16:9 Landscape</Button>
                                        <Button variant={aspectRatio === '9:16' ? 'primary' : 'secondary'} onClick={() => setAspectRatio('9:16')}>9:16 Portrait</Button>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Button onClick={handleGenerateVideo} isLoading={isGeneratingVideo} disabled={!videoImage} className="w-full">Generate Video</Button>
                                    <p className="text-xs text-yellow-400 mt-2 text-center">Video generation requires an API key with the Veo model enabled. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Learn more about billing.</a></p>
                                </div>
                            </div>
                        </div>
                    </Section>
                );
        }
    };

    const handleUseAsInput = (asset: VisualAsset) => {
        if (asset.type === 'generated-video') return;

        // Convert asset to file/base64 compatible object
        const base64 = asset.type === 'edited-image' ? asset.editedBase64Image : (asset as any).base64Image;
        const mockFile = { file: new File([], "asset.png"), base64, url: `data:image/png;base64,${base64}` }; // Mock file object

        // Ask user where to send it? Or just default to 'edit' or 'video' based on current tab?
        // Better UX: Default to 'video' if on video tab, 'edit' if on edit tab. If on generate, switch to edit?

        if (activeTab === 'video') {
            setVideoImage(mockFile);
        } else {
            // Default to edit mode
            setOriginalImage(mockFile);
            setActiveTab('edit');
        }
    };

    return (
        <ToolShell moduleId="visual-studio">
            <Card className="p-6">
                {renderTabs()}
                <div className="pt-6">
                    {renderContent()}
                </div>

                <AssetGallery
                    assets={activeProject?.visualAssets || []}
                    onUseAsInput={handleUseAsInput}
                />
            </Card>
        </ToolShell>
    );
};

export default VisualStudio;