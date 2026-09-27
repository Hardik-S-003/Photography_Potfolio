import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#070708",
          900: "#0B0B0D",
          850: "#101014",
          800: "#16161A",
          700: "#22222A",
          600: "#32323D",
        },
        editorial: {
          gold: "#D4AF37",
          champagne: "#E5D3B3",
          bronze: "#B3926C",
          silver: "#D0D0D6",
          muted: "#888892",
          darkMuted: "#4F4F59",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        widest: ".25em",
        ultra: ".35em",
      },
      boxShadow: {
        float: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 10px 20px -8px rgba(0, 0, 0, 0.5)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        glow: "0 0 40px -10px rgba(212, 175, 55, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
