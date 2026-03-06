import React, { useState } from 'react';
import { Mic, Keyboard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionCenterProps {
    onStartVoice: () => void;
    onTextSubmit: (text: string) => void;
}

export function ActionCenter({ onStartVoice, onTextSubmit }: ActionCenterProps) {
    const [isRecording, setIsRecording] = useState(false);

    const handleMicClick = () => {
        setIsRecording(true);
        setTimeout(() => setIsRecording(false), 3000); // Simulate length for now
        onStartVoice();
    };

    return (
        <div className="w-full flex flex-col items-center justify-center relative mt-6 mb-16 z-20">

            {/* Context/Hint above mic */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={isRecording ? 'recording' : 'idle'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-8 h-6 flex items-center justify-center"
                >
                    {isRecording ? (
                        <div className="flex items-center gap-2 text-rose-400 font-medium tracking-wide">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                            Escuchando...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-slate-400/80 text-sm font-medium">
                            <Sparkles size={14} className="text-blue-400/70" />
                            Presiona para hablar con IA
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Microphone Main Button Area */}
            <div className="relative flex items-center justify-center h-36 w-36">

                {/* Idle soft glow */}
                {!isRecording && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                )}

                {/* Pulsing ripples effect using Framer Motion when recording */}
                {isRecording && (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-full bg-rose-500/30"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full bg-rose-500/20"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                        />
                    </>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMicClick}
                    className={`relative z-10 w-[88px] h-[88px] rounded-full flex items-center justify-center transition-colors duration-300 shadow-2xl ${isRecording
                            ? 'bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-500/40 border border-rose-400/50'
                            : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/40 border border-blue-400/30 group'
                        }`}
                >
                    <Mic
                        size={38}
                        strokeWidth={2}
                        className={`text-white transition-transform duration-300 ${!isRecording ? 'group-hover:scale-110' : ''}`}
                    />
                </motion.button>
            </div>

            {/* Text fallback toggle */}
            <button className="mt-8 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider bg-slate-800/30 px-5 py-2.5 rounded-full border border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600">
                <Keyboard size={15} /> Entrada Manual
            </button>

        </div>
    );
}
