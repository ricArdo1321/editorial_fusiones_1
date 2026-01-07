/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#111111',
                foreground: '#F5F5F5',
                brand: '#E31E24',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-merriweather)', 'serif'],
            },
            backgroundImage: {
                'halftone-pattern': 'radial-gradient(circle, #E31E24 2px, transparent 2.5px)',
            }
        },
    },
    plugins: [],
}
