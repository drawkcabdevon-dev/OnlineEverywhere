
import { GoogleGenAI, Type, Modality } from "@google/genai";
import {
    Project, StrategyBrief, Suggestion, SwotAnalysis, DashboardInsights, GoogleUpdate,
    Persona, CompetitiveAnalysis, KeywordStrategyResult, HtmlComponent, Customization,
    InferredBehaviorProfile, BehavioralIntelligencePlan, SeoAuditResult, GeneratedContentResult,
    PostGenerationResult, ContentOpportunity, EmailCampaign, Email, CampaignTask,
    KeywordCluster, SeoIssue, KeywordInfo, Insight, CompetitorComparisonResult,
    ZeroClickResult, VisualAsset, GeneratedImage, EditedImage, GeneratedVideo,
    FoundationSuggestions, EmailContentResult, AdCopyResult, VideoScriptResult
} from '../types';
import { checkQuota } from './quotaService';
import { sanitizePromptInput } from './securityService';

const getAITool = () => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) {
        if (import.meta.env.DEV) {
            console.warn('Gemini API key is missing. AI features will be disabled. Add VITE_GEMINI_API_KEY to .env.local');
        }
        return null;
    }

    // SECURITY NOTE: This key is exposed in the browser bundle. To prevent unauthorized 
    // usage/costs in production, you MUST set "API Key Restrictions" in your Google Cloud 
    // Console (restrict by HTTP Referrer to your domain).
    return new GoogleGenAI({ apiKey: key, apiVersion: 'v1' });
};

const ai = getAITool();

export type StrategicComponentPayload =
    | { strategy: 'keyword'; data: KeywordCluster }
    | { strategy: 'seo'; data: SeoIssue }
    | { strategy: 'persona'; data: Persona };

const executeWithRetry = async <T>(fn: () => Promise<T>, retries = 3): Promise<T> => {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return executeWithRetry(fn, retries - 1);
        }
        throw error;
    }
};

const getBusinessContextPrompt = (project: Project) => {
    const f = project.foundation;
    return `
    BUSINESS CONTEXT:
    Name: ${f.businessName}
    Type: ${f.businessType}
    Industry: ${f.industry}
    Focus: ${f.geographicFocus || 'Not Specified'}
    Description: ${f.businessDescription}
    Target Audience: ${f.targetAudience.join(', ')}
    Brand Voice: ${f.brandVoice}
    Objectives: ${f.objective.join(', ')}
    `;
};

// --- Settings / Foundation ---

