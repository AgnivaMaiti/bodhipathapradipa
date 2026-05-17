"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Verse } from "@/types";

interface VerseCardProps {
    verse: Verse;
}

const cleanTransliteration = (text: string) => {
    return text
        .split("\n")
        .map(line => line.replace(/\//g, "").trim())
        .join("\n")
        .trim();
};

export const VerseCard = ({ verse }: VerseCardProps) => {
    const [isTitleHovered, setIsTitleHovered] = useState(false);

    if (verse.id === 1) {
        // Parse Title, Homage and Verse blocks
        const tibParts = verse.tibetan ? verse.tibetan.split("\n\n") : [];
        const benParts = verse.bengali ? verse.bengali.split("\n\n") : [];
        const sanParts = verse.sanskrit ? verse.sanskrit.split("\n\n").map(p => p.trim()).filter(Boolean) : [];

        const titleTibetan = tibParts[0] || "";
        const titleEnglish = "Herein lies the Lamp for the Path to Enlightenment.\nIn the Indian language [Sanskrit]: Bodhipathapradīpa\nIn the Tibetan language: Jangchub Lamgyi Dronma (Lamp for the Path to Enlightenment)";

        const homageTibetan = tibParts[1] || "";
        const homageBengali = benParts[0] || "";
        const homageSanskrit = sanParts[0] || "";

        const verseTibetan = tibParts[2] || "";
        const verseBengali = benParts[1] || "";
        const verseSanskrit = sanParts[1] || "";

        return (
            <div className="group border-b border-white/10 py-12 px-4 transition-all duration-500 hover:bg-white/[0.02]">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                    {/* Metadata in Mono */}
                    <div className="w-full md:w-32 shrink-0 font-mono text-xs text-saffron/50 group-hover:text-saffron transition-colors">
                        <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2">
                            <span>VERSE_{verse.id.toString().padStart(3, "0")}</span>
                            <span className="uppercase text-[10px] tracking-widest border border-white/10 px-2 py-0.5 rounded-full w-fit text-gray-600">
                                {verse.chapter.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Content in Serif */}
                    <div className="flex-1 space-y-12">
                        {/* Block 1: The Title Block with Hover Reveal */}
                        <div 
                            onMouseEnter={() => setIsTitleHovered(true)}
                            onMouseLeave={() => setIsTitleHovered(false)}
                            className="relative border border-saffron/20 bg-saffron/[0.01] p-8 rounded-lg overflow-hidden transition-all duration-500 hover:border-saffron/40 hover:bg-saffron/[0.03] cursor-help group/title"
                        >
                            {/* Decorative corner lines */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-saffron/30 group-hover/title:border-saffron/60 transition-colors" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-saffron/30 group-hover/title:border-saffron/60 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-saffron/30 group-hover/title:border-saffron/60 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-saffron/30 group-hover/title:border-saffron/60 transition-colors" />

                            <div className="min-h-[140px] flex flex-col justify-center items-center text-center">
                                <span className="font-mono text-[9px] tracking-widest text-saffron/40 uppercase mb-4 block group-hover/title:text-saffron/70 transition-colors">
                                    {isTitleHovered ? "Manuscript Title (Translation)" : "Manuscript Title (Tibetan)"}
                                </span>
                                
                                <div className="grid grid-cols-1 grid-rows-1 justify-items-center items-center w-full relative">
                                    {/* Tibetan Text */}
                                    <motion.div
                                        animate={{ 
                                            opacity: isTitleHovered ? 0 : 1,
                                            y: isTitleHovered ? -12 : 0,
                                        }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                        className="col-start-1 row-start-1 text-center"
                                    >
                                        <p className="text-xl md:text-2xl text-cloud-white font-crimson whitespace-pre-line leading-normal">
                                            {titleTibetan}
                                        </p>
                                    </motion.div>

                                    {/* English Translation */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ 
                                            opacity: isTitleHovered ? 1 : 0,
                                            y: isTitleHovered ? 0 : 12,
                                        }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                        className="col-start-1 row-start-1 text-center pointer-events-none"
                                    >
                                        <p className="text-base md:text-lg text-saffron font-serif whitespace-pre-line leading-relaxed italic">
                                            {titleEnglish}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Block 2: Homage to Manjushri Block */}
                        <div className="border-b border-white/5 pb-8 space-y-4">
                            <span className="font-mono text-[9px] tracking-widest text-saffron/40 uppercase block">
                                Homage
                            </span>
                            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-cloud-white/90">
                                Homage to the Bodhisattva Mañjuśrī, the youthful one.
                            </p>
                            
                            <div className="space-y-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                {homageTibetan && (
                                    <p className="text-xl md:text-2xl text-saffron/80 font-crimson whitespace-pre-line leading-normal">
                                        {homageTibetan}
                                    </p>
                                )}
                                {homageBengali && (
                                    <p className="text-base md:text-lg text-saffron/80 font-crimson whitespace-pre-line leading-relaxed">
                                        {cleanTransliteration(homageBengali)}
                                    </p>
                                )}
                                {homageSanskrit && (
                                    <p className="text-base md:text-lg text-saffron/80 font-crimson whitespace-pre-line leading-relaxed">
                                        {cleanTransliteration(homageSanskrit)}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Block 3: The Actual Verse 1 Block */}
                        <div className="space-y-6">
                            <span className="font-mono text-[9px] tracking-widest text-saffron/40 uppercase block">
                                Verse I
                            </span>
                            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-cloud-white/90 group-hover:text-cloud-white transition-colors whitespace-pre-line">
                                {verse.english}
                            </p>

                            <div className="space-y-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                {verseTibetan && (
                                    <p className="text-xl md:text-2xl text-saffron/80 font-crimson whitespace-pre-line leading-normal">
                                        {verseTibetan}
                                    </p>
                                )}
                                {verseBengali && (
                                    <p className="text-base md:text-lg text-saffron/80 font-crimson whitespace-pre-line leading-relaxed">
                                        {cleanTransliteration(verseBengali)}
                                    </p>
                                )}
                                {verseSanskrit && (
                                    <p className="text-base md:text-lg text-saffron/80 font-crimson whitespace-pre-line leading-relaxed">
                                        {cleanTransliteration(verseSanskrit)}
                                    </p>
                                )}
                            </div>
                        </div>

                        {verse.explanation && (
                            <div className="mt-8 pt-4 border-t border-white/5 text-sm text-gray-400 font-mono">
                                <span className="text-tibetan-red mr-2">{">"}</span>
                                {verse.explanation}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Default rendering for verses 2+
    return (
        <div className="group border-b border-white/10 py-12 px-4 transition-all duration-500 hover:bg-white/[0.02]">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Metadata in Mono */}
                <div className="w-full md:w-32 shrink-0 font-mono text-xs text-saffron/50 group-hover:text-saffron transition-colors">
                    <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2">
                        <span>VERSE_{verse.id.toString().padStart(3, "0")}</span>
                        <span className="uppercase text-[10px] tracking-widest border border-white/10 px-2 py-0.5 rounded-full w-fit text-gray-600">
                            {verse.chapter.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Content in Serif */}
                <div className="flex-1 space-y-6">
                    <p className="font-serif text-2xl md:text-3xl leading-relaxed text-cloud-white/90 group-hover:text-cloud-white transition-colors whitespace-pre-line">
                        {verse.english}
                    </p>

                    {(verse.tibetan || verse.bengali || verse.sanskrit) && (
                        <div className="space-y-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                            {verse.tibetan && (
                                <p className="text-xl md:text-2xl text-saffron/80 font-crimson whitespace-pre-line leading-normal">
                                    {verse.tibetan}
                                </p>
                            )}
                            {verse.bengali && (
                                <p className="text-base md:text-lg text-saffron/80 font-crimson whitespace-pre-line leading-relaxed">
                                    {cleanTransliteration(verse.bengali)}
                                </p>
                            )}
                            {verse.sanskrit && (
                                <p className="text-base md:text-lg text-saffron/80 font-crimson whitespace-pre-line leading-relaxed">
                                    {cleanTransliteration(verse.sanskrit)}
                                </p>
                            )}
                        </div>
                    )}

                    {verse.explanation && (
                        <div className="mt-8 pt-4 border-t border-white/5 text-sm text-gray-400 font-mono">
                            <span className="text-tibetan-red mr-2">{">"}</span>
                            {verse.explanation}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
