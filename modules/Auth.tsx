import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { IconCpu } from '../constants';

const Auth: React.FC = () => {
    const { signInWithGoogle, loading } = useAuth();
    const [error, setError] = React.useState<string | null>(null);

    const handleLogin = async () => {
        try {
            setError(null);
            await signInWithGoogle();
        } catch (err) {
            setError("Failed to sign in. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <Card className="p-8 max-w-sm w-full animate-slide-in-up bg-white shadow-xl border border-gray-200">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-[var(--color-primary)] p-3 rounded-xl mb-4 shadow-md shadow-indigo-200">
                        <IconCpu className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">OnLineEverywhere</h1>
                    <p className="text-gray-500 mt-1">AI Marketing Suite</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <p className="text-center text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    Sign in with your Google account to access the marketing suite.
                </p>

                <Button className="w-full" size="lg" onClick={handleLogin} disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in with Google'}
                </Button>
            </Card>
        </div>
    );
};

export default Auth;