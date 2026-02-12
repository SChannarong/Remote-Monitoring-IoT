"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ComponentItem } from "@/types";
import { X, Activity, Zap } from "lucide-react";

interface DetailPanelProps {
    item: ComponentItem;
    isOpen: boolean;
    onClose: () => void;
}

export default function DetailPanel({ item, isOpen, onClose }: DetailPanelProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="glass-panel fixed bottom-0 right-0 top-0 z-40 w-full max-w-md border-l border-white/10 bg-neutral-900/60 p-8 backdrop-blur-xl md:w-[450px]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-1" style={{ color: item.themeColor }}>
                                Technical Specs
                            </h3>
                            <p className="text-sm text-neutral-400 uppercase tracking-widest">
                                {item.name} // {item.id}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full bg-white/5 p-2 text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {item.specs.map((spec, idx) => (
                                <div key={idx} className="rounded-xl border border-white/5 bg-white/5 p-4">
                                    <div className="mb-1 text-xs text-neutral-500 uppercase">{spec.label}</div>
                                    <div className="text-lg font-mono font-bold text-white">{spec.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Features List */}
                        <div>
                            <h4 className="flex items-center gap-2 text-sm text-neutral-300 font-semibold mb-4 uppercase tracking-wider">
                                <Zap size={16} className="text-yellow-500" />
                                Key Features
                            </h4>
                            <ul className="space-y-3">
                                {item.features.map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="flex items-center gap-3 border-b border-white/5 pb-2 text-neutral-300"
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.themeColor }} />
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Simulated Real-time Data */}
                        <div className="rounded-xl bg-black/40 p-5 border border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider">
                                    <Activity size={14} className="text-green-500" />
                                    Live Diagnostics
                                </h4>
                                <div className="flex gap-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                </div>
                            </div>
                            <div className="h-24 w-full flex items-end gap-1">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [20 + Math.random() * 20 + "%", 80 + Math.random() * 20 + "%", 40 + "%"] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "mirror", delay: i * 0.1 }}
                                        className="bg-white/10 flex-1 rounded-sm"
                                        style={{ backgroundColor: i % 5 === 0 ? item.themeColor : undefined }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
