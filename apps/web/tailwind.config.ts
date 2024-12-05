import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        panel: '#252526',
        border: '#2d2d2d',
        accent: '#0078d4',
      },
    },
  },
  plugins: [],
};

export default config;
