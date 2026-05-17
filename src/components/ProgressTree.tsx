import { motion } from "framer-motion";
import { Verse } from "@/types";

interface ProgressTreeProps {
    verses: Verse[];
    activeVerseId: number;
    openModal: (type: 'atisha' | 'dev') => void;
}

const MODULES = [
    "Prologue",
    "Three Scopes",
    "Aspiration",
    "The Vows",
    "Higher Perception",
    "Calm Abiding",
    "Special Insight",
    "Conclusion",
];

export const ProgressTree = ({ verses, activeVerseId, openModal }: ProgressTreeProps) => {
    // Find current chapter based on active verse
    const activeChapter = verses.find(v => v.id === activeVerseId)?.chapter || "Prologue";

    return (
        <div className="hidden lg:block w-64 h-screen sticky top-0 p-8 border-r border-white/5">

            <div className="space-y-8">
                <div>
                    <h1 className="font-serif text-xl text-cloud-white mb-1">Bodhipathapradīpa</h1>
                    <p className="font-mono text-xs text-gray-500">Atisha Dipamkara</p>
                </div>

                <div className="space-y-1 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

                    {MODULES.map((module, idx) => {
                        const isActive = module === activeChapter;
                        return (
                            <div key={module} className="relative pl-6 py-2 group cursor-pointer">
                                {/* Node Dot */}
                                <motion.div
                                    animate={{
                                        backgroundColor: isActive ? "#E17E26" : "#262626",
                                        scale: isActive ? 1.2 : 1,
                                    }}
                                    className="absolute left-[3px] top-4 w-2.5 h-2.5 rounded-full border border-black/50"
                                />

                                <span className={`text-sm font-mono transition-colors ${isActive ? 'text-saffron' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                    {module}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 font-mono">
                        Progress
                    </p>
                    <p className="text-saffron font-mono text-xl mt-1">
                        {activeVerseId} <span className="text-gray-600 text-sm">/ {verses.length}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
