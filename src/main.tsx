console.log('DEBUG: main.tsx starting');
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MarketingApp from './marketing/App.tsx'
import PlatformApp from './platform/App.tsx'
import { ProjectProvider } from './platform/contexts/ProjectContext'
import { ErrorProvider } from './platform/contexts/ErrorContext'
import { AuthProvider } from './platform/contexts/AuthContext'
import './marketing/index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!);
console.log('DEBUG: rendering root');

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorProvider>
                <AuthProvider>
                    <ProjectProvider>
                        <Routes>
                            {/* Platform / Portal Routes */}
                            <Route path="/portal/*" element={<PlatformApp />} />

                            {/* Default: Marketing Site */}
                            <Route path="/*" element={<MarketingApp />} />
                        </Routes>
                    </ProjectProvider>
                </AuthProvider>
            </ErrorProvider>
        </BrowserRouter>
    </React.StrictMode>
);
