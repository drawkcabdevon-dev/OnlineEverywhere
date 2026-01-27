import React from 'react';
import { Project } from '../types';
import { getQuotaUsage } from '../services/quotaService';
import Card from './Card';

interface UsageTrackerProps {
    project: Project;
}

const UsageTracker: React.FC<UsageTrackerProps> = ({ project }) => {
    const { tier, limits, usage, percentage } = getQuotaUsage(project);

    const getColor = (percent: number) => {
        if (percent >= 90) return 'bg-red-500';
        if (percent >= 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <Card className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <h3 className="font-bold text-white">Usage & Credits</h3>
                <span className="text-xs font-mono uppercase bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-600">
                    {tier.replace('_', ' ')}
                </span>
            </div>

            <div className="space-y-3">
                {/* Media Credits */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Media Credits</span>
                        <span className="text-gray-400">{usage.mediaCreditsUsed} / {limits.maxMediaCredits}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${getColor(percentage.media)}`}
                            style={{ width: `${Math.min(percentage.media, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Strategy Briefs / Pro Calls */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Strategy Briefs</span>
                        <span className="text-gray-400">
                            {limits.maxStrategyBriefs === 'unlimited'
                                ? `${usage.totalStrategyBriefs} (Unlimited)`
                                : `${usage.totalStrategyBriefs} / ${limits.maxStrategyBriefs}`}
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${getColor(percentage.briefs)}`}
                            style={{ width: `${Math.min(percentage.briefs, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <button className="w-full py-1.5 text-xs font-bold text-center text-primary border border-primary/30 rounded hover:bg-primary/10 transition-colors">
                    Upgrade Plan
                </button>
            </div>
        </Card>
    );
};

export default UsageTracker;
