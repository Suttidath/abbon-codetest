import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    boxShadow: {
      "shadow-1": "0 -3px 20px -4px rgba(0, 0, 0, 0.20)",
      "shadow-2": "0px 4px 16px 0px rgba(0, 0, 0, 0.10)",
      "shadow-3": "0px -4px 16px 0px  rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [],
} satisfies Config;
