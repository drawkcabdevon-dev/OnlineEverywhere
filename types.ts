// FIX: Import ModuleId and ToolboxCategory from constants to break circular dependency.
import type { ModuleId, ToolboxCategory } from './constants';

// FIX: Re-export types so other modules can continue to import from here.
export type { ModuleId, ToolboxCategory } from './constants';


export interface User {
    id: string;
    email: string;
    name: string;
}

export interface Suggestion {
    name: string;
    description: string;
}

export interface ProjectFoundation {
    businessName: string;
    businessType: string;
    industry: string;
    targetAudience: string[];
    brandVoice: string;
    objective: string[];
    businessDescription: string;
    websiteUrl: string;
    competitorUrls?: string[];
    brandValues?: string[];
    geographicFocus?: 'Local' | 'Regional' | 'National' | 'Global';
    subscriptionTier?: 'freelancer' | 'force_multiplier' | 'agency';
    usageStats?: {
        projectsCreated: number;
        proCallsUsed: number;
        mediaCreditsUsed: number;
        totalStrategyBriefs: number;
    };
}

export type PricingTier = 'freelancer' | 'force_multiplier' | 'agency';

export interface TierLimits {
    maxProjects: number;
    maxProCalls: number | 'unlimited';
    maxMediaCredits: number;
    maxStrategyBriefs: number | 'unlimited';
    canUseProModel: boolean;
    hasEnterprisePrivacy: boolean;
}

export interface FoundationSuggestions {
    audiences: Suggestion[];
    objectives: Suggestion[];
    personaRoles: Suggestion[];
    personaGoals: Suggestion[];
    personaPainPoints: Suggestion[];
    contentTopics?: Suggestion[];
    campaignGoals?: Suggestion[];
    behavioralAnalysisPrompts?: Suggestion[];
}

export interface CxStage {
    name: string;
    touchpoints: string[];
    emotions: string[];
    frictionPoints: string[];
    opportunities: string[];
    actionPrompt?: string;
}

export interface Persona {
    id: string;
    name: string;
    role: string;
    goals: string[];
    painPoints: string[];
    psychologicalProfile?: {
        motivators: string[];
        persuasionTactics: string[];
        cognitiveBiases: string[];
    };
    strategicFit?: number; // 0-100 score relative to project objectives
    cxMap: {
        stages: CxStage[];
    };
}

export interface PersonaComparisonResult {
    analysis: string;
    rankings: {
        personaName: string;
        rank: number;
        reasoning: string;
        strategicAdvice: string;
    }[];
}