export const refreshProjectSuggestions = async (project: Project): Promise<FoundationSuggestions> => {
    const prompt = `
        ${getBusinessContextPrompt(project)}
        Generate a JSON object with suggestions for:
        - audiences: 3-5 potential target audience segments
        - objectives: 3-5 marketing objectives
        - personaRoles: 3-5 job titles or roles for personas
        - personaGoals: 3-5 common goals for these personas
        - personaPainPoints: 3-5 common pain points
        - contentTopics: 3-5 content marketing topics
        - campaignGoals: 3-5 campaign goals
        Each suggestion should have a 'name' and a short 'description'.
    `;
    const schema = {
        type: Type.OBJECT,
        properties: {
            audiences: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
            objectives: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
            personaRoles: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
            personaGoals: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
            personaPainPoints: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
            contentTopics: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
            campaignGoals: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

const generateSuggestions = async (prompt: string): Promise<Suggestion[]> => {
    const schema = {
        type: Type.ARRAY,
        items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

export const suggestTargetAudience = async (project: Project) => generateSuggestions(`${getBusinessContextPrompt(project)} Suggest 3 target audiences.`);
export const suggestObjective = async (project: Project) => generateSuggestions(`${getBusinessContextPrompt(project)} Suggest 3 marketing objectives.`);
export const suggestCampaignObjectives = async (project: Project) => generateSuggestions(`${getBusinessContextPrompt(project)} Suggest 3 campaign goals.`);
export const suggestPersonaGoals = async (project: Project, role: string) => generateSuggestions(`${getBusinessContextPrompt(project)} Suggest 3 goals for a persona with role: ${role}.`);
export const suggestPersonaPainPoints = async (project: Project, role: string, goals: string) => generateSuggestions(`${getBusinessContextPrompt(project)} Suggest 3 pain points for persona ${role} who wants to ${goals}.`);

// --- Dashboard ---

export const generateSwotAnalysis = async (project: Project): Promise<SwotAnalysis> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate a SWOT analysis.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
            threats: { type: Type.ARRAY, items: { type: Type.STRING } },
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const getDashboardInsights = async (project: Project): Promise<DashboardInsights> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate strategic dashboard insights based on the business context.`;
    const insightSchema = {
        type: Type.OBJECT,
        properties: { title: { type: Type.STRING }, detail: { type: Type.STRING }, callToAction: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, moduleId: { type: Type.STRING }, payload: { type: Type.STRING } } } }
    };
    const schema = {
        type: Type.OBJECT,
        properties: {
            biggestRisk: insightSchema,
            topOpportunity: insightSchema,
            nextMove: insightSchema,
            competitorKeywordAnalysis: { type: Type.OBJECT, properties: { insight: { type: Type.STRING }, chartData: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { competitorUrl: { type: Type.STRING }, keywordCount: { type: Type.NUMBER } } } } } }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const getGoogleSearchUpdates = async (project: Project): Promise<GoogleUpdate[]> => {
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                date: { type: Type.STRING },
                summary: { type: Type.STRING },
                sourceUri: { type: Type.STRING }
            }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: "List the latest confirmed Google Search algorithm updates from the last 6 months." }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

// --- PersonaLab ---

export const generatePersonaBatch = async (project: Project, criteria: any, count: number): Promise<Persona[]> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate ${count} distinct personas. Criteria: ${JSON.stringify(criteria)}. 
    For each persona, include a deep psychological profile (motivators, persuasion tactics, and common cognitive biases) and a "strategicFit" score (0-100) based on how well this persona aligns with the primary business objectives.`;
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                role: { type: Type.STRING },
                goals: { type: Type.ARRAY, items: { type: Type.STRING } },
                painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                psychologicalProfile: {
                    type: Type.OBJECT,
                    properties: {
                        motivators: { type: Type.ARRAY, items: { type: Type.STRING } },
                        persuasionTactics: { type: Type.ARRAY, items: { type: Type.STRING } },
                        cognitiveBiases: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                },
                strategicFit: { type: Type.NUMBER },
                cxMap: { type: Type.OBJECT, properties: { stages: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, touchpoints: { type: Type.ARRAY, items: { type: Type.STRING } }, emotions: { type: Type.ARRAY, items: { type: Type.STRING } }, frictionPoints: { type: Type.ARRAY, items: { type: Type.STRING } }, opportunities: { type: Type.ARRAY, items: { type: Type.STRING } }, actionPrompt: { type: Type.STRING } } } } } }
            }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

export const createPersonaWithCxMap = async (project: Project, criteria: any): Promise<Persona> => {
    const batch = await generatePersonaBatch(project, criteria, 1);
    if (batch.length > 0) return { ...batch[0], id: crypto.randomUUID() };
    throw new Error("Failed to generate persona");
};

// --- MarketRadar ---

export const analyzeCompetitor = async (project: Project, url: string): Promise<CompetitiveAnalysis> => {
    const prompt = `${getBusinessContextPrompt(project)} Analyze this competitor URL: ${url}. 
    Provide a detailed executive summary, SWOT, marketing strategy, and SEO metrics. 
    CRITICAL: Identify 3 "Winning Angles"—specific strategic gaps or opportunities where our business can outperform this competitor (e.g., better pricing for SMEs, more localized content, superior CX for a specific persona).`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            competitorUrl: { type: Type.STRING },
            executiveSummary: { type: Type.STRING },
            profile: { type: Type.OBJECT, properties: { targetAudience: { type: Type.STRING }, productOfferings: { type: Type.ARRAY, items: { type: Type.STRING } }, marketShare: { type: Type.STRING }, valueProposition: { type: Type.STRING } } },
            swot: { type: Type.OBJECT, properties: { strengths: { type: Type.ARRAY, items: { type: Type.STRING } }, weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }, opportunities: { type: Type.ARRAY, items: { type: Type.STRING } }, threats: { type: Type.ARRAY, items: { type: Type.STRING } } } },
            marketingStrategy: { type: Type.STRING },
            seoMetrics: { type: Type.OBJECT, properties: { keywordStrategy: { type: Type.STRING }, topKeywordClusters: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { theme: { type: Type.STRING }, keywords: { type: Type.ARRAY, items: { type: Type.STRING } } } } }, topPages: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { url: { type: Type.STRING }, title: { type: Type.STRING } } } } } },
            socialPresence: { type: Type.OBJECT, properties: { instagram: { type: Type.OBJECT, properties: { handle: { type: Type.STRING }, followers: { type: Type.STRING } }, nullable: true }, facebook: { type: Type.OBJECT, properties: { handle: { type: Type.STRING }, followers: { type: Type.STRING } }, nullable: true }, linkedin: { type: Type.OBJECT, properties: { handle: { type: Type.STRING }, followers: { type: Type.STRING } }, nullable: true }, twitter: { type: Type.OBJECT, properties: { handle: { type: Type.STRING }, followers: { type: Type.STRING } }, nullable: true } } },
            rank: { type: Type.NUMBER },
            contextualSummary: { type: Type.STRING },
            winningAngles: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        isGenerative: { type: Type.BOOLEAN }
                    }
                }
            }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const suggestCompetitors = async (project: Project): Promise<{ url: string, reason: string }[]> => {
    const prompt = `${getBusinessContextPrompt(project)} Suggest 3-5 potential competitors.`;
    const schema = {
        type: Type.ARRAY,
        items: { type: Type.OBJECT, properties: { url: { type: Type.STRING }, reason: { type: Type.STRING } } }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

export const compareCompetitors = async (project: Project, c1: CompetitiveAnalysis, c2: CompetitiveAnalysis): Promise<CompetitorComparisonResult> => {
    const prompt = `Compare these two competitors: ${c1.competitorUrl} vs ${c2.competitorUrl}.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            competitor1Url: { type: Type.STRING },
            competitor2Url: { type: Type.STRING },
            analysis: { type: Type.STRING },
            recommendation: { type: Type.STRING }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const getKeywordDetails = async (project: Project, keyword: string): Promise<KeywordInfo> => {
    const prompt = `Provide metrics for keyword: "${keyword}".`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            keyword: { type: Type.STRING },
            searchVolume: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            cpc: { type: Type.STRING },
            competition: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            intent: { type: Type.STRING, enum: ['Informational', 'Navigational', 'Commercial', 'Transactional'] }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

// --- WebsiteBuilder ---

const componentSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        htmlCode: { type: Type.STRING },
        customization: { type: Type.OBJECT, properties: { theme: { type: Type.STRING }, colorMode: { type: Type.STRING }, primaryColor: { type: Type.STRING }, secondaryColor: { type: Type.STRING }, accentColor: { type: Type.STRING }, font: { type: Type.STRING }, borderRadius: { type: Type.STRING }, buttonStyle: { type: Type.STRING } }, nullable: true }
    }
};

export const generateHtmlSection = async (project: Project, description: string, inspiration?: any): Promise<HtmlComponent> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate a valid HTML snippet (using Tailwind CSS classes) for a website section: ${description}. Inspiration: ${JSON.stringify(inspiration)}`;
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: componentSchema }
    });
    return JSON.parse(response.text || '{}');
};

export const generateWireframe = async (project: Project, description: string): Promise<HtmlComponent> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate a low-fidelity wireframe HTML snippet (using Tailwind CSS) for: ${description}. Use gray placeholders.`;
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: componentSchema }
    });
    return JSON.parse(response.text || '{}');
};

export const generateStrategicHtmlSection = async (project: Project, payload: StrategicComponentPayload): Promise<HtmlComponent> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate a strategic HTML component based on: ${JSON.stringify(payload)}`;
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: componentSchema }
    });
    return JSON.parse(response.text || '{}');
};

export const refineHtmlSection = async (project: Project, htmlCode: string, instruction: string): Promise<HtmlComponent> => {
    const prompt = `Refine this HTML code: ${htmlCode}. Instruction: ${instruction}.`;
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: componentSchema }
    });
    return JSON.parse(response.text || '{}');
};

export const generateStyleVariations = async (project: Project, component: HtmlComponent): Promise<HtmlComponent[]> => {
    const prompt = `Generate 3 style variations for this component. Return as array.`;
    const schema = { type: Type.ARRAY, items: componentSchema };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

export const designWireframe = async (project: Project, htmlCode: string): Promise<HtmlComponent> => {
    const prompt = `Apply the project's brand style to this wireframe HTML: ${htmlCode}.`;
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: componentSchema }
    });
    return JSON.parse(response.text || '{}');
};

// --- KeywordStrategist ---

