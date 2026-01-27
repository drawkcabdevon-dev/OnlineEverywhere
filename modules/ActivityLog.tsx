import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import ToolShell from '../components/ToolShell';
import Card from '../components/Card';
import { MODULES } from '../constants';
import { ActivityLog as ActivityLogType, ModuleId } from '../types';
import Modal from '../components/Modal';
import Button from '../components/Button';
import CodeBlock from '../components/CodeBlock';

const ActivityLog: React.FC = () => {
    const { activeProject, navigateToModule } = useProject();
    const [selectedLog, setSelectedLog] = useState<ActivityLogType | null>(null);

    const logs = activeProject?.activityLog || [];

    const groupLogsByDate = (logs: ActivityLogType[]) => {
        const groups: { [key: string]: ActivityLogType[] } = {};
        logs.forEach(log => {
            const date = new Date(log.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(log);
        });
        return groups;
    };

    const groupedLogs = groupLogsByDate(logs);
    
    const DetailViewer: React.FC<{ details: any }> = ({ details }) => {
        if (!details) return <p className="text-text-muted">No further details available for this entry.</p>;
    
        // Simple heuristic to render different types of details
        if (typeof details === 'string') {
            return <p>{details}</p>;
        }
        if (typeof details === 'object' && details !== null) {
            if (details.name && details.htmlCode) { // HTML Component
                return (
                    <div>
                        <h5 className="font-semibold text-white">{details.name}</h5>
                        <p className="text-sm text-text-muted mb-2">{details.description}</p>
                        <CodeBlock code={details.htmlCode.substring(0, 300) + (details.htmlCode.length > 300 ? '...' : '')} />
                    </div>
                );
            }
            // Default object renderer
            return <CodeBlock code={JSON.stringify(details, null, 2)} />;
        }
        return <p>Could not render details.</p>;
    };


    return (
        <ToolShell moduleId="activity-log">
            <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Project Timeline</h3>
                {logs.length > 0 ? (
                    Object.entries(groupedLogs).map(([date, dateLogs]) => (
                        <div key={date} className="mb-8">
                            <h4 className="text-lg font-semibold text-indigo-400 mb-4">{date}</h4>
                            <div className="timeline">
                                {dateLogs.map(log => (
                                    <div key={log.id} className="timeline-item">
                                        <div className="timeline-icon text-indigo-400">
                                            {MODULES[log.module]?.icon}
                                        </div>
                                        <div className="pl-4">
                                            <button onClick={() => setSelectedLog(log)} className="text-left hover:bg-surface p-2 rounded-md w-full transition-colors">
                                                <p className="text-sm font-semibold text-gray-200">{log.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(log.timestamp).toLocaleTimeString()} - In {MODULES[log.module]?.name}
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 text-gray-400">
                        <p>No activity has been recorded yet.</p>
                        <p className="text-sm mt-2">Start using the tools to see your project's history build here.</p>
                    </div>
                )}
            </Card>

            <Modal isOpen={!!selectedLog} onClose={() => setSelectedLog(null)} title={`Log Entry: ${selectedLog?.message}`}>
                {selectedLog && (
                    <div className="space-y-4">
                        <div>
                            <p><strong className="text-text-muted">Timestamp:</strong> {new Date(selectedLog.timestamp).toLocaleString()}</p>
                            <p><strong className="text-text-muted">Module:</strong> {MODULES[selectedLog.module]?.name}</p>
                        </div>
                        <div className="border-t border-border pt-4">
                            <h4 className="font-semibold text-white mb-2">Details</h4>
                            <div className="max-h-96 overflow-y-auto bg-surface p-3 rounded-md border border-border">
                               <DetailViewer details={selectedLog.details} />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button onClick={() => {
                                navigateToModule(selectedLog.module);
                                setSelectedLog(null);
                            }}>
                                Go to {MODULES[selectedLog.module]?.name}
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </ToolShell>
    );
};

export default ActivityLog;