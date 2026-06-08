/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        primary: "#5C8D89",
        secondary: "#2B2D42",
        accent: "#E07A5F",
        background: "#FFF9F5",

        glowPrimary: "#A7D7C5",
        glowAccent: "#F2CCB6",

      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        slowPulse: "slowPulse 5s ease-in-out infinite",
      },

      keyframes: {

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-12px)",
          },
        },

        slowPulse: {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(1)",
          },

          "50%": {
            opacity: "0.5",
            transform: "scale(1.05)",
          },
        },

      },

    },
  },

  plugins: [],
};