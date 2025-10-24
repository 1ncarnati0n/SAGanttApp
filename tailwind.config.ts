import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "gantt-primary": "#3b82f6",
        "gantt-accent": "#8b5cf6",
      },
    },
  },
  plugins: [],
};

export default config;
