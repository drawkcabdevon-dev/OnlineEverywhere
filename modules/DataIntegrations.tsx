
import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import Button from '../components/Button';
import { Integrations } from '../types';
import Modal from '../components/Modal';

const DataIntegrations: React.FC = () => {
    const { activeProject, updateActiveProject, logActivity } = useProject();
    const [loading, setLoading] = useState<'ga4' | 'gsc' | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [connectingService, setConnectingService] = useState<'ga4' | 'gsc' | null>(null);

    if (!activeProject) return null;

    const { integrations } = activeProject;

    const handleConnectClick = (service: keyof Integrations) => {
        setConnectingService(service);
        setIsModalOpen(true);
    };

    const handleAllowConnection = () => {
        if (!connectingService) return;
        
        setIsModalOpen(false);
        setLoading(connectingService);

        setTimeout(() => {
            updateActiveProject(p => ({
                ...p,
                integrations: {
                    ...p.integrations,
                    [connectingService]: { connected: true }
                }
            }));
            logActivity(`Connected to ${connectingService.toUpperCase()}`, 'data-integrations');
            setLoading(null);
            setConnectingService(null);
        }, 1500);
    };

    const handleDisconnect = (service: keyof Integrations) => {
        setLoading(service);
        setTimeout(() => {
            updateActiveProject(p => ({
                ...p,
                integrations: {
                    ...p.integrations,
                    [service]: { connected: false }
                }
            }));
            logActivity(`Disconnected from ${service.toUpperCase()}`, 'data-integrations');
            setLoading(null);
        }, 1000);
    };


    const IntegrationCard: React.FC<{
        service: keyof Integrations;
        name: string;
        description: string;
        icon: React.ReactElement;
    }> = ({ service, name, description, icon }) => {
        const isConnected = integrations[service].connected;
        const isLoading = loading === service;

        return (
            <Card className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-surface rounded-lg flex items-center justify-center border border-border">
                    {icon}
                </div>
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <p className="text-text-muted mt-1">{description}</p>
                </div>
                <div className="w-full md:w-auto flex-shrink-0">
                    {isConnected ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                <span className="font-semibold">Connected</span>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleDisconnect(service)}
                                isLoading={isLoading}
                            >
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => handleConnectClick(service)}
                            isLoading={isLoading}
                        >
                            Connect
                        </Button>
                    )}
                </div>
            </Card>
        );
    };
    
    const ga4Icon = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M16 4v16"/></svg>;
    const gscIcon = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

    const modalContent = {
        ga4: {
            title: 'Connect to Google Analytics 4',
            permissions: [
                'View your Google Analytics data',
                'View your user data for your Google Analytics properties',
                'See and download your Google Analytics reports'
            ],
            icon: ga4Icon
        },
        gsc: {
            title: 'Connect to Google Search Console',
            permissions: [
                'View and manage Search Console data for your verified sites',
                'View list of sites and domains you manage',
                'Submit sitemaps for your sites'
            ],
            icon: gscIcon
        }
    };


    return (
        <ToolShell moduleId="data-integrations">
            <div className="space-y-6">
                <IntegrationCard
                    service="ga4"
                    name="Google Analytics 4"
                    description="Import audience behavior, conversion data, and user segments to fuel your strategic decisions."
                    icon={ga4Icon}
                />
                <IntegrationCard
                    service="gsc"
                    name="Google Search Console"
                    description="Analyze real user queries, identify content gaps, and monitor your site's search performance."
                    icon={gscIcon}
                />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setConnectingService(null); }} title={connectingService ? modalContent[connectingService].title : ''}>
                {connectingService && (
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center border border-border mb-4">
                            {modalContent[connectingService].icon}
                        </div>
                        <p className="text-lg font-semibold text-white">OnLineEverywhere wants to access your Google Account</p>
                        <p className="text-sm text-text-muted mt-2">This will allow OnLineEverywhere to:</p>
                        <ul className="text-left list-disc list-inside mt-4 space-y-2 text-sm text-text-base bg-surface p-4 rounded-md border border-border">
                            {modalContent[connectingService].permissions.map(p => <li key={p}>{p}</li>)}
                        </ul>
                         <p className="text-xs text-text-muted mt-6 max-w-md">By clicking Allow, you allow this app to use your information in accordance with their terms of service and privacy policies. This is a simulation and no real data will be accessed.</p>
                         <div className="flex justify-end gap-4 w-full mt-6">
                             <Button variant="secondary" onClick={() => { setIsModalOpen(false); setConnectingService(null); }}>Cancel</Button>
                             <Button onClick={handleAllowConnection}>Allow</Button>
                         </div>
                    </div>
                )}
            </Modal>
        </ToolShell>
    );
};

export default DataIntegrations;
