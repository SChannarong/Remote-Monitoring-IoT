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
                industrial: {
                    900: "#121212",
                    800: "#1E1E1E",
                    700: "#2A2A2A",
                    600: "#3D3D3D",
                    500: "#555555",
                    400: "#757575",
                    300: "#9E9E9E",
                    200: "#C2C2C2",
                    100: "#E0E0E0",
                    50: "#F5F5F5",
                },
                accent: {
                    blue: "#007AFF",
                    gold: "#FFD700",
                    copper: "#B87333",
                    green: "#00FF00",
                    silver: "#C0C0C0",
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
};
export default config;
