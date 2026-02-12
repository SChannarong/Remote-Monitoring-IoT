"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, motion, useMotionValue } from "framer-motion";
import { getCachedImage, loadImage } from "@/lib/imagePreload";

interface ImageSequencerProps {
    prefix: string;
    count: number;
    alt: string;
    isExiting?: boolean;
    onExitComplete?: () => void;
}

export default function ImageSequencer({ prefix, count, alt, isExiting, onExitComplete }: ImageSequencerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    // Create a motion value for the drag interaction
    const frameIndex = useMotionValue(0);
    const smoothFrameIndex = useSpring(frameIndex, { damping: 50, stiffness: 200 });

    // Preload images
    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            setLoadedCount(0);
            imagesRef.current = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= count; i++) {
                const num = i.toString().padStart(3, "0");
                const src = `${prefix}${num}.jpg`;

                const cached = getCachedImage(src);
                if (cached) {
                    imagesRef.current[i - 1] = cached;
                    if (isMounted) setLoadedCount((prev) => prev + 1);
                    continue;
                }

                const promise = loadImage(src).then((img) => {
                    if (!isMounted) return;
                    imagesRef.current[i - 1] = img;
                    setLoadedCount((prev) => prev + 1);
                });

                promises.push(promise);
            }

            await Promise.all(promises);
        };

        loadImages();
        return () => { isMounted = false; };
    }, [prefix, count]);

    // Track container size for full-screen rendering
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            const { width, height } = entry.contentRect;
            setCanvasSize({ width, height });
        });

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Render logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        if (!canvasSize.width || !canvasSize.height) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(canvasSize.width * dpr);
        canvas.height = Math.round(canvasSize.height * dpr);
        canvas.style.width = `${canvasSize.width}px`;
        canvas.style.height = `${canvasSize.height}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const renderFrame = (targetIndex: number) => {
            const safeIndex = Math.min(Math.max(Math.floor(targetIndex), 0), count - 1);

            const img = imagesRef.current[safeIndex];

            if (img && img.complete) {
                context.clearRect(0, 0, canvasSize.width, canvasSize.height);

                // Calculate aspect ratio to fit cover
                const hRatio = canvasSize.width / img.width;
                const vRatio = canvasSize.height / img.height;
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (canvasSize.width - img.width * ratio) / 2;
                const centerShift_y = (canvasSize.height - img.height * ratio) / 2;

                context.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }
        };

        // Subscribe to smoothFrameIndex changes
        const unsubscribe = smoothFrameIndex.on("change", (latest) => {
            renderFrame(latest);
        });

        // Force initial draw
        if (loadedCount > 0) {
            renderFrame(smoothFrameIndex.get());
        }

        return () => unsubscribe();
    }, [loadedCount, count, smoothFrameIndex, canvasSize.width, canvasSize.height]);

    // Play forward on enter and reverse on exit, then stop
    useEffect(() => {
        let animationFrameId: number;
        let lastTime = performance.now();
        const duration = 1.4; // Seconds for full transition
        const speed = count / duration;

        const animate = (time: number) => {
            const delta = (time - lastTime) / 1000;
            lastTime = time;

            const direction = isExiting ? -1 : 1;
            let nextFrame = frameIndex.get() + direction * speed * delta;

            if (!isExiting && nextFrame >= count - 1) {
                nextFrame = count - 1;
                frameIndex.set(nextFrame);
                return;
            }

            if (isExiting && nextFrame <= 0) {
                nextFrame = 0;
                frameIndex.set(0);
                if (onExitComplete) onExitComplete();
                return;
            }

            frameIndex.set(nextFrame);
            animationFrameId = requestAnimationFrame(animate);
        };

        if (loadedCount === count) {
            if (!isExiting) {
                frameIndex.set(0);
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [loadedCount, count, frameIndex, isExiting, onExitComplete, prefix]);

    // Drag handler
    const handleDrag = (_: any, info: any) => {
        // 1px drag = 0.5 frame movement
        const sensitivity = 0.5;
        const current = frameIndex.get();
        const delta = info.delta.x * sensitivity;

        // Update frame index with boundaries
        const next = Math.min(Math.max(current - delta, 0), count - 1);
        frameIndex.set(next);
    };

    return (
        <div ref={containerRef} className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none overflow-hidden">
            {loadedCount < count ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
                    <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                        Loading Assets... {Math.round((loadedCount / count) * 100)}%
                    </p>
                </div>
            ) : (
                <canvas
                    ref={canvasRef}
                    className="w-full h-full pointer-events-none"
                />
            )}

            {/* Drag Interaction Layer */}
            <motion.div
                className="absolute inset-0 z-10"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={handleDrag}
                style={{ cursor: 'grab' }}
                whileTap={{ cursor: 'grabbing' }}
            />

            {/* Gesture Hint */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
            >
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Drag to Rotate
                </p>
            </motion.div>
        </div>
    );
}
