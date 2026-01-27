import React from 'react';
import { VisualAsset } from '../types';
import Button from './Button';

interface AssetGalleryProps {
    assets: VisualAsset[];
    onUseAsInput?: (asset: VisualAsset) => void;
}

const AssetGallery: React.FC<AssetGalleryProps> = ({ assets, onUseAsInput }) => {
    if (!assets || assets.length === 0) return null;

    return (
        <div className="mt-8 pt-8 border-t border-gray-700 animate-slide-in-up">
            <h3 className="text-lg font-bold text-white mb-4">Asset Library</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {assets.map((asset) => (
                    <div key={asset.id} className="group relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                        <div className="aspect-square w-full relative">
                            {asset.type === 'generated-video' ? (
                                <video src={asset.videoUrl} className="w-full h-full object-cover" controls />
                            ) : (
                                <img
                                    src={`data:image/png;base64,${asset.type === 'edited-image' ? asset.editedBase64Image : (asset as any).base64Image}`}
                                    alt={asset.prompt}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                {(asset.type !== 'generated-video') && onUseAsInput && (
                                    <div className="space-y-2">
                                        <Button size="sm" variant="secondary" onClick={() => onUseAsInput(asset)}>Use as Input</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-2">
                            <p className="text-xs text-gray-400 truncate" title={asset.prompt}>{asset.prompt}</p>
                            <span className="text-[10px] text-gray-500 uppercase font-bold">{asset.type.replace('-', ' ')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetGallery;
