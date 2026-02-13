import { ComponentItem } from "@/types";

export const components: ComponentItem[] = [
    {
        id: "power-supply",
        name: "Power Supply 12V-300W",
        specs: [
            { label: "Input", value: "100V-245Vac" },
            { label: "Output", value: "12V 25A" },
            { label: "Cooling", value: "Honeycomb Mesh" },
        ],
        features: ["Brushed Aluminum", "High Efficiency", "Overload Protection"],
        themeColor: "#C0C0C0", // Metallic Silver
        imageSequence: {
            prefix: "/assets/power-supply/ezgif-frame-",
            frameCount: 127
        }
    },
    {
        id: "stm32",
        name: "STM32F411 Black Pill",
        specs: [
            { label: "Chip", value: "ARM Cortex-M4" },
            { label: "Speed", value: "100MHz" },
            { label: "Flash", value: "512KB" },
        ],
        features: ["USB-C Interface", "Gold-plated GPIO", "Low Power Mode"],
        themeColor: "#FFD700", // Gold accents
        imageSequence: {
            prefix: "/assets/stm32/ezgif-frame-",
            frameCount: 127
        }
    },
    {
        id: "buck-converter",
        name: "DC-DC Buck Converter Module (MH)",
        specs: [
            { label: "Model", value: "XL4015" },
            { label: "Efficiency", value: "96%" },
            { label: "Current", value: "5A Max" },
        ],
        features: ["Copper Toroidal Coil", "Aluminum Heat Sink", "Precision Potentiometer"],
        themeColor: "#B87333", // Copper
        imageSequence: {
            prefix: "/assets/step-down/ezgif-frame-",
            frameCount: 127
        }
    },
    {
        id: "mosfet-trigger",
        name: "MOSFET Power Driver Module",
        specs: [
            { label: "Voltage", value: "5V-36V" },
            { label: "Current", value: "15A (30A Max)" },
            { label: "Type", value: "Dual Parallel MOS" },
        ],
        features: ["High-Temp Terminals", "PWM Control", "Ultra Low Resistance"],
        themeColor: "#007AFF", // Electric Blue
        imageSequence: {
            prefix: "/assets/mosfet/ezgif-frame-",
            frameCount: 127
        }
    },
    {
        id: "emi-filter",
        name: "LC / EMI Filter",
        specs: [
            { label: "Type", value: "LC Low Pass" },
            { label: "Filtering", value: "High Frequency" },
            { label: "Stage", value: "Dual Stage" },
        ],
        features: ["Electrolytic Capacitor", "Inductor Coil", "Custom Green Perfboard"],
        themeColor: "#00FF00", // PCB Green
        imageSequence: {
            prefix: "/assets/lc-emi/ezgif-frame-",
            frameCount: 127
        }
    },
];
