import React from 'react';
import { CampaignTask } from '../types';

interface GanttChartProps {
    tasks: CampaignTask[];
    className?: string;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, className }) => {
    if (!tasks || tasks.length === 0) return <p className="text-gray-500">No timeline data available.</p>;

    // 1. Find range
    const dates = tasks.flatMap(t => [new Date(t.start).getTime(), new Date(t.end).getTime()]);
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const totalDuration = maxDate - minDate || 1; // Avoid division by zero

    // 2. Generate Grid Lines (Simple approach: start, mid, end)
    const formatDate = (ts: number) => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    return (
        <div className={`overflow-x-auto ${className}`}>
            <div className="min-w-[600px] relative">
                {/* Header Dates */}
                <div className="flex justify-between text-xs text-gray-400 border-b border-gray-200 pb-2 mb-2 font-mono">
                    <span>{formatDate(minDate)}</span>
                    <span>{formatDate(minDate + totalDuration * 0.25)}</span>
                    <span>{formatDate(minDate + totalDuration * 0.5)}</span>
                    <span>{formatDate(minDate + totalDuration * 0.75)}</span>
                    <span>{formatDate(maxDate)}</span>
                </div>

                {/* Grid Background */}
                <div className="absolute top-8 bottom-0 left-0 right-0 flex justify-between pointer-events-none z-0">
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                    <div className="border-r border-dashed border-gray-200 h-full w-px"></div>
                </div>

                {/* Tasks */}
                <div className="space-y-3 relative z-10">
                    {tasks.map((task, i) => {
                        const start = new Date(task.start).getTime();
                        const end = new Date(task.end).getTime();
                        const offset = ((start - minDate) / totalDuration) * 100;
                        const width = ((end - start) / totalDuration) * 100;
                        // Ensure width is at least visible
                        const displayWidth = Math.max(width, 2);

                        return (
                            <div key={task.id} className="group relative">
                                <div
                                    className="h-8 rounded bg-indigo-100 border border-indigo-300 flex items-center px-2 hover:bg-indigo-200 transition-colors cursor-pointer"
                                    style={{
                                        marginLeft: `${offset}%`,
                                        width: `${displayWidth}%`
                                    }}
                                    title={`${task.name} (${task.start} - ${task.end})`}
                                >
                                    <span className="text-xs font-semibold text-indigo-900 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {task.name}
                                    </span>
                                </div>
                                {/* Tooltip on Hover */}
                                <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-20 whitespace-nowrap">
                                    <p className="font-bold">{task.name}</p>
                                    <span className="text-gray-400">{task.start} to {task.end}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
