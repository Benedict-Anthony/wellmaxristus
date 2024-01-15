import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#e0e0e0",
        blue: "#021c48",
        lightBlue: "#032a6d",
        dark: "#10040a",
        darkPink: "#580130",
        lightPink: "#91014e",
      },
      // screens: {
      //   xl: "1440px",
      //   lg: "960px",
      //   md: "760px",
      //   sm: "480px",
      // },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
