/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#646cff',
          hover: '#747bff',
          dark: '#4f46e5',
        },
        dark: {
          DEFAULT: '#13151a',
          lighter: '#1a1a1a',
          input: '#2c2c2c',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};