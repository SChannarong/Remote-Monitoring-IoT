"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainDisplay from "@/components/MainDisplay";
import DetailPanel from "@/components/DetailPanel";
import { components } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { preloadAllSequences } from "@/lib/imagePreload";

export default function Home() {
    const [viewMode, setViewMode] = useState<'board' | 'component' | 'problem'>('board');
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isExitingComponent, setIsExitingComponent] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [pendingId, setPendingId] = useState<string | null>(null);
    const [pendingView, setPendingView] = useState<'board' | 'problem' | null>(null);

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
            setPendingView(null);
            setIsExitingComponent(true);
            return;
        }

        setPendingId(null);
        setPendingView(null);
        setIsExitingComponent(false);
        setActiveId(id);
        setViewMode('component');
    };

    const handleToggleBoard = () => {
        setDetailsOpen(false);
        if (viewMode === 'component') {
            setPendingId(null);
            setPendingView('board');
            setIsExitingComponent(true);
            // Wait for exit animation to finish (triggered by callback in MainDisplay -> ImageSequencer)
            // But we need to pass this state down
        } else {
            setPendingView(null);
            setViewMode('board');
        }
    };

    const handleToggleProblem = () => {
        setDetailsOpen(false);
        if (viewMode === 'component') {
            setPendingId(null);
            setPendingView('problem');
            setIsExitingComponent(true);
            return;
        }
        setPendingView(null);
        setViewMode('problem');
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

        if (pendingView) {
            const nextView = pendingView;
            setPendingView(null);
            setIsExitingComponent(false);
            setActiveId(null);
            setViewMode(nextView);
            return;
        }

        setIsExitingComponent(false);
        setActiveId(null);
        setViewMode('board');
    }, [pendingId, pendingView]);

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
        <main className="relative flex h-screen w-full overflow-hidden deck-bg deck-noise">

            {/* Sidebar Navigation (Always Visible) */}
            <Sidebar
                items={components}
                activeId={activeId}
                onSelect={handleSelectComponent}
                onToggleBoard={handleToggleBoard}
                onToggleProblem={handleToggleProblem}
                isBoardActive={viewMode === 'board' && !isExitingComponent}
                isProblemActive={viewMode === 'problem' && !isExitingComponent}
            />

            {/* Main Content Area */}
            <div className="flex-1 h-full relative">
                <AnimatePresence mode="wait">
                    {viewMode === 'board' ? (
                        <motion.div
                            key="board-view"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src="/assets/Board.jpeg"
                                alt="Main Board"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.26, delay: 0 } }}
                                transition={{ delay: 0.6, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 z-10 flex items-center justify-center px-6"
                            >
                                <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
                                <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.26, delay: 0 } }}
                                        transition={{ delay: 0.75, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full deck-card p-10 md:p-12 text-left"
                                    >
                                        <p className="text-[12px] uppercase tracking-[0.4em] text-white/60">
                                            Component System Overview
                                        </p>
                                        <h1 className="mt-5 text-4xl md:text-6xl font-display text-white leading-tight">
                                            Modular Power Electronics Board
                                        </h1>
                                        <p className="mt-5 text-base md:text-lg text-white/70">
                                            Explore each module in isolation, then return to the full board for system context.
                                            Select a component from the index to reveal its full technical profile.
                                        </p>
                                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/60">
                                            <span className="rounded-full border border-white/15 px-4 py-2">6 Modules</span>
                                            <span className="rounded-full border border-white/15 px-4 py-2">High-Fidelity Renders</span>
                                            <span className="rounded-full border border-white/15 px-4 py-2">Interactive Sequencing</span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6, transition: { duration: 0.22, delay: 0 } }}
                                        transition={{ delay: 0.95, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-md"
                                    >
                                        <img
                                            src="/Untitled%20Diagram.jpg"
                                            alt="System connection diagram"
                                            className="h-auto w-full rounded-2xl border border-white/15 object-contain"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : viewMode === 'problem' ? (
                        <motion.div
                            key="problem-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex items-center justify-center px-6"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.26, delay: 0 } }}
                                transition={{ delay: 0.55, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 z-10 flex items-center justify-center px-6"
                            >
                                <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
                                <motion.div
                                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.26, delay: 0 } }}
                                    transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative w-full max-w-4xl deck-card p-10 text-left"
                                >
                                    <h2 className="mt-4 text-4xl font-display text-white leading-tight">
                                        Problems
                                    </h2>
                                    <div className="mt-4 space-y-5 text-base text-white/70">
                                        <div>
                                            <h3 className="text-xl font-Calibri uppercase tracking-[0.2em] text-white/60">
                                                Hardware Limitations
                                            </h3>
                                            <p className="mt-2 font-Calibri text-[20px]">
                                                - ข้อจำกัดด้านวงจรกรองสัญญาณ (Hardware Limitations) : เนื่องจากระบบไม่มีตัวเก็บประจุแบบเซรามิก (Ceramic Capacitor) แต่ใช้แบบอิเล็กโทรไลติก (Electrolytic Capacitor) แทน

                                            </p>
                                            <p className="mt-3 font-Calibri text-[20px]">
                                                - ผลกระทบคือ ไม่สามารถใช้งาน PWM ที่ความถี่สูงระดับ 20kHz ได้ เนื่องจากข้อจำกัดด้านการตอบสนองความถี่ของตัวเก็บประจุ ส่งผลให้ประสิทธิภาพในการลดสัญญาณ   รบกวน (Noise) และการลดเสียงหอนของพัดลม (Fan Whining Noise) ทำได้ไม่ดีเท่าที่ควร
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-Calibri uppercase tracking-[0.2em] text-white/60">
                                                Control System Constraints
                                            </h3>
                                            <p className="mt-2 font-Calibri text-[20px]">
                                                - ข้อจำกัด (Control System Constraints): เนื่องจากเซนเซอร์วัดความดันที่มีความละเอียดสูง (High-precision Pressure Sensor) มีราคาสูงเกินงบประมาณโครงการ
                                                จึงไม่สามารถนำมาใช้ในระบบควบคุมแบบ Real-time Feedback ได้
                                            </p>
                                            <p className="mt-3 font-Calibri text-[20px]">
                                                - แนวทางการแก้ไข:เลือกใช้วิธีการควบคุมรอบพัดลมแบบกำหนดค่าล่วงหน้า (Open-loop Control / Pre-defined Profile) โดยอ้างอิงจากฐานข้อมูลการทดสอบ (Reference Data) แทนการวัดค่าจริงหน้างาน
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        activeComponent && (
                            <motion.div
                                key="component-view"
                                className="absolute inset-0 w-full h-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
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
