import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Project, ModuleId, Customization } from '../types';
import * as geminiService from '../services/geminiService';

interface ProjectContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  activeProjectId: string | null;
  setActiveProjectId: React.Dispatch<React.SetStateAction<string | null>>;
  activeProject: Project | null;
  updateActiveProject: (updater: (project: Project) => Project) => void;
  updateCustomization: (customization: Partial<Customization>) => void;
  createProject: (name: string, purpose: string, url?: string) => void;
  activeModule: ModuleId;
  navigateToModule: (moduleId: ModuleId, payload?: any) => void;
  logActivity: (message: string, module: ModuleId, details?: any) => void;
  navigationPayload: any;
  clearNavigationPayload: () => void;
  // V2.0 Additions
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);
  const [activeProjectId, setActiveProjectId] = useLocalStorage<string | null>('activeProjectId', null);
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [navigationPayload, setNavigationPayload] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || null;
  }, [projects, activeProjectId]);

  const logActivity = useCallback((message: string, module: ModuleId, details?: any) => {
    if (!activeProjectId) return;
    const newLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      message,
      module,
      details,
    };
    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === activeProjectId
          ? { ...p, activityLog: [newLog, ...p.activityLog].slice(0, 50) }
          : p
      )
    );
  }, [activeProjectId, setProjects]);

  const updateActiveProject = useCallback((updater: (project: Project) => Project) => {
    if (!activeProjectId) return;

    setProjects(prevProjects => {
      const newProjects = prevProjects.map(p => {
        if (p.id === activeProjectId) {
          const updatedProject = updater(p);
          return updatedProject;
        }
        return p;
      });
      return newProjects;
    });

  }, [activeProjectId, setProjects]);

  const updateCustomization = (customizationUpdate: Partial<Customization>) => {
    updateActiveProject(p => ({
      ...p,
      customization: {
        ...p.customization,
        ...customizationUpdate,
      }
    }));
  };

  const createProject = (name: string, purpose: string, url: string = '') => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      userId: 'default-user',
      name,
      createdAt: new Date().toISOString(),
      foundation: {
        businessName: name,
        businessDescription: purpose,
        websiteUrl: url,
        businessType: '',
        industry: '',
        targetAudience: [],
        brandVoice: '',
        objective: [],
        brandValues: [],
      },
      customization: {
        theme: 'Professional',
        colorMode: 'Light', // Default to Light mode for new projects
        primaryColor: '#6366F1',
        secondaryColor: '#0F172A',
        accentColor: '#818CF8',
        font: 'Inter',
        borderRadius: '8px',
        buttonStyle: 'rounded corners, solid background color',
      },
      suggestions: { audiences: [], objectives: [], personaGoals: [], personaPainPoints: [], personaRoles: [] },
      personas: [],
      personaComparison: null,
      swot: null,
      competitors: [],
      competitorComparison: null,
      keywordStrategy: null,
      websiteComponents: [],
      visualAssets: [],
      activityLog: [{
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message: `Project "${name}" created.`,
        module: 'settings'
      }],
      dashboardInsights: null,
      seoAudit: null,
      cmoBriefing: null,
      behavioralPlans: [],
      emailCampaigns: [],
      strategyBriefs: [],
      googleSearchUpdates: [],
      googleSearchUpdatesLastChecked: null,
      integrations: {
        ga4: { connected: false },
        gsc: { connected: false },
      },
      lastContentCreatorResult: null,
      location: null,
    };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    setActiveModule('dashboard');
  };

  const navigateToModule = (moduleId: ModuleId, payload: any = null) => {
    setNavigationPayload(payload);
    setActiveModule(moduleId);
  };

  const clearNavigationPayload = () => {
    setNavigationPayload(null);
  };


  const value = {
    projects,
    setProjects,
    activeProjectId,
    setActiveProjectId,
    activeProject,
    updateActiveProject,
    updateCustomization,
    createProject,
    activeModule,
    navigateToModule,
    logActivity,
    navigationPayload,
    clearNavigationPayload,
    isSettingsOpen,
    openSettings,
    closeSettings,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};