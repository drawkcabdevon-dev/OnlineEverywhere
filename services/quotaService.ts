
import { Project, PricingTier, TierLimits } from '../types';

export const TIER_CONFIG: Record<PricingTier, TierLimits> = {
    freelancer: {
        maxProjects: 1,
        maxProCalls: 5, // "The Hook"
        maxMediaCredits: 50,
        maxStrategyBriefs: 3, // Derived from Pro calls essentially
        maxSearchQueries: 20,
        canUseProModel: false, // Generally false, except for the 5 credits
        hasEnterprisePrivacy: true,
    },
    force_multiplier: {
        maxProjects: 3,
        maxProCalls: 'unlimited', // "The Sweet Spot"
        maxMediaCredits: 500,
        maxStrategyBriefs: 20, // Soft cap to prevent abuse?
        maxSearchQueries: 100,
        canUseProModel: true,
        hasEnterprisePrivacy: true,
    },
    agency: {
        maxProjects: 10,
        maxProCalls: 'unlimited',
        maxMediaCredits: 2000,
        maxStrategyBriefs: 500, // Hard Cap as per plan
        maxSearchQueries: 500,
        canUseProModel: true,
        hasEnterprisePrivacy: true,
    }
};

export const checkQuota = (project: Project, resource: 'project' | 'pro_call' | 'media_credit' | 'strategy_brief', cost: number = 1): { allowed: boolean; reason?: string } => {
    const tier = project.foundation.subscriptionTier || 'freelancer'; // Default to lowest
    const limits = TIER_CONFIG[tier];
    const stats = project.foundation.usageStats || { projectsCreated: 1, proCallsUsed: 0, mediaCreditsUsed: 0, totalStrategyBriefs: 0 };

    switch (resource) {
        case 'project':
            // This check usually happens at account level, but for MVP checking here against project mock
            if (stats.projectsCreated + cost > limits.maxProjects) {
                return { allowed: false, reason: `Project limit reached for ${tier} tier. Upgrade to create more.` };
            }
            break;
        case 'pro_call':
            if (limits.maxProCalls !== 'unlimited' && stats.proCallsUsed + cost > limits.maxProCalls) {
                return { allowed: false, reason: `Pro Call limit reached. Upgrade to Force Multiplier for unlimited access.` };
            }
            break;
        case 'media_credit':
            if (stats.mediaCreditsUsed + cost > limits.maxMediaCredits) {
                return { allowed: false, reason: `Media credits exhausted (${stats.mediaCreditsUsed}/${limits.maxMediaCredits}).` };
            }
            break;
        case 'strategy_brief':
            if (limits.maxStrategyBriefs !== 'unlimited' && stats.totalStrategyBriefs + cost > (limits.maxStrategyBriefs as number)) {
                return { allowed: false, reason: `Strategy Brief limit reached for this month.` };
            }
            break;
    }

    return { allowed: true };
};

export const getQuotaUsage = (project: Project) => {
    const tier = project.foundation.subscriptionTier || 'freelancer';
    const limits = TIER_CONFIG[tier];
    const stats = project.foundation.usageStats || { projectsCreated: 0, proCallsUsed: 0, mediaCreditsUsed: 0, totalStrategyBriefs: 0 };

    return {
        tier,
        limits,
        usage: stats,
        percentage: {
            media: (stats.mediaCreditsUsed / limits.maxMediaCredits) * 100,
            briefs: limits.maxStrategyBriefs === 'unlimited' ? 0 : (stats.totalStrategyBriefs / (limits.maxStrategyBriefs as number)) * 100
        }
    };
};