export const keywordStrategy = async (project: Project, topic: string): Promise<KeywordStrategyResult> => {
    const prompt = `${getBusinessContextPrompt(project)} Create a high-fidelity keyword strategy for topic: ${topic}. 
    Group keywords into semantic clusters with specific content strategies. 
    CRITICAL: Identify "Zero-Click Opportunities"—specific questions that appear in SERPs (e.g., "People Also Ask") for which we can provide direct, snippet-worthy answers to capture attention even without a click.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            seedTopic: { type: Type.STRING },
            clusters: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        theme: { type: Type.STRING },
                        contentStrategy: { type: Type.STRING },
                        keywords: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    keyword: { type: Type.STRING },
                                    searchVolume: { type: Type.STRING },
                                    difficulty: { type: Type.STRING },
                                    cpc: { type: Type.STRING },
                                    competition: { type: Type.STRING },
                                    intent: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            },
            zeroClickOpportunities: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        keyword: { type: Type.STRING },
                        question: { type: Type.STRING },
                        answerSnippet: { type: Type.STRING }
                    }
                }
            }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const generateKeywordStrategyForPersona = async (project: Project, persona: Persona): Promise<KeywordStrategyResult> => {
    return keywordStrategy(project, `Needs of ${persona.name} (${persona.role})`);
};

// --- StrategyBriefs ---

export const generateStrategyBrief = async (project: Project, campaignGoal: string, personaId?: string): Promise<Omit<StrategyBrief, 'id'>> => {
    const quota = checkQuota(project, 'pro_call', 1);
    if (!quota.allowed) throw new Error(quota.reason);

    // Also check strategy brief specific cap if it exists (for Agency hard cap)
    const briefQuota = checkQuota(project, 'strategy_brief', 1);
    if (!briefQuota.allowed) throw new Error(briefQuota.reason);

    const today = new Date().toLocaleDateString();
    const prompt = `${getBusinessContextPrompt(project)} 
    Current Date: ${today}.
    Campaign Goal: ${campaignGoal}. 
    Persona: ${personaId || 'Best Fit'}. 
    
    COMPETITIVE INTELLIGENCE: Incorporate winning angles from competitors: ${JSON.stringify(project.competitors.flatMap(c => c.winningAngles || []))}.
    PERSONA PSYCHOLOGY: Ensure key messaging aligns with target persona motivators and persuasion tactics.
    
    Generate a comprehensive Strategy Brief. 
    IMPORTANT: All dates in the campaignTimeline must be strictly in the future, starting after ${today}. Do not generate dates in the past.`;

    const schema = {
        type: Type.OBJECT,
        properties: {
            campaignGoal: { type: Type.STRING },
            targetPersonaId: { type: Type.STRING },
            keyMessaging: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, message: { type: Type.STRING }, personaAlignment: { type: Type.STRING } } } },
            competitorAngle: { type: Type.STRING },
            strategicAlignment: { type: Type.STRING },
            recommendedActions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, detail: { type: Type.STRING }, callToAction: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, moduleId: { type: Type.STRING }, payload: { type: Type.STRING } } } } } },
            campaignTimeline: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, name: { type: Type.STRING }, start: { type: Type.STRING }, end: { type: Type.STRING }, dependencies: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
            kpiAndMeasurement: { type: Type.OBJECT, properties: { primaryKPIs: { type: Type.ARRAY, items: { type: Type.STRING } }, measurementPlan: { type: Type.STRING } } }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema, thinkingConfig: { thinkingBudget: 32768 } }
    });
    return JSON.parse(response.text || '{}');
};

// --- BehavioralIntelligenceHub ---

export const analyzePersonaTouchpoints = async (project: Project, persona: Persona): Promise<InferredBehaviorProfile[]> => {
    const prompt = `${getBusinessContextPrompt(project)} Analyze digital touchpoints for persona: ${JSON.stringify(persona)}. 
    Identify 3-5 distinct behavioral profiles (e.g., "The Skeptical Researcher", "The ROI-Driven Decider"). 
    Leverage wait-times, click-depth, and referral sources to infer these. 
    Crucially, align these profiles with the persona's psychological profile (motivators: ${persona.psychologicalProfile?.motivators.join(', ')}).`;
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                profileName: { type: Type.STRING },
                description: { type: Type.STRING },
                predictedGa4Path: { type: Type.ARRAY, items: { type: Type.STRING } },
                sourceTouchpoints: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

export const generateBehavioralIntelligencePlan = async (project: Project, persona: Persona, profile: InferredBehaviorProfile): Promise<Omit<BehavioralIntelligencePlan, 'id' | 'personaId'>> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate a high-fidelity Behavioral Intelligence Plan for: ${JSON.stringify(profile)}. 
    Target Persona: ${persona.name} (${persona.role}). 
    Persona Motivators: ${persona.psychologicalProfile?.motivators.join(', ')}.
    Persona Persuasion Tactics: ${persona.psychologicalProfile?.persuasionTactics.join(', ')}.
    Provide an ethical, data-driven strategy to influence this specific behavior through personalization and precise GA4/Meta measurement.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            behavior: { type: Type.STRING },
            sourceBehaviorProfile: { type: Type.OBJECT, properties: { profileName: { type: Type.STRING }, description: { type: Type.STRING }, predictedGa4Path: { type: Type.ARRAY, items: { type: Type.STRING } }, sourceTouchpoints: { type: Type.ARRAY, items: { type: Type.STRING } } } },
            psychologicalAnalysis: { type: Type.OBJECT, properties: { primaryMotivator: { type: Type.STRING }, identifiedBiases: { type: Type.ARRAY, items: { type: Type.STRING } }, recommendedPersuasionTactic: { type: Type.STRING }, analysisSummary: { type: Type.STRING } } },
            personalizationStrategy: { type: Type.OBJECT, properties: { suggestion: { type: Type.STRING }, userExplanation: { type: Type.STRING }, teamReasoning: { type: Type.STRING } } },
            implementationPlan: { type: Type.OBJECT, properties: { keyMetrics: { type: Type.ARRAY, items: { type: Type.STRING } }, ga4Plan: { type: Type.OBJECT, properties: { suggestedTags: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, snippet: { type: Type.STRING } } } }, reportGuide: { type: Type.STRING } } }, metaPlan: { type: Type.OBJECT, properties: { pixelEvents: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { eventName: { type: Type.STRING }, description: { type: Type.STRING } } } }, apiPayloads: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, payload: { type: Type.STRING } } } } } } } }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

