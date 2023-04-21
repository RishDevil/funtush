/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    boxShadow: {
      card: "0.2rem .2rem 0 0 rgba(0,0,0,1)",
      cardlight: "0.2rem .2rem 0 0 rgba(0,0,0,1) ",
      cardhover: "inset -2px -4px 5px  black, -2px -4px 5px #1B2430",
      cardhover_dark: "inset -2px -4px 5px  white, -2px -4px 5px #1B2430",
      cardhoverlight: "inset -2px -4px 5px  black, -2px -4px 5px #1B2430",
    },
    extend: {},
    animation: {
      shimmer: "shimmer 4s infinite linear",
      pulse: "pulse .5s infinite ease-out",
    },
    keyframes: {
      shimmer: {
        "0%": {
          "background-position": "-64rem",
        },
        "100%": {
          "background-position": "64rem",
        },
      },
      pulse: {
        "0%": {
          scale: ".8",
        },
        "100%": {
          scale: ".9",
        },
      },
    },
  },
  plugins: [],
};
