import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    isBillingError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        isBillingError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        const errorString = error.toString().toLowerCase();
        const isBilling =
            errorString.includes('chunkloader') ||
            errorString.includes('userprojectaccountproblem') ||
            errorString.includes('billing') ||
            errorString.includes('delinquent');

        return {
            hasError: true,
            isBillingError: isBilling
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);

        // If it's a billing error, we want to redirect to /payment-error
        if (this.state.isBillingError) {
            window.location.href = '/payment-error';
        }
    }

    public render() {
        if (this.state.hasError) {
            if (this.state.isBillingError) {
                // While we wait for redirect, show a simple loading/transition state
                return null;
            }

            // Generic error UI
            return (
                <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                    <h1 className="text-3xl font-display font-bold text-navy-deep mb-4">Something went wrong</h1>
                    <p className="text-gray-500 mb-8 max-w-md">The application encountered an unexpected error. We've been notified and are looking into it.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-google-blue text-white px-8 py-3 rounded-full font-bold shadow-lg"
                    >
                        Reload Experience
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
