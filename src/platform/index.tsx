import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProjectProvider } from './contexts/ProjectContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { AuthProvider } from './contexts/AuthContext';

import WebsitePlaceholder from './modules/website';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Environment Feature Toggling (Dual-Service Architecture)
const isWebsiteMode = import.meta.env.VITE_APP_MODE === 'WEBSITE';

if (isWebsiteMode) {
  root.render(
    <React.StrictMode>
      <WebsitePlaceholder />
    </React.StrictMode>
  );
} else {
  // Default to APP mode
  root.render(
    <React.StrictMode>
      <ErrorProvider>
        <AuthProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </AuthProvider>
      </ErrorProvider>
    </React.StrictMode>
  );
}