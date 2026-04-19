/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#EC4899',
        accent: '#14B8A6',
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-surface-light': '#334155',
        'light-text': '#F1F5F9',
        'light-text-secondary': '#CBD5E1',
        'light-text-muted': '#94A3B8',
        'grade-a': '#10B981',
        'grade-bc': '#F59E0B',
        'grade-de': '#EF4444',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
    },
  },
  plugins: [],
};

module.exports = config;
