/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-public-sans)"],
    },
    colors: {
      base: {
        "000": "#FFFFFF",
        100: "#EAFBFA",
        600: "#198079",
        900: "#0C403D",
      },
      primary: {
        300: "#F0F3F4",
        500: "#98A8B3",
        600: "#4C5B67",
        700: "#121517",
      },
      secondary: {
        100: "#F7F5F2",
      },
    },
    extend: {},
  },
  plugins: [],
};
