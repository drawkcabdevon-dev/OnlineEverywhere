import React, { useState } from 'react';
import { useProject } from './contexts/ProjectContext';
import { useAuth } from './contexts/AuthContext';
import Auth from './modules/Auth';
import ProjectHub from './modules/ProjectHub';
import Dashboard from './modules/Dashboard';
import Settings from './modules/Settings';
import DataIntegrations from './modules/DataIntegrations';
import ActivityLog from './modules/ActivityLog';
import PersonaLab from './modules/PersonaLab';
import MarketRadar from './modules/MarketRadar';
import BehavioralIntelligenceHub from './modules/BehavioralIntelligenceHub';
import PagePerformanceLab from './modules/PagePerformanceLab';
import KeywordStrategist from './modules/KeywordStrategist';
import StrategyBriefs from './modules/StrategyBriefs';
import CampaignPlanner from './modules/CampaignPlanner';
import WebsiteBuilder from './modules/WebsiteBuilder';
import ContentCreator from './modules/ContentCreator';
import VisualStudio from './modules/VisualStudio';
import EmailCampaigner from './modules/EmailCampaigner';
import { MODULES, ModuleId, ToolboxCategory } from './constants';
import ErrorBanner from './components/ErrorBanner';
import { IconSearch, IconSettings } from './constants';
import Drawer from './components/Drawer';

const App: React.FC = () => {
  const {
    activeProjectId,
    activeModule,
    navigateToModule,
    activeProject,
    isSettingsOpen,
    openSettings,
    closeSettings
  } = useProject();

  const { currentUser, logout } = useAuth();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!currentUser) {
    return (
      <>
        <ErrorBanner />
        <Auth />
      </>
    );
  }

  if (!activeProjectId) {
    return (
      <>
        <ErrorBanner />
        <ProjectHub />
      </>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'settings': return <Settings />;
      case 'data-integrations': return <DataIntegrations />;
      case 'activity-log': return <ActivityLog />;
      case 'audience': return <PersonaLab />;
      case 'market-radar': return <MarketRadar />;
      case 'behavioral-hub': return <BehavioralIntelligenceHub />;
      case 'page-performance-lab': return <PagePerformanceLab />;
      case 'keyword-strategist': return <KeywordStrategist />;
      case 'strategy-briefs': return <StrategyBriefs />;
      case 'campaign-planner': return <CampaignPlanner />;
      case 'website-dev': return <WebsiteBuilder />;
      case 'content-creator': return <ContentCreator />;
      case 'visual-studio': return <VisualStudio />;
      case 'email-campaigner': return <EmailCampaigner />;
      default: return <Dashboard />;
    }
  };

  const categories: ToolboxCategory[] = ['Foundation', 'Research', 'Strategy', 'Execution'];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
      <ErrorBanner />

      {/* V2 Sidebar: Glassy, Collapsible */}
      <aside
        className={`glass-sidebar z-20 transition-all duration-300 ease-in-out flex flex-col shadow-xl border-r border-gray-200/50 ${isSidebarCollapsed ? 'w-20' : 'w-72'
          }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          {!isSidebarCollapsed && (
            <h1 className="ml-3 font-display font-bold text-lg tracking-tight text-gray-900">
              OnLine<span className="text-indigo-600">.ai</span>
            </h1>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          {categories.map(category => (
            <div key={category} className={`${isSidebarCollapsed ? 'text-center' : ''}`}>
              {!isSidebarCollapsed && (
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2 font-display">{category}</h3>
              )}
              <ul className="space-y-1">
                {Object.values(MODULES).filter(m => m.category === category).map(module => (
                  <li key={module.id} className="relative group">
                    <button
                      onClick={() => navigateToModule(module.id as ModuleId)}
                      title={isSidebarCollapsed ? module.name : undefined}
                      className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2.5 rounded-lg transition-all duration-200 ${activeModule === module.id
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                        : 'text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                        }`}
                    >
                      <span className={`${activeModule === module.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                        {module.icon}
                      </span>
                      {!isSidebarCollapsed && <span className="text-sm font-medium">{module.name}</span>}
                    </button>
                    {/* Hover Tooltip for Collapsed State */}
                    {isSidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                        {module.name}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-indigo-700 font-bold shadow-sm">
                {activeProject?.name.charAt(0).toUpperCase() || 'P'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate text-gray-900">{activeProject?.name}</p>
                <p className="text-xs text-gray-500">Premium Plan</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-indigo-700 font-bold shadow-sm cursor-help" title={activeProject?.name}>
                {activeProject?.name.charAt(0).toUpperCase() || 'P'}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex-1 flex items-center justify-center p-2 rounded-md hover:bg-white hover:shadow-sm text-gray-500 transition-all border border-transparent hover:border-gray-200"
              title="Toggle Sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></svg>
            </button>
            {!isSidebarCollapsed && (
              <button
                onClick={logout}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors shadow-sm"
              >
                <span>Switch</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* V2 Header: Minimal, Functional */}
        <header className="h-16 flex items-center justify-between px-8 z-10 bg-transparent">
          {/* Breadcrumb / Title */}
          <div className="flex items-center">
            <span className="font-display font-bold text-xl text-gray-900">{MODULES[activeModule].name}</span>
            <span className="mx-3 text-gray-300">/</span>
            <span className="text-sm text-gray-500 font-medium">{MODULES[activeModule].description}</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Global Search */}
            <div className="relative group">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Ask AI or Search..."
                className="pl-9 pr-4 py-2 bg-white/60 border border-gray-200 rounded-full text-sm w-64 focus:w-80 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white shadow-sm"
              />
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {/* Quick Settings Toggle */}
            <button
              onClick={openSettings}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors shadow-sm"
            >
              <IconSettings className="w-4 h-4" />
              <span>Project Brain</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>

      {/* Global Settings Drawer (The Brain) */}
      <Drawer
        isOpen={isSettingsOpen}
        onClose={closeSettings}
        title="Project Brain"
        subtitle="Manage your business context and AI foundation."
        width="xl"
      >
        <Settings />
      </Drawer>
    </div>
  );
};

export default App;