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
import ColorStripDivider from './components/ColorStripDivider';

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

  if (!currentUser) return <><ErrorBanner /><Auth /></>;
  if (!activeProjectId) return <><ErrorBanner /><ProjectHub /></>;

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
    <div className="flex h-screen bg-white text-gray-700 antialiased font-sans overflow-hidden relative">
      <ErrorBanner />

      {/* Premium Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] size-[600px] bg-google-blue/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] size-[800px] bg-google-red/5 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] size-[1000px] bg-google-yellow/3 rounded-full blur-[200px]"></div>
      </div>

      {/* V3 Sidebar: Premium White, Collapsible */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-40 transition-all duration-300 ease-in-out flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        <ColorStripDivider />

        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-3 group">
              <div className="relative size-10 flex items-center justify-center">
                <div className="size-full rounded-full border-2 border-google-blue/20 flex items-center justify-center p-1 animate-pulse">
                  <div className="size-full rounded-full border-4 border-google-blue flex items-center justify-center">
                    <span className="material-symbols-outlined text-google-blue text-xl font-variation-fill">ads_click</span>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-gray-700 leading-none">
                  OnLine<span className="text-google-blue">.ai</span>
                </h1>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 font-bold">Strategic OS</p>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="size-10 rounded-full border-2 border-google-blue/30 flex items-center justify-center active:rotate-45 transition-transform">
                <span className="material-symbols-outlined text-google-blue text-lg">ads_click</span>
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6 custom-scrollbar">
          {categories.map(category => (
            <div key={category}>
              {!isSidebarCollapsed && (
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-3">{category}</h3>
              )}
              <ul className="space-y-1">
                {Object.values(MODULES).filter(m => m.category === category).map(module => (
                  <li key={module.id} className="relative group">
                    <button
                      onClick={() => navigateToModule(module.id as ModuleId)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activeModule === module.id
                        ? 'bg-gray-50 text-google-blue shadow-sm border border-gray-100'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                    >
                      <span className={`${isSidebarCollapsed ? 'text-2xl' : 'text-xl'} transition-transform group-hover:scale-110 ${activeModule === module.id ? 'text-google-blue' : ''}`}>
                        {/* We use the material symbols if available, else standard icon */}
                        {module.icon}
                      </span>
                      {!isSidebarCollapsed && <span className="text-sm font-semibold">{module.name}</span>}
                    </button>
                    {isSidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-xl">
                        {module.name}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Sidebar Actions */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center flex-col' : 'mb-4 px-2'}`}>
            <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-google-blue font-bold shadow-sm">
              {activeProject?.name.charAt(0).toUpperCase() || 'P'}
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate text-gray-900">{activeProject?.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Technical Partner</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex-1 flex items-center justify-center p-2.5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-google-blue hover:border-google-blue transition-all shadow-sm"
              title="Toggle Menu"
            >
              <span className={`material-symbols-outlined transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`}>chevron_left</span>
            </button>
            {!isSidebarCollapsed && (
              <button
                onClick={logout}
                className="flex-[2] flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-google-red hover:border-google-red transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Switch OS</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* V3 Header: Clean, Premium */}
        <header className="h-20 flex items-center justify-between px-10 z-10">
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-2xl text-gray-900 tracking-tight">{MODULES[activeModule].name}</span>
            <div className="h-4 w-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{MODULES[activeModule].description}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-google-blue transition-colors">search</span>
              <input
                type="text"
                placeholder="Strategic Query..."
                className="pl-12 pr-6 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm w-64 focus:w-80 transition-all focus:outline-none focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue focus:bg-white shadow-sm font-medium"
              />
            </div>

            <button
              onClick={openSettings}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-google-blue text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-google-blue/20"
            >
              <span className="material-symbols-outlined text-sm">hub</span>
              <span>Project Brain</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
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
        subtitle="Orchestrate your business intelligence and AI foundation."
        width="xl"
      >
        <Settings />
      </Drawer>
    </div>
  );
};

export default App;