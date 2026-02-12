"use client";

import { motion } from "framer-motion";
import { ComponentItem } from "@/types";
import { useState } from "react";
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
                    className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={onNext}
                    className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
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

                {/* Interactive Hotspot to open details */}
                <button
                    onClick={onToggleDetails}
                    className="absolute bottom-10 right-10 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-colors hover:bg-white hover:text-black hover:shadow-glow pointer-events-auto"
                >
                    <Plus className={`transition-transform duration-300 ${detailsOpen ? "rotate-45" : ""}`} />
                </button>
            </div>

            {/* Decorative Grid Lines */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
            />
        </div>
    );
}
