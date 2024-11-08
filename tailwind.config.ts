import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'my-dark': '#212121',
        'my-light': '#ffffff',
      },
    },
  },
  plugins: [],
  darkMode: ['selector', '[data-mode="dark"]']
};
export default config;
