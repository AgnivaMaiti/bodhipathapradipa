"use client";

import { useState, useEffect } from "react";
import { Verse } from "@/types";

interface DailyLampProps {
    verses: Verse[];
}

export const DailyLamp = ({ verses }: DailyLampProps) => {
    const [dailyVerse, setDailyVerse] = useState<Verse | null>(null);

    useEffect(() => {
        // Simple deterministic daily verse based on date
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        const index = dayOfYear % verses.length;
        setDailyVerse(verses[index]);
    }, [verses]);

    if (!dailyVerse) return null;

    return (
        <div className="min-h-[50vh] flex flex-col justify-center items-center text-center p-8 border-b border-white/10 mb-20 bg-gradient-to-b from-transparent to-white/[0.02]">
            <p className="font-mono text-xs text-saffron uppercase tracking-[0.2em] mb-4">
                Lamp of the Day
            </p>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cloud-white max-w-4xl leading-tight mb-8 whitespace-pre-line">
                &ldquo;{dailyVerse.english}&rdquo;
            </h2>

            <div className="flex flex-col items-center gap-2 opacity-50">
                <span className="font-tibetan text-2xl">{dailyVerse.tibetan}</span>
                <span className="font-mono text-xs text-gray-400">Verse {dailyVerse.id} &middot; {dailyVerse.scope} Capacity</span>
            </div>

            <div className="mt-12 animate-bounce opacity-20">
                ↓
            </div>
        </div>
    );
};
