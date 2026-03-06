import React from 'react';
import { TransactionItem } from './TransactionItem';
import { Transaction } from '../../domain/entities/Transaction';
import { ArrowRight, Receipt } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransactionListProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
    return (
        <div className="w-full flex flex-col z-10">
            <div className="flex items-center justify-between mb-5 px-2">
                <div className="flex items-center gap-2">
                    <Receipt size={18} className="text-blue-400" />
                    <h3 className="text-lg font-bold text-white tracking-wide">Transacciones Recientes</h3>
                </div>
                <button className="text-blue-400/80 hover:text-blue-300 text-sm font-semibold flex items-center gap-1 transition-all hover:translate-x-1">
                    Ver todas <ArrowRight size={14} />
                </button>
            </div>

            <div className="flex flex-col relative w-full">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
                        <span className="text-slate-400 font-medium text-sm">Cargando operaciones...</span>
                    </div>
                ) : transactions.length > 0 ? (
                    <div className="flex flex-col space-y-1">
                        <AnimatePresence mode="popLayout">
                            {transactions.map((tx, idx) => (
                                <motion.div key={tx.id || idx} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}>
                                    <TransactionItem
                                        transaction={tx}
                                        index={idx}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-12 glass-panel border-dashed border-slate-700/50 bg-slate-800/20"
                    >
                        <div className="w-16 h-16 bg-slate-800/80 rounded-2xl shadow-inner flex items-center justify-center mb-4 border border-slate-700/50">
                            <span className="text-3xl opacity-60 drop-shadow-md">💸</span>
                        </div>
                        <p className="text-slate-300 font-semibold mb-1">Aún no hay registros</p>
                        <p className="text-slate-500/80 text-sm max-w-[200px] text-center font-medium">Usa el micrófono para añadir tu primera operación.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
