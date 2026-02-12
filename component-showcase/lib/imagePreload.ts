"use client";

type SequenceItem = {
    imageSequence: {
        prefix: string;
        frameCount: number;
    };
};

const imageCache = new Map<string, HTMLImageElement>();
const imagePromises = new Map<string, Promise<HTMLImageElement>>();

export const getCachedImage = (src: string) => imageCache.get(src);

export const loadImage = (src: string) => {
    const cached = imageCache.get(src);
    if (cached) return Promise.resolve(cached);

    const existingPromise = imagePromises.get(src);
    if (existingPromise) return existingPromise;

    const promise = new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imageCache.set(src, img);
            imagePromises.delete(src);
            resolve(img);
        };
        img.onerror = () => {
            imagePromises.delete(src);
            resolve(img);
        };
    });

    imagePromises.set(src, promise);
    return promise;
};

export const preloadSequence = async (prefix: string, count: number) => {
    const tasks: Promise<HTMLImageElement>[] = [];
    for (let i = 1; i <= count; i++) {
        const num = i.toString().padStart(3, "0");
        const src = `${prefix}${num}.jpg`;
        tasks.push(loadImage(src));
    }
    await Promise.all(tasks);
};

export const preloadAllSequences = (items: SequenceItem[]) => {
    const run = async () => {
        for (const item of items) {
            await preloadSequence(item.imageSequence.prefix, item.imageSequence.frameCount);
        }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => {
            void run();
        });
    } else {
        setTimeout(() => {
            void run();
        }, 0);
    }
};
