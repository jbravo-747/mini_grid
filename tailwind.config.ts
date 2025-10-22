import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        // Hace que `font-sans` use Open Sans por defecto
        sans: ["var(--font-open-sans)", "ui-sans-serif", "system-ui", "Segoe UI", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"],
      },
    },
  },
  plugins: [lineClamp],
};
export default config;
