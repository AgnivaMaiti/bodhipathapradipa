"use client";

import { useState } from "react";
import rawVerses from "@/data/verses.json";
import { ProgressTree } from "@/components/ProgressTree";
import { ScrollyLoom } from "@/components/ScrollyLoom";
import { DailyLamp } from "@/components/DailyLamp";
import { InfoModal } from "@/components/InfoModal";
import { Verse } from "@/types";

// Cast the raw json to Verse[]
const verses = rawVerses as Verse[];

export default function Home() {
  const [activeVerseId, setActiveVerseId] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'atisha' | 'dev'>('atisha');

  const openModal = (type: 'atisha' | 'dev') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <main className="flex min-h-screen bg-charcoal text-cloud-white selection:bg-saffron/30 selection:text-saffron">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Sidebar Navigation */}
      <ProgressTree 
        verses={verses} 
        activeVerseId={activeVerseId} 
        openModal={openModal}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:pl-12">
        <DailyLamp verses={verses} />

        <div className="border-l border-white/5 pl-8 md:pl-12 relative">
          <ScrollyLoom verses={verses} onVerseChange={setActiveVerseId} />
        </div>

        <footer className="mt-32 pb-12 text-center opacity-30 font-mono text-xs">
          <p>The Interactive Lineage Manuscript</p>
          <p className="mt-2">Bodhipathapradīpa</p>
        </footer>
      </div>

      {/* Global Modals */}
      <InfoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />

      {/* Floating Info Controls */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-2.5 bg-charcoal/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl">
        <button 
          onClick={() => openModal('atisha')}
          className="font-mono text-[10px] tracking-[0.2em] text-cloud-white/60 hover:text-saffron transition-all duration-300 px-2 py-0.5 cursor-pointer uppercase font-medium"
        >
          Author
        </button>
        <div className="w-[1px] h-3 bg-white/10" />
        <button 
          onClick={() => openModal('dev')}
          className="font-mono text-[10px] tracking-[0.2em] text-cloud-white/60 hover:text-saffron transition-all duration-300 px-2 py-0.5 cursor-pointer uppercase font-medium"
        >
          Developer
        </button>
      </div>
    </main>
  );
}
