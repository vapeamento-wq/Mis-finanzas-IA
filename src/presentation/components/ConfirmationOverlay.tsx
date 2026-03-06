import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import { ProcessedVoiceData } from '../../domain/interfaces/IVoiceEngineService';

interface ConfirmationOverlayProps {
    isOpen: boolean;
    isProcessing: boolean;
    data: ProcessedVoiceData | null;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmationOverlay({ isOpen, isProcessing, data, onConfirm, onCancel }: ConfirmationOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="w-full max-w-sm glass-panel p-6"
                    >
                        {isProcessing ? (
                            <div className="flex flex-col items-center justify-center py-6 text-slate-300 gap-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                >
                                    <Loader2 size={32} className="text-blue-500" />
                                </motion.div>
                                <p className="animate-pulse">Gemini está escuchando tus finanzas...</p>
                            </div>
                        ) : data ? (
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold text-white mb-1">Confirmar transacción</h3>
                                <p className="text-sm text-slate-400 mb-6">Por favor verifica si la IA dedujo los datos correctamente.</p>

                                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 mb-6 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Monto</span>
                                        <span className={`font-mono text-xl font-bold ${data.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {data.type === 'INCOME' ? '+' : '-'}${data.amount.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-slate-800/50 pt-3">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Categoría</span>
                                        <span className="bg-slate-800 px-3 py-1 rounded-full text-sm font-medium">{data.category}</span>
                                    </div>
                                    <div className="flex justify-between items-start border-t border-slate-800/50 pt-3">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider pt-1">Resumen</span>
                                        <span className="text-sm text-right text-slate-300 max-w-[180px]">{data.description}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={onCancel}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium"
                                    >
                                        <X size={18} className="text-rose-400" /> Cancelar
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-medium shadow-lg shadow-blue-600/20"
                                    >
                                        <Check size={18} /> Confirmar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6 text-rose-400">
                                Error al entender la transacción.
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
