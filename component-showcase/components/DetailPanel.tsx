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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0, scale: 0.96 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 10, opacity: 0, scale: 0.98 }}
                        transition={{ type: "spring", damping: 24, stiffness: 220 }}
                        className="deck-panel w-full max-w-4xl p-8 md:p-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                                    Technical Dossier
                                </p>
                                <h3 className="text-3xl font-display text-slate-900 mb-1">
                                    Technical Specs
                                </h3>
                                <div className="mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: item.themeColor }} />
                                <p className="text-xs text-slate-500 uppercase tracking-[0.3em]">
                                    {item.name} // {item.id}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-8">
                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {item.specs.map((spec, idx) => (
                                    <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <div className="mb-1 text-[11px] text-slate-500 uppercase tracking-[0.22em]">{spec.label}</div>
                                        <div className="text-lg font-mono font-semibold text-slate-900">{spec.value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Features List */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-4 uppercase tracking-[0.3em]">
                                    <Zap size={16} className="text-orange-500" />
                                    Key Features
                                </h4>
                                <ul className="space-y-3">
                                    {item.features.map((feature, idx) => (
                                        <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="flex items-center gap-3 border-b border-slate-200 pb-2 text-slate-700"
                                    >
                                            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.themeColor }} />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Simulated Real-time Data */}
                            <div className="rounded-xl bg-slate-900 p-5 border border-slate-800 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="flex items-center gap-2 text-[11px] text-white/60 uppercase tracking-[0.3em]">
                                        <Activity size={14} className="text-emerald-400" />
                                        Live Diagnostics
                                    </h4>
                                    <div className="flex gap-1">
                                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                    </div>
                                </div>
                                <div className="h-24 w-full flex items-end gap-1">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [20 + Math.random() * 20 + "%", 80 + Math.random() * 20 + "%", 40 + "%"] }}
                                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", repeatType: "mirror", delay: i * 0.1 }}
                                        className="bg-white/10 flex-1 rounded-sm"
                                        style={{ backgroundColor: i % 5 === 0 ? item.themeColor : undefined }}
                                    />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