// --- PagePerformanceLab ---

export const seoAudit = async (project: Project, url: string): Promise<SeoAuditResult> => {
    const prompt = `Audit this URL: ${url}. Assume common issues if not crawlable.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            auditedUrl: { type: Type.STRING },
            scores: { type: Type.OBJECT, properties: { organic: { type: Type.NUMBER }, technical: { type: Type.NUMBER }, content: { type: Type.NUMBER } } },
            technicalAudit: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { check: { type: Type.STRING }, status: { type: Type.STRING }, details: { type: Type.STRING } } } },
            issues: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { severity: { type: Type.STRING }, description: { type: Type.STRING } } } },
            actions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { step: { type: Type.NUMBER }, title: { type: Type.STRING }, description: { type: Type.STRING }, isGenerative: { type: Type.BOOLEAN } } } },
            zeroClickAnalysis: { type: Type.OBJECT, properties: { readinessScore: { type: Type.NUMBER }, opportunities: { type: Type.ARRAY, items: { type: Type.STRING } }, threats: { type: Type.ARRAY, items: { type: Type.STRING } }, recommendations: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, isGenerative: { type: Type.BOOLEAN } } } } } },
            aiSearchLayerAnalysis: { type: Type.OBJECT, properties: { aeo: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } }, geo: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } }, aio: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } }, sxo: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } } } },
            suggestedSchema: { type: Type.STRING }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const suggestPersonalizationForSeo = async (project: Project, issues: SeoIssue[]) => {
    const prompt = `Suggest personalization opportunities for these SEO issues: ${JSON.stringify(issues)}.`;
    const schema = { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { opportunity: { type: Type.STRING }, behaviorPrompt: { type: Type.STRING } } } };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

// --- ContentCreator ---

export const generateContentOpportunities = async (project: Project): Promise<ContentOpportunity[]> => {
    const prompt = `${getBusinessContextPrompt(project)} Suggest 3 content opportunities.`;
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                callToAction: { type: Type.STRING },
                generationPayload: { type: Type.OBJECT, properties: { mode: { type: Type.STRING }, topic: { type: Type.STRING } } }
            }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

export const generatePost = async (project: Project, topic: string): Promise<PostGenerationResult> => {
    const prompt = `${getBusinessContextPrompt(project)} Write a social post about: ${topic}. Include hashtags and an image prompt.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            text: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            imagePrompt: { type: Type.STRING }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const generateComments = async (project: Project, topic: string): Promise<string[]> => {
    const prompt = `${getBusinessContextPrompt(project)} Write 3 comments for this post: ${topic}.`;
    const schema = { type: Type.ARRAY, items: { type: Type.STRING } };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

export const zeroClick = async (project: Project, topic: string): Promise<ZeroClickResult> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate Q&A and FAQ Schema for: ${topic}.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { question: { type: Type.STRING }, answer: { type: Type.STRING } } } },
            faqSchema: { type: Type.STRING }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const generateArticleComponent = async (project: Project, topic: string): Promise<HtmlComponent> => {
    return generateHtmlSection(project, `Blog Article about ${topic}`, null);
};

