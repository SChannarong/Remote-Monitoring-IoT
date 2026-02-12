"use client";

import { ComponentItem } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CircuitBoard } from "lucide-react";

interface SidebarProps {
    items: ComponentItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
    onToggleBoard: () => void;
    isBoardActive: boolean;
}

export default function Sidebar({ items, activeId, onSelect, onToggleBoard, isBoardActive }: SidebarProps) {
    return (
        <motion.div
            className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50 flex flex-wrap items-center justify-center gap-3"
        >
            {/* Board Button */}
            <button
                onClick={onToggleBoard}
                className={cn(
                    "group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:scale-110",
                    isBoardActive ? "bg-white text-black border-white" : "text-white hover:bg-white/20"
                )}
            >
                <CircuitBoard size={24} />
                <span className="absolute left-full ml-4 hidden rounded-md bg-white px-2 py-1 text-xs font-bold text-black opacity-0 transition-all group-hover:opacity-100 md:block">
                    BOARD VIEW
                </span>
            </button>

            {/* Component Buttons */}
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={cn(
                        "group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:scale-110",
                        activeId === item.id && !isBoardActive ? "bg-industrial-gold text-black border-industrial-gold" : "text-neutral-400 hover:text-white hover:bg-white/10"
                    )}
                    style={{
                        borderColor: activeId === item.id && !isBoardActive ? item.themeColor : undefined,
                        backgroundColor: activeId === item.id && !isBoardActive ? item.themeColor : undefined
                    }}
                >
                    <span className="text-xs font-bold">{item.name.charAt(0)}</span>

                    {/* Tooltip */}
                    <span className="absolute left-full ml-4 hidden w-max rounded-md bg-neutral-900 px-2 py-1 text-xs font-bold text-white opacity-0 transition-all group-hover:opacity-100 md:block border border-white/10">
                        {item.name}
                    </span>
                </button>
            ))}
        </motion.div>
    );
}
