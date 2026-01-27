import React from 'react';

const WebsitePlaceholder: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans text-gray-900">
            <div className="max-w-2xl px-6 text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Marketing Website
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    This service is currently under development by the dedicated Website Team.
                </p>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-left text-sm font-mono text-gray-500">
                    <p className="mb-2 font-bold text-gray-700">Deployment Status:</p>
                    <p>Service: <span className="text-green-600">Active</span></p>
                    <p>Mode: <span className="text-indigo-600">WEBSITE</span></p>
                    <p>Container: <span className="text-gray-900">marketing-website</span></p>
                </div>

                <div className="mt-8">
                    <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                        Go to Application Login &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WebsitePlaceholder;
