export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'google-blue': '#4285F4',
                'google-red': '#EA4335',
                'google-yellow': '#FBBC05',
                'google-green': '#34A853',
                'navy-deep': '#202124',
                'navy-muted': '#5f6368',
                'surface': '#F8F9FA',
                'background': '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'google': '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
                'm3': '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)',
            },
            borderRadius: {
                'google': '2rem',
                'pill': '100px',
            }
        },
    },
    plugins: [],
}
