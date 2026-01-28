import React from 'react';
import { MODULES } from '../constants';
import { ModuleId } from '../types';
import { useProject } from '../contexts/ProjectContext';

interface ToolShellProps {
  moduleId: ModuleId;
  children: React.ReactNode;
}

const ToolShell: React.FC<ToolShellProps> = ({ moduleId, children }) => {
  const moduleInfo = MODULES[moduleId];
  const { activeProject } = useProject();
  const foundation = activeProject?.foundation;

  const ContextChip: React.FC<{ label: string; value: string | string[] | undefined }> = ({ label, value }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    const displayValue = Array.isArray(value) ? value.slice(0, 2).join(', ') + (value.length > 2 ? '...' : '') : value;
    return (
        <div className="flex items-center gap-2 text-xs bg-white/50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full shadow-sm">
            <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">{label}</span>
            <span className="font-medium truncate max-w-[150px]">{displayValue}</span>
        </div>
    );
  };

  return (
    <div className="animate-fade-in-up">
        {/* Dynamic Context Header - Shows what the AI 'knows' right now */}
       <div className="mb-6 flex flex-wrap gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <ContextChip label="Brand Voice" value={foundation?.brandVoice} />
            <ContextChip label="Audience" value={foundation?.targetAudience} />
            <ContextChip label="Focus" value={foundation?.objective} />
        </div>

      {/* Main Content Container */}
      <div className="pb-12">
        {children}
      </div>
    </div>
  );
};

export default ToolShell;