import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  prefix: "",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        normal: "1.125rem",
      },
      colors: {
        primary: "#F60",
        darkBlue: "#0B1B35",
        customGray: "#8A898E",
        lightBlue: "#1E0E62",
        customLightGray: "#15143966",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "bounce-slow": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-10px)" },
      },
      "bounce-slow-delayed": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-10px)" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "bounce-slow": "bounce-slow 3s ease-in-out infinite",
      "bounce-slow-delayed": "bounce-slow 3s ease-in-out infinite 1.5s",
    },
  },
  plugins: [require("tailwindcss-animated")],
} satisfies Config;
