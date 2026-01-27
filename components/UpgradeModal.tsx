import React from 'react';
import { createPortal } from 'react-dom';
import { useProject } from '../contexts/ProjectContext';
import { PricingTier } from '../types';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
    const { activeProject, updateActiveProject } = useProject();

    if (!isOpen) return null;

    const handleUpgrade = (tier: PricingTier) => {
        if (activeProject) {
            updateActiveProject(p => ({
                ...p,
                foundation: {
                    ...p.foundation,
                    subscriptionTier: tier
                }
            }));
            onClose();
        }
    };

    const tiers = [
        {
            id: 'freelancer',
            name: 'Freelancer',
            price: '$49',
            period: '/mo',
            description: 'Perfect for solo marketers starting out.',
            features: [
                '1 Project',
                '5 Pro Model Calls (Strategy Briefs)',
                '50 Media Credits (Images/Video)',
                '20 Search Queries',
                'Standard Privacy'
            ],
            color: 'bg-gray-700',
            btnColor: 'bg-gray-600',
            popular: false
        },
        {
            id: 'force_multiplier',
            name: 'Force Multiplier',
            price: '$129',
            period: '/mo',
            description: 'The standard for professional growth.',
            features: [
                '3 Projects',
                'Unlimited Pro Model Calls',
                '500 Media Credits',
                '100 Search Queries',
                'Enterprise-Grade Privacy'
            ],
            color: 'bg-indigo-900',
            btnColor: 'bg-indigo-600',
            popular: true
        },
        {
            id: 'agency',
            name: 'Agency',
            price: '$299',
            period: '/mo',
            description: 'Maximum power for multi-client management.',
            features: [
                '10 Projects',
                'Unlimited Pro Calls (Hard Cap 500)',
                '2,000 Media Credits',
                '500 Search Queries',
                'Enterprise-Grade Privacy'
            ],
            color: 'bg-purple-900',
            btnColor: 'bg-purple-600',
            popular: false
        }
    ];

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Unlock Strategic Power</h2>
                        <p className="text-gray-400">Choose the plan that fits your growth trajectory.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-gray-400">close</span>
                    </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`rounded-xl p-6 border ${activeProject?.foundation.subscriptionTier === tier.id ? 'border-primary ring-2 ring-primary/50' : 'border-gray-700'} ${tier.color} relative flex flex-col`}
                        >
                            {tier.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    MOST POPULAR
                                </span>
                            )}
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                                <div className="flex justify-center items-baseline mt-2">
                                    <span className="text-3xl font-bold text-white">{tier.price}</span>
                                    <span className="text-gray-300 ml-1">{tier.period}</span>
                                </div>
                                <p className="text-sm text-gray-300 mt-2">{tier.description}</p>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                                        <span className="material-symbols-outlined text-base text-green-400">check_circle</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(tier.id as PricingTier)}
                                className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 ${tier.btnColor} ${activeProject?.foundation.subscriptionTier === tier.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={activeProject?.foundation.subscriptionTier === tier.id}
                            >
                                {activeProject?.foundation.subscriptionTier === tier.id ? 'Current Plan' : 'Upgrade'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default UpgradeModal;
