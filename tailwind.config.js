/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3b82f6',
                    hover: '#2563eb',
                },
                secondary: '#8b5cf6',
                accent: '#f59e0b',
                background: '#020617',
                foreground: '#f8fafc',
                card: '#0f172a',
                border: '#1e293b',
            },
        },
    },
    plugins: [],
}