export const refinePost = async (project: Project, original: PostGenerationResult, prompt: string): Promise<PostGenerationResult> => {
    const p = `Refine this post: ${JSON.stringify(original)}. Instruction: ${prompt}`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            text: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            imagePrompt: { type: Type.STRING }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: p,
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

// --- EmailCampaigner ---

export const generateEmailCampaign = async (project: Project, goal: string, persona: Persona, count: number): Promise<Email[]> => {
    const prompt = `${getBusinessContextPrompt(project)} Write ${count} emails for goal: ${goal}. Target: ${persona.name}.`;
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                subject: { type: Type.STRING },
                body: { type: Type.STRING }
            }
        }
    };
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '[]');
};

// --- VisualStudio ---

export const generateImage = async (project: Project, prompt: string): Promise<string> => {
    const quota = checkQuota(project, 'media_credit', 10); // 10 credits per image?
    if (!quota.allowed) throw new Error(quota.reason);

    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' }
    });
    return response.generatedImages[0].image.imageBytes;
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Image, mimeType } },
                { text: prompt }
            ]
        },
        config: { responseModalities: [Modality.IMAGE] }
    });
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    return part?.inlineData?.data || '';
};

export const generateVideo = async (project: Project, prompt: string, imageBase64: string, mimeType: string, aspectRatio: '16:9' | '9:16'): Promise<string> => {
    const quota = checkQuota(project, 'media_credit', 50); // 50 credits per video?
    if (!quota.allowed) throw new Error(quota.reason);

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: { imageBytes: imageBase64, mimeType: mimeType },
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
    });

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) throw new Error("Video generation failed.");
    return `${uri}&key=${import.meta.env.VITE_GEMINI_API_KEY || ''}`;
};

// --- Advanced Content Creator ---

export const generateEmailContent = async (project: Project, topic: string, persona?: Persona): Promise<EmailContentResult> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate a high-converting email focused on: "${topic}".
    Target Audience: ${persona ? `${persona.name} (${persona.role}) - Motivators: ${persona.psychologicalProfile?.motivators.join(', ')}` : 'General Audience'}.
    Structure: catchy subject lines, preview text, body copy, and a strong CTA.`;

    const schema = {
        type: Type.OBJECT,
        properties: {
            subjectLines: { type: Type.ARRAY, items: { type: Type.STRING } },
            previewText: { type: Type.STRING },
            body: { type: Type.STRING },
            ctaButton: { type: Type.STRING }
        }
    };

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};

export const generateAdCopy = async (project: Project, productInfo: string, platform: 'Facebook' | 'Google' | 'LinkedIn'): Promise<AdCopyResult> => {
    const prompt = `${getBusinessContextPrompt(project)} Generate ad copy for ${platform}. Product/Service Focus: "${productInfo}".
    Platform Best Practices: 
    - Facebook: engaging, story-driven, strong visual hook.
    - Google: keyword-rich, concise, benefit-driven.
    - LinkedIn: professional, value-props, B2B focus.`;

    const schema = {
        type: Type.OBJECT,
        properties: {
            headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
            primaryText: { type: Type.ARRAY, items: { type: Type.STRING } },
            descriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            platform: { type: Type.STRING, enum: ['Facebook', 'Google', 'LinkedIn'] }
        }
    };

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return { ...JSON.parse(response.text || '{}'), platform };
};

export const generateVideoScript = async (project: Project, topic: string): Promise<VideoScriptResult> => {
    const prompt = `${getBusinessContextPrompt(project)} Write a viral short-form video script (TikTok/Reels/Shorts) about: "${topic}".
    Structure: Hook (0-3s), Value Prop (3-30s), Call to Action (30-60s).`;

    const schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            script: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { scene: { type: Type.STRING }, audio: { type: Type.STRING }, visual: { type: Type.STRING } } } },
            cta: { type: Type.STRING }
        }
    };

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: schema }
    });
    return JSON.parse(response.text || '{}');
};
