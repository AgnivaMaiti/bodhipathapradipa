"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Verse } from "@/types";
import { VerseCard } from "./VerseCard";

interface ScrollyLoomProps {
    verses: Verse[];
    onVerseChange: (id: number) => void;
}

export const ScrollyLoom = ({ verses, onVerseChange }: ScrollyLoomProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // This is a simplified "spy" logic. In a real app we'd use IntersectionObserver per card.
    // For now, let's just render the list.

    return (
        <div ref={containerRef} className="relative min-h-screen">
            <div className="pb-[40vh]">
                {verses.map((verse) => (
                    <VerseObserver key={verse.id} verse={verse} onVisible={() => onVerseChange(verse.id)} />
                ))}
            </div>
        </div>
    );
};

const VerseObserver = ({ verse, onVisible }: { verse: Verse, onVisible: () => void }) => {
    const ref = useRef(null);
    // We can use framer-motion's useInView or similar, but let's stick to simple intersection observer via callback ref or custom hook if possible.
    // Actually, let's use a simple onViewportEnter-like wrapper

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onVisible();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [onVisible]);

    return (
        <div ref={ref}>
            <VerseCard verse={verse} />
        </div>
    );
};
