export interface ComponentItem {
    id: string;
    name: string;
    headline: string;
    specs: {
        label: string;
        value: string;
    }[];
    features: string[];
    themeColor: string;
    imageSequence: {
        prefix: string; // e.g., "/assets/power-supply/ezgif-frame-"
        frameCount: number; // e.g., 127
    };
}