export interface SwotAnalysis {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface SeoMetrics {
    keywordStrategy: string;
    topKeywordClusters: { theme: string; keywords: string[] }[];
    topPages: { url: string; title: string; }[];
}

export interface SocialPresence {
    instagram: { handle: string; followers: string; } | null;
    facebook: { handle: string; followers: string; } | null;
    linkedin: { handle: string; followers: string; } | null;
    twitter: { handle: string; followers: string; } | null;
}

export interface CompetitorProfile {
    targetAudience: string;
    productOfferings: string[] | string;
    marketShare: string; // e.g., "Leader", "Challenger", "Niche Player"
    valueProposition: string;
}

export interface CompetitorSwot {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface CompetitiveAnalysis {
    id: string;
    competitorUrl: string;
    executiveSummary: string;
    profile: CompetitorProfile;
    swot: CompetitorSwot;
    marketingStrategy: string;
    seoMetrics: SeoMetrics;
    socialPresence: SocialPresence;
    sources?: { title: string; uri: string }[];
    rank?: number;
    contextualSummary?: string;
    winningAngles?: {
        title: string;
        description: string;
        isGenerative: boolean;
    }[];
}

export interface CompetitorComparisonResult {
    competitor1Url: string;
    competitor2Url: string;
    analysis: string;
    recommendation: string;
}

export interface CompetitiveAngleResult {
    analysis: string;
    angles: {
        title: string;
        description: string;
    }[];
}


export interface KeywordInfo {
    keyword: string;
    searchVolume: string;
    difficulty: 'Low' | 'Medium' | 'High';
    cpc: string;
    competition: 'Low' | 'Medium' | 'High';
    intent: 'Informational' | 'Navigational' | 'Commercial' | 'Transactional';
}

export interface KeywordCluster {
    theme: string;
    keywords: KeywordInfo[];
    contentStrategy: string;
}

export interface KeywordStrategyResult {
    seedTopic: string;
    clusters: KeywordCluster[];
    sources?: { title: string; uri: string }[];
    zeroClickOpportunities?: {
        keyword: string;
        question: string;
        answerSnippet: string;
    }[];
}

export interface Customization {
    theme: 'Professional' | 'Playful' | 'Minimalist' | 'Elegant';
    colorMode: 'Light' | 'Dark';
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    font: string;
    borderRadius: string;
    buttonStyle: string;
}

export interface HtmlComponent {
    id: string;
    name: string;
    description: string;
    htmlCode: string;
    personaId?: string;
    isVariant?: boolean;
    originalId?: string;
    inspiration?: {
        source: string;
        details: string;
    };
    isWireframe?: boolean;
    customization?: Customization;
}

export interface ActivityLog {
    id: string;
    timestamp: string;
    message: string;
    module: ModuleId;
    details?: any;
}

export interface Insight {
    title: string;
    detail: string;
    callToAction?: {
        text: string;
        moduleId: ModuleId;
        payload?: any;
    };
}

export interface CompetitorKeywordAnalysis {
    insight: string;
    chartData: { competitorUrl: string; keywordCount: number }[];
}

export interface DashboardInsights {
    biggestRisk: Insight;
    topOpportunity: Insight;
    nextMove: Insight;
    competitorKeywordAnalysis: CompetitorKeywordAnalysis | null;
}

export interface CmoBriefing {
    primaryObjective: string;
    situationOverview: string;
    strategicPillars: string[];
    actionPlan: string[];
}

export interface Ga4Plan {
    suggestedTags: { name: string; snippet: string }[];
    reportGuide: string;
}

export interface MetaPlan {
    pixelEvents: { eventName: string; description: string }[];
    apiPayloads: { name: string; payload: string }[];
}

export interface InferredBehaviorProfile {
    profileName: string;
    description: string;
    predictedGa4Path: string[];
    sourceTouchpoints: string[];
}

export interface PsychologicalAnalysis {
    primaryMotivator: string;
    identifiedBiases: string[];
    recommendedPersuasionTactic: string;
    analysisSummary: string;
}

export interface PersonalizationStrategy {
    suggestion: string;
    userExplanation: string;
    teamReasoning: string;
}

export interface ImplementationPlan {
    keyMetrics: string[];
    ga4Plan: Ga4Plan;
    metaPlan: MetaPlan;
}

export interface BehavioralIntelligencePlan {
    id: string;
    personaId: string;
    behavior: string; // This is the profileName
    sourceBehaviorProfile: InferredBehaviorProfile;
    psychologicalAnalysis: PsychologicalAnalysis;
    personalizationStrategy: PersonalizationStrategy;
    implementationPlan: ImplementationPlan;
}

export interface SeoAuditScore {
    organic: number;
    technical: number;
    content: number;
}

export interface TechnicalAuditItem {
    check: string;
    status: 'Pass' | 'Fail' | 'Warning';
    details: string;
}

export interface SeoIssue {
    severity: 'High' | 'Medium' | 'Low';
    description: string;
}

export interface SeoAction {
    step: number;
    title: string;
    description: string;
    isGenerative: boolean;
}

export interface PersonalizationOpportunity {
    opportunity: string;
    behaviorPrompt: string;
}

export interface ZeroClickAnalysis {
    readinessScore: number;
    opportunities: string[];
    threats: string[];
    recommendations: {
        title: string;
        description: string;
        isGenerative: boolean;
    }[];
}

export interface AiSearchLayerAnalysis {
    aeo: { score: number; justification: string };
    geo: { score: number; justification: string };
    aio: { score: number; justification: string };
    sxo: { score: number; justification: string };
}

export interface SeoAuditResult {
    auditedUrl: string;
    scores: SeoAuditScore;
    technicalAudit: TechnicalAuditItem[];
    issues: SeoIssue[];
    actions: SeoAction[];
    zeroClickAnalysis: ZeroClickAnalysis;
    aiSearchLayerAnalysis: AiSearchLayerAnalysis;
    sources?: { title: string; uri: string }[];
    suggestedSchema?: string;
    methodology?: string;
}

export interface PostGenerationResult {
    text: string;
    hashtags: string[];
    imagePrompt: string;
}

export interface ZeroClickItem {
    question: string;
    answer: string;
}

export interface ZeroClickResult {
    items: ZeroClickItem[];
    faqSchema: string;
}

export type GeneratedContentResult = PostGenerationResult | string[] | ZeroClickResult | HtmlComponent;

export type ContentMode = 'post' | 'comment' | 'qa' | 'article' | 'email' | 'ad_copy' | 'video_script';
export interface ContentOpportunity {
    title: string;
    description: string;
    callToAction: string;
    generationPayload: {
        mode: ContentMode;
        topic: string;
        context?: {
            personaId?: string;
            keywordClusterTheme?: string;
            seoIssue?: string;
        }
    }
}

export interface Email {
    id: string;
    subject: string;
    body: string;
}

export interface EmailCampaign {
    id: string;
    name: string;
    goal: string;
    personaId: string;
    emails: Email[];
    status?: 'draft' | 'sending' | 'sent';
    stats?: {
        sent: number;
        opened: number;
        clicked: number;
    };
    template?: 'plain' | 'modern' | 'urgent';
}

export interface CampaignTask {
    id: string;
    name: string;
    start: string; // ISO date string e.g., "2024-08-05"
    end: string;   // ISO date string e.g., "2024-08-10"
    dependencies: string[]; // array of task ids it depends on
}

export interface KeyMessage {
    id: string;
    message: string;
    personaAlignment: string;
}

export interface StrategyBrief {
    id: string;
    campaignGoal: string;
    targetPersonaId: string;
    keyMessaging: (string | KeyMessage)[];
    competitorAngle: string;
    recommendedActions: Insight[];
    strategicAlignment: string;
    campaignTimeline: CampaignTask[];
    kpiAndMeasurement?: {
        primaryKPIs: string[];
        measurementPlan: string;
    };
}

export interface Integrations {
    ga4: { connected: boolean };
    gsc: { connected: boolean };
}

export interface VisualAssetBase {
    id: string;
    type: 'generated-image' | 'edited-image' | 'generated-video';
    prompt: string;
    createdAt: string;
}

export interface GeneratedImage extends VisualAssetBase {
    type: 'generated-image';
    base64Image: string;
}

export interface EditedImage extends VisualAssetBase {
    type: 'edited-image';
    originalBase64Image: string;
    editedBase64Image: string;
}

export interface GeneratedVideo extends VisualAssetBase {
    type: 'generated-video';
    imageBase64: string;
    videoUrl: string;
    aspectRatio: '16:9' | '9:16';
}

export type VisualAsset = GeneratedImage | EditedImage | GeneratedVideo;

export interface GoogleUpdate {
    title: string;
    date: string;
    summary: string;
    sourceUri: string;
}

// --- Content Creator Types ---

export interface EmailContentResult {
    subjectLines: string[];
    previewText: string;
    body: string;
    ctaButton: string;
}

export interface AdCopyResult {
    headlines: string[];
    primaryText: string[];
    descriptions: string[];
    platform: 'Facebook' | 'Google' | 'LinkedIn';
}

export interface VideoScriptScene {
    scene: string;
    audio: string;
    visual: string;
}

export interface VideoScriptResult {
    title: string;
    hook: string;
    script: VideoScriptScene[];
    cta: string;
}

export interface Project {
    id: string;
    userId: string;
    name: string;
    createdAt: string;
    foundation: ProjectFoundation;
    suggestions: FoundationSuggestions;
    personas: Persona[];
    personaComparison: PersonaComparisonResult | null;
    swot: SwotAnalysis | null;
    competitors: CompetitiveAnalysis[];
    competitorComparison: CompetitorComparisonResult | null;
    keywordStrategy: KeywordStrategyResult | null;
    websiteComponents: HtmlComponent[];
    activityLog: ActivityLog[];
    dashboardInsights: DashboardInsights | null;
    seoAudit: SeoAuditResult | null;
    cmoBriefing: CmoBriefing | null;
    behavioralPlans: BehavioralIntelligencePlan[];
    emailCampaigns: EmailCampaign[];
    strategyBriefs: StrategyBrief[];
    customization: Customization;
    integrations: Integrations;
    visualAssets: VisualAsset[];
    googleSearchUpdates: GoogleUpdate[];
    googleSearchUpdatesLastChecked: string | null;
    lastContentCreatorResult: GeneratedContentResult | null;
    location?: {
        latitude: number;
        longitude: number;
    };
}