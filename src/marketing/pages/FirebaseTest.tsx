import React, { useEffect, useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const FirebaseDiagnostic: React.FC = () => {
    const [status, setStatus] = useState<string>('Checking...');
    const [apps, setApps] = useState<string[]>([]);
    const [config, setConfig] = useState<any>({});

    useEffect(() => {
        try {
            // 1. Check Config
            const envConfig = {
                apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Present (Start: ' + import.meta.env.VITE_FIREBASE_API_KEY.substring(0, 4) + ')' : 'MISSING',
                authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'MISSING',
                projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'MISSING',
            };
            setConfig(envConfig);

            // 2. Check Initialized Apps
            const activeApps = getApps();
            setApps(activeApps.map(app => app.name));

            // 3. Test Auth
            if (activeApps.length > 0) {
                const auth = getAuth();
                setStatus(`✅ Firebase Initialized. Auth ready. (SDK v${auth.app.options.apiKey ? 'Valid' : 'Unknown'})`);
            } else {
                setStatus('❌ No Firebase apps initialized.');
            }

        } catch (e: any) {
            setStatus(`❌ Error: ${e.message}`);
        }
    }, []);

    return (
        <div className="p-10 max-w-2xl mx-auto font-sans">
            <h1 className="text-2xl font-bold mb-6 text-blue-600">Firebase Diagnostic</h1>

            <div className="bg-gray-100 p-6 rounded-xl mb-6">
                <h2 className="font-bold mb-2">Status</h2>
                <p className="font-mono">{status}</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl mb-6">
                <h2 className="font-bold mb-2">Configuration Check</h2>
                <pre className="text-sm overflow-auto p-2 bg-white rounded border">
                    {JSON.stringify(config, null, 2)}
                </pre>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl">
                <h2 className="font-bold mb-2">Active Apps</h2>
                <pre className="text-sm">{JSON.stringify(apps, null, 2)}</pre>
            </div>
        </div>
    );
};

export default FirebaseDiagnostic;
