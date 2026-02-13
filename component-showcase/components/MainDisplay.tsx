"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ComponentItem } from "@/types";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import ImageSequencer from "./ImageSequencer";

interface MainDisplayProps {
    item: ComponentItem;
    onToggleDetails: () => void;
    detailsOpen: boolean;
    onNext: () => void;
    onPrev: () => void;
    isExiting?: boolean;
    onExitComplete?: () => void;
}

export default function MainDisplay({ item, onToggleDetails, detailsOpen, onNext, onPrev, isExiting, onExitComplete }: MainDisplayProps) {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-20 pointer-events-none">
                <button
                    onClick={onPrev}
                    className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:scale-110 hover:border-white/30 hover:text-white active:scale-95"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={onNext}
                    className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:scale-110 hover:border-white/30 hover:text-white active:scale-95"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Background Ambience - "Breathing" Glow */}
            <motion.div
                key={`bg-${item.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div
                    className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
                    style={{ backgroundColor: item.themeColor }}
                />
            </motion.div>

            {/* Main Content Container */}
            <div
                key={item.id}
                className="relative z-10 flex flex-col items-center text-center w-full h-full justify-center"
            >
                {/* Full Screen Sequencer Background */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full relative">
                        <ImageSequencer
                            prefix={item.imageSequence.prefix}
                            count={item.imageSequence.frameCount}
                            alt={item.name}
                            isExiting={isExiting}
                            onExitComplete={onExitComplete}
                        />
                    </div>
                </div>

                {/* Component Title Deck */}
                <AnimatePresence>
                    {!isExiting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.26, delay: 0 } }}
                            transition={{ delay: 0.95, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 z-30 flex items-center justify-center px-6"
                        >
                            <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
                            <motion.div
                                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.26, delay: 0 } }}
                                transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="relative w-full max-w-4xl rounded-2xl p-8 md:p-10 text-left deck-card"
                            >
                                <p className="text-[12px] uppercase tracking-[0.4em] text-white/50">Module Focus</p>
                                <h2 className="mt-4 text-4xl md:text-5xl font-display text-white leading-tight">
                                    {item.name}
                                </h2>
                                <div className="mt-3 h-1 w-16 rounded-full" style={{ backgroundColor: item.themeColor }} />
                                <p className="mt-3 text-base text-white/70">{item.headline}</p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {item.specs.map((spec, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/60"
                                        >
                                            {spec.label}: <span className="text-white/90">{spec.value}</span>
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Interactive Hotspot to open details */}
                <button
                    onClick={onToggleDetails}
                    className="absolute bottom-10 right-10 z-30 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-md transition-colors hover:bg-white hover:text-black hover:shadow-glow pointer-events-auto"
                    style={{ boxShadow: `0 0 40px ${item.themeColor}33` }}
                >
                    <Plus className={`transition-transform duration-300 ${detailsOpen ? "rotate-45" : ""}`} />
                </button>
            </div>

            {/* Decorative Grid Lines */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 deck-grid" />
        </div>
    );
}
