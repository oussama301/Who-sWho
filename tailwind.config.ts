// ✅ Modified tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // ✅ Added DaisyUI plugin
  daisyui: {
    themes: ["light", "dark"], // ✅ Both Light and Dark themes
  },
};

export default config;