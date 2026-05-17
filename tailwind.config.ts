import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        illume: {
          navy: "#0D1B2A",
          ink: "#142335",
          blue: "#42556B",
          moonblue: "#6F86A3",
          gold: "#E8D7A5",
          amber: "#E7D8B5",
          mist: "#C9CDD3",
          pearl: "#F5F3EE"
        }
      },
      boxShadow: {
        glow: "0 0 42px rgba(232, 215, 165, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
