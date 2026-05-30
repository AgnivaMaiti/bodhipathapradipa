"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'atisha' | 'dev';
}

export const InfoModal = ({ isOpen, onClose, type }: InfoModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-charcoal/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4"
                    >
                        <div
                            className="border border-white/10 w-full max-w-lg overflow-hidden pointer-events-auto shadow-2xl relative rounded-md"
                            style={{ backgroundColor: "#121212" }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h2 className="font-mono text-xs uppercase tracking-widest text-saffron">
                                    {type === 'atisha' ? 'About The Author' : 'About The Developer'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 max-h-[70vh] overflow-y-auto">
                                {type === 'atisha' ? (
                                    <div className="space-y-6">
                                        <h3 className="font-serif text-3xl text-cloud-white">
                                            Dīpaṃkara Śrījñāna (Atiśa)
                                        </h3>
                                        <div className="space-y-4 text-gray-400 font-serif leading-relaxed">
                                            <p>
                                                Born in 982 CE in Bengal, Atiśa was a preeminent Buddhist teacher who re-established the Dharma in Tibet after a period of decline.
                                            </p>
                                            <p>
                                                His seminal work, the <span className="text-white italic">Bodhipathapradīpa</span> (Lamp for the Path to Enlightenment), synthesized all Buddha's teachings into a graded path (Lamrim) suitable for practitioners of three capacities.
                                            </p>
                                            <p>
                                                Invited by the Tibetan King Jangchup Ö, he spent his final years in the Snowy Land, leaving a legacy that shapes Tibetan Buddhism to this day.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <h3 className="font-serif text-3xl text-cloud-white">
                                            Agniva Maiti
                                        </h3>
                                        <div className="space-y-4 text-gray-400 font-serif leading-relaxed text-sm">
                                            <p>
                                                Agniva Maiti is a computer science student and researcher passionate about low-resource languages and open technology.
                                            </p>
                                            <p>
                                                He created this interactive manuscript to connect with his roots and honor the monumental contributions Bengal made to Buddhist philosophy, bringing Atisha's timeless wisdom to the modern web.
                                            </p>
                                            <p>
                                                Deeply inspired by Atisha, he believes that the Dhamma, which helped him find peace during his own times of suffering,should be freely accessible to all.
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex gap-6 font-mono text-xs flex-wrap">
                                            <a href="https://agniva.in" target="_blank" rel="noreferrer" className="text-saffron hover:text-white transition-colors">
                                                 AGNIVA.IN_
                                             </a>
                                             <a href="https://github.com/AgnivaMaiti" target="_blank" rel="noreferrer" className="text-saffron hover:text-white transition-colors">
                                                GITHUB_
                                            </a>
                                            <a href="https://x.com/AgnivaMait67736" target="_blank" rel="noreferrer" className="text-saffron hover:text-white transition-colors">
                                                X_
                                            </a>
                                            <a href="https://www.linkedin.com/in/agniva-maiti/" target="_blank" rel="noreferrer" className="text-saffron hover:text-white transition-colors">
                                                LINKEDIN_
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Decoration */}
                            <div className="h-1 w-full bg-gradient-to-r from-tibetan-red to-saffron opacity-20" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
