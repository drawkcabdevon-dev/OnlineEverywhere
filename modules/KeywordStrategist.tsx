import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import * as geminiService from '../services/geminiService';
import { KeywordStrategyResult, KeywordInfo, KeywordCluster } from '../types';
import Section from '../components/Section';
import Modal from '../components/Modal';

const KeywordStrategist: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity, navigationPayload, clearNavigationPayload, navigateToModule } = useProject();
    const [isLoading, setIsLoading] = useState(false);
    const [seedTopic, setSeedTopic] = useState('');
    const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');
    const [viewMode, setViewMode] = useState<'topic' | 'persona'>('topic');
    const [selectedKeyword, setSelectedKeyword] = useState<KeywordInfo | null>(null);

    const strategy = activeProject?.keywordStrategy;
    const personas = activeProject?.personas || [];

    React.useEffect(() => {
        if (navigationPayload?.personaId) {
            setSelectedPersonaId(navigationPayload.personaId);
            setViewMode('persona');
            clearNavigationPayload();
        }
    }, [navigationPayload, clearNavigationPayload]);

    const handleGenerate = async () => {
        if (!activeProject) return;
        setIsLoading(true);
        try {
            let result: KeywordStrategyResult;
            if (viewMode === 'topic' && seedTopic) {
                 result = await geminiService.keywordStrategy(activeProject, seedTopic);
                 logActivity(`Generated keyword strategy for topic: "${seedTopic}"`, 'keyword-strategist', result);
            } else if (viewMode === 'persona' && selectedPersonaId) {
                const persona = personas.find(p => p.id === selectedPersonaId);
                if (persona) {
                    result = await geminiService.generateKeywordStrategyForPersona(activeProject, persona);
                    logActivity(`Generated keyword strategy for persona: "${persona.name}"`, 'keyword-strategist', result);
                } else {
                    throw new Error("Persona not found");
                }
            } else {
                return;
            }
            
            updateActiveProject(p => ({ ...p, keywordStrategy: result }));
        } catch (error) {
            console.error("Failed to generate strategy", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCreateContent = (cluster: KeywordCluster) => {
        navigateToModule('content-creator', { 
            topic: `Create content based on keyword cluster: "${cluster.theme}". Target keywords: ${cluster.keywords.map(k => k.keyword).join(', ')}. Strategy: ${cluster.contentStrategy}`, 
            mode: 'article' 
        });
    }

    return (
        <ToolShell moduleId="keyword-strategist">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Section title="Generate Strategy" description="Develop keyword clusters based on a topic or a persona's needs.">
                         <div className="flex border-b border-gray-200 mb-4">
                            <button 
                                onClick={() => setViewMode('topic')} 
                                className={`flex-1 py-2 text-sm font-medium border-b-2 ${viewMode === 'topic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                By Topic
                            </button>
                            <button 
                                onClick={() => setViewMode('persona')} 
                                className={`flex-1 py-2 text-sm font-medium border-b-2 ${viewMode === 'persona' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                By Persona
                            </button>
                        </div>

                        <div className="space-y-4">
                            {viewMode === 'topic' ? (
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Seed Topic</label>
                                    <input 
                                        type="text" 
                                        value={seedTopic} 
                                        onChange={e => setSeedTopic(e.target.value)} 
                                        placeholder="e.g., Sustainable Fashion" 
                                        className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 p-2"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Select Persona</label>
                                    <select 
                                        value={selectedPersonaId} 
                                        onChange={e => setSelectedPersonaId(e.target.value)} 
                                        className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 p-2"
                                    >
                                        <option value="">-- Select --</option>
                                        {personas.map(p => <option key={p.id} value={p.id}>{p.name} ({p.role})</option>)}
                                    </select>
                                </div>
                            )}
                            <Button onClick={handleGenerate} isLoading={isLoading} disabled={viewMode === 'topic' ? !seedTopic : !selectedPersonaId} className="w-full">
                                Generate Strategy
                            </Button>
                        </div>
                    </Section>
                </div>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <div className="flex justify-center p-8"><Spinner showMessages messages={["Analyzing search trends...", "Clustering keywords...", "Mapping content intent..."]} /></div>
                    ) : strategy ? (
                        <div className="space-y-6 animate-slide-in-up">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">{strategy.seedTopic}</h2>
                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-bold">{strategy.clusters.length} Clusters Found</span>
                            </div>
                            
                            {strategy.clusters.map((cluster, i) => (
                                <Card key={i} className="p-0 border-gray-200 overflow-hidden shadow-sm">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{cluster.theme}</h3>
                                            <p className="text-sm text-gray-500 mt-1 max-w-xl">{cluster.contentStrategy}</p>
                                        </div>
                                        <Button size="sm" variant="secondary" onClick={() => handleCreateContent(cluster)}>Create Content</Button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vol</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diff</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intent</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {cluster.keywords.map((kw, j) => (
                                                    <tr 
                                                        key={j} 
                                                        onClick={() => setSelectedKeyword(kw)}
                                                        className="hover:bg-indigo-50 cursor-pointer transition-colors"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{kw.keyword}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kw.searchVolume}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                kw.difficulty === 'High' ? 'bg-red-100 text-red-800' : 
                                                                kw.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                                                'bg-green-100 text-green-800'
                                                            }`}>
                                                                {kw.difficulty}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kw.intent}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kw.cpc}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            ))}
                            
                             {strategy.sources && (
                                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-bold text-gray-700 mb-2">Sources</h4>
                                    <ul className="list-disc list-inside text-xs text-gray-500">
                                        {strategy.sources.map((s, i) => (
                                            <li key={i}><a href={s.uri} target="_blank" rel="noopener noreferrer" className="hover:underline text-indigo-600">{s.title || s.uri}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 bg-white border border-dashed border-gray-300 rounded-lg min-h-[300px]">
                            <p>No strategy generated yet.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <Modal isOpen={!!selectedKeyword} onClose={() => setSelectedKeyword(null)} title="Keyword Details">
                {selectedKeyword && (
                    <div className="space-y-4">
                         <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-900">{selectedKeyword.keyword}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white border border-gray-200 rounded">
                                <span className="text-xs text-gray-500 uppercase block">Intent</span>
                                <span className="font-semibold text-gray-800">{selectedKeyword.intent}</span>
                            </div>
                            <div className="p-3 bg-white border border-gray-200 rounded">
                                <span className="text-xs text-gray-500 uppercase block">Competition</span>
                                <span className="font-semibold text-gray-800">{selectedKeyword.competition}</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => setSelectedKeyword(null)}>Close</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </ToolShell>
    );
};

export default KeywordStrategist;