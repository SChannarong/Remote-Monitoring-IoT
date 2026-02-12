"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainDisplay from "@/components/MainDisplay";
import DetailPanel from "@/components/DetailPanel";
import { components } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { preloadAllSequences } from "@/lib/imagePreload";

export default function Home() {
    const [viewMode, setViewMode] = useState<'board' | 'component'>('board');
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isExitingComponent, setIsExitingComponent] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [pendingId, setPendingId] = useState<string | null>(null);

    useEffect(() => {
        preloadAllSequences(components);
    }, []);

    const activeIndex = activeId ? components.findIndex((c) => c.id === activeId) : 0;
    const activeComponent = components[activeIndex];

    const handleSelectComponent = (id: string) => {
        setDetailsOpen(false);

        if (viewMode === 'component' && activeId && activeId !== id) {
            // Reverse current component back to board, then advance to the next component
            setPendingId(id);
            setIsExitingComponent(true);
            return;
        }

        setPendingId(null);
        setIsExitingComponent(false);
        setActiveId(id);
        setViewMode('component');
    };

    const handleToggleBoard = () => {
        if (viewMode === 'component') {
            setPendingId(null);
            setIsExitingComponent(true);
            // Wait for exit animation to finish (triggered by callback in MainDisplay -> ImageSequencer)
            // But we need to pass this state down
        } else {
            setViewMode('board');
        }
    };

    const onExitComplete = useCallback(() => {
        if (pendingId) {
            const nextId = pendingId;
            setPendingId(null);
            setIsExitingComponent(false);
            setActiveId(nextId);
            setViewMode('component');
            return;
        }

        setIsExitingComponent(false);
        setActiveId(null);
        setViewMode('board');
    }, [pendingId]);

    const handleNext = () => {
        if (!activeId) return;
        const idx = components.findIndex(c => c.id === activeId);
        const nextIndex = (idx + 1) % components.length;
        handleSelectComponent(components[nextIndex].id);
    };

    const handlePrev = () => {
        if (!activeId) return;
        const idx = components.findIndex(c => c.id === activeId);
        const prevIndex = (idx - 1 + components.length) % components.length;
        handleSelectComponent(components[prevIndex].id);
    };

    return (
        <main className="relative flex h-screen w-full overflow-hidden bg-neutral-950">

            {/* Sidebar Navigation (Always Visible) */}
            <Sidebar
                items={components}
                activeId={activeId}
                onSelect={handleSelectComponent}
                onToggleBoard={handleToggleBoard}
                isBoardActive={viewMode === 'board' && !isExitingComponent}
            />

            {/* Main Content Area */}
            <div className="flex-1 h-full relative">
                <AnimatePresence mode="popLayout">
                    {viewMode === 'board' && !isExitingComponent ? (
                        <motion.div
                            key="board-view"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src="/assets/Board.jpeg"
                                alt="Main Board"
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    ) : (
                        activeComponent && (
                            <motion.div
                                key="component-view"
                                className="absolute inset-0 w-full h-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <MainDisplay
                                    item={activeComponent}
                                    detailsOpen={detailsOpen}
                                    onToggleDetails={() => setDetailsOpen(!detailsOpen)}
                                    onNext={handleNext}
                                    onPrev={handlePrev}
                                    isExiting={isExitingComponent}
                                    onExitComplete={onExitComplete}
                                />
                            </motion.div>
                        )
                    )}
                </AnimatePresence>
            </div>

            {/* Detail Panel */}
            <DetailPanel
                isOpen={detailsOpen && viewMode === 'component'}
                onClose={() => setDetailsOpen(false)}
                item={activeComponent}
            />
        </main>
    );
}
