import { Result } from 'postcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "hsl(61, 70%, 52%)",
        red: "hsl(4, 69%, 50%)",
        bgResult: "#0E2431",
        "Slate-100" : "hsl(202, 86%, 94%)",
        "Slate-300" : "hsl(203, 41%, 72%)",
        "Slate-500" : "hsl(200, 26%, 54%)",
        "Slate-700" : "hsl(200, 24%, 40%)",
        "Slate-900" : "hsl(202, 55%, 16%)",
      }
    },
  },
  variants: {
    extend: {
      borderColor: ['focus', 'focus-visible, focus-within'],
      backgroundColor: ['focus', 'focus-visible, focus-within'],
    },
  },
  plugins: [],
}

