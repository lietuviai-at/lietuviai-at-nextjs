const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "512px",
      ...defaultTheme.screens,
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      fuchsia: colors.fuchsia,
      green: colors.lime,
      red: colors.red,
      yellow: colors.yellow,
      "light-background": "#F9F5F2",
      "light-background-transparent": "#AB8D741A",
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans)", ...defaultTheme.fontFamily.sans],
        literata: ["var(--font-literata)", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        normal: "rgba(0, 0, 0, 0.15) 0px 4px 25px",
      },
      backgroundImage: {
        "site-pattern": "url('/assets/pattern_01_transparent.png')",
        "site-pattern-mobile":
          "url('/assets/pattern_01_transparent_light.png')",
      },
    },
    future: {
      hoverOnlyWhenSupported: true,
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
