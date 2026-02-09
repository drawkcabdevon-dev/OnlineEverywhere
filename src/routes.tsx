import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from './marketing/layouts/MainLayout';
import PlatformApp from './platform/App';
import ScrollToTop from './marketing/components/ScrollToTop';

// Marketing Pages (Lazy Loaded)
const Home = React.lazy(() => import('./marketing/pages/Home'));
const Services = React.lazy(() => import('./marketing/pages/Services'));
const AboutUs = React.lazy(() => import('./marketing/pages/AboutUs'));
const Blog = React.lazy(() => import('./marketing/pages/Blog'));
const Portfolio = React.lazy(() => import('./marketing/pages/Portfolio'));
const ContactUs = React.lazy(() => import('./marketing/pages/ContactUs'));
const BarbadosMarketing = React.lazy(() => import('./marketing/pages/BarbadosMarketing'));
const BarbadosStitch = React.lazy(() => import('./marketing/pages/BarbadosStitch'));
const Launchpad = React.lazy(() => import('./marketing/pages/services/Launchpad'));
const Catalyst = React.lazy(() => import('./marketing/pages/services/Catalyst'));
const Partnership = React.lazy(() => import('./marketing/pages/services/Partnership'));
const MediaIgnition = React.lazy(() => import('./marketing/pages/services/MediaIgnition'));
const Ollie = React.lazy(() => import('./marketing/pages/Ollie'));
const TourismLanding = React.lazy(() => import('./marketing/TourismLanding'));
const Success = React.lazy(() => import('./marketing/pages/Success'));
const FirebaseTest = React.lazy(() => import('./marketing/pages/FirebaseTest'));

const LoadingFallback = () => (
    <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-google-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Experience...</p>
        </div>
    </div>
);

// Wrapper to handle Suspense and ScrollToTop
const RootWrapper = ({ children }: { children: React.ReactNode }) => (
    <>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
            {children}
        </Suspense>
    </>
);

export const routes: RouteObject[] = [
    {
        path: '/portal/*',
        element: <PlatformApp />
    },
    {
        path: '/tourism',
        element: (
            <RootWrapper>
                <TourismLanding onBack={() => window.location.href = '/'} />
            </RootWrapper>
        )
    },
    {
        path: '/',
        element: (
            <RootWrapper>
                <Layout />
            </RootWrapper>
        ),
        children: [
            { index: true, element: <Home /> },
            { path: 'ollie', element: <Ollie /> },
            { path: 'services', element: <Services /> },
            { path: 'services/digital-launchpad', element: <Launchpad /> },
            { path: 'services/conversion-catalyst', element: <Catalyst /> },
            { path: 'services/proactive-partnership', element: <Partnership /> },
            { path: 'services/paid-media-ignition', element: <MediaIgnition /> },
            { path: 'about', element: <AboutUs /> },
            { path: 'portfolio', element: <Portfolio /> },
            { path: 'blog', element: <Blog /> },
            { path: 'barbados', element: <BarbadosMarketing /> },
            { path: 'barbados-stitch', element: <BarbadosStitch /> },
            { path: 'contact', element: <ContactUs /> },
            { path: 'success', element: <Success /> },
            { path: 'firebase-test', element: <FirebaseTest /> },
            { path: 'privacy', element: <div className="py-24 max-w-3xl mx-auto px-6 h-screen">Institutional Privacy Policy coming soon.</div> },
            { path: 'terms', element: <div className="py-24 max-w-3xl mx-auto px-6 h-screen">Terms of Service coming soon.</div> },
            { path: 'security', element: <div className="py-24 max-w-3xl mx-auto px-6 h-screen">Infrastructure Security Protocols.</div> }
        ]
    }
];
