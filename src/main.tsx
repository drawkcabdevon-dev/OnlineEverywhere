import { ViteReactSSG } from 'vite-react-ssg'
import './marketing/index.css'
import { Outlet } from 'react-router-dom'
import { routes as appRoutes } from './routes'
import ErrorBoundary from './marketing/components/ErrorBoundary'

const routes = [
    {
        element: (
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        ),
        children: appRoutes
    }
]

export const createRoot = ViteReactSSG(
    { routes }
)
