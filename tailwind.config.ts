import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f5f5f5',
          dark: '#121212',
        },
        foreground: {
          light: '#171717',
          dark: '#ededed',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config