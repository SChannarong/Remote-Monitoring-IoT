"use client";

import { ComponentItem } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CircuitBoard, AlertTriangle } from "lucide-react";

interface SidebarProps {
    items: ComponentItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
    onToggleBoard: () => void;
    onToggleProblem: () => void;
    isBoardActive: boolean;
    isProblemActive: boolean;
}

export default function Sidebar({ items, activeId, onSelect, onToggleBoard, onToggleProblem, isBoardActive, isProblemActive }: SidebarProps) {
    return (
        <motion.div
            className="fixed left-6 bottom-8 z-50 flex flex-col items-start gap-4"
        >
            <div className="deck-card w-56 rounded-2xl p-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/50">
                    <span>Index</span>
                    <span>{items.length.toString().padStart(2, "0")}</span>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <button
                        onClick={onToggleBoard}
                        className={cn(
                            "group flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-all",
                            isBoardActive
                                ? "border-white/30 bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                                : "border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                        )}
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                            <CircuitBoard size={18} />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/50">Board</span>
                            <span className="font-medium">System View</span>
                        </span>
                    </button>

                    <div className="h-px w-full bg-white/10" />

                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={cn(
                                "group flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-all",
                                activeId === item.id && !isBoardActive
                                    ? "border-white/30 bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                                    : "border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                            )}
                        >
                            <span
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-semibold"
                                style={{ color: item.themeColor }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                                <span className="flex flex-col">
                                    <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                                        {item.id.replace("-", " ").toUpperCase()}
                                    </span>
                                    <span className="font-medium">{item.name}</span>
                                </span>
                        </button>
                    ))}

                    <div className="h-px w-full bg-white/10" />

                    <button
                        onClick={onToggleProblem}
                        className={cn(
                            "group flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-all",
                            isProblemActive
                                ? "border-white/30 bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                                : "border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                        )}
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-orange-300">
                            <AlertTriangle size={16} />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/40">Issue</span>
                            <span className="font-medium">Problem</span>
                        </span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
