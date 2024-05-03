import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        'green-primary': '#69ED76',
        'green-secondary': '#004006',
        'red-primary': '#FF0000',
        'red-secondary': '#5A0000',
      },
    },
  },
  plugins: [],
};
export default config;
