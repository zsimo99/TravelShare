/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      gray: colors.gray,
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      white_hover: "#e6e6e6",
      black: "#000000",
      text: "#0D1B2A",
      primary: {
        100: "#03045E",
        200: "#030455",
        300: "#02034b",
      },
      secondary: {
        100: "#00b6c1",
        200: "#00a4ae",
        300: "#007f87",
      },
      tertiary: {
        100: "#bb98ff",
        200: "#967acc",
        300: "#5e4c80",
      },
      back: "#FDF7FF",
    },
  },
  plugins: [],
};
