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
                deck: {
                    ink: "#0E2841",
                    paper: "#E8E8E8",
                    mist: "#F2F4F7",
                    slate: "#0B1320",
                },
                accent: {
                    blue: "#156082",
                    orange: "#E97132",
                    green: "#196B24",
                    sky: "#0F9ED5",
                    violet: "#A02B93",
                    lime: "#4EA72E",
                }
            },
            fontFamily: {
                sans: ['Calibri', 'Candara', 'Segoe UI', 'Arial', 'sans-serif'],
                mono: ['Calibri', 'Candara', 'Segoe UI', 'Arial', 'monospace'],
                display: ['Calibri', 'Candara', 'Segoe UI', 'Arial', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
