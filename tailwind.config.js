import {heroui} from "@heroui/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    // Sin esta línea Tailwind no genera las clases responsive del toolkit
    // (md:flex, lg:flex, lg:hidden…) y el nav del Header queda oculto a
    // cualquier ancho: siempre sale la hamburguesa. Ver SPEC-0001, bitácora.
    './node_modules/citrica-ui-toolkit/dist/**/*.{js,mjs}'
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite'
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "white",
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            focus: "#3b82f6",
          },
        },
        light: {
          colors: {
            background: "white",
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            focus: "#3b82f6",
          },
        },
      },
    }),
    require('tailwindcss-animated')
  ],
}
