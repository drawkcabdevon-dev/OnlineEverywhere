import { ViteReactSSG } from 'vite-react-ssg'
import App from './platform/App.tsx'
import MarketingApp from './marketing/App.tsx'
import { ProjectProvider } from './platform/contexts/ProjectContext'
import { ErrorProvider } from './platform/contexts/ErrorContext'
import { AuthProvider } from './platform/contexts/AuthContext'
import ErrorBoundary from './platform/components/ErrorBoundary'
import './marketing/index.css'
import { Outlet } from 'react-router-dom'
import { routes as appRoutes } from './routes'

const routes = [
    {
        path: '/',
        element: (
            <ErrorBoundary>
                <ErrorProvider>
                    <AuthProvider>
                        <ProjectProvider>
                            <Outlet />
                        </ProjectProvider>
                    </AuthProvider>
                </ErrorProvider>
            </ErrorBoundary>
        ),
        children: appRoutes
    }
]

export const createRoot = ViteReactSSG(
    { routes }
)
