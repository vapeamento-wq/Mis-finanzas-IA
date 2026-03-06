import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart3, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Transaction } from '../../../domain/entities/Transaction';

interface DashboardViewProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export function DashboardView({ transactions, isLoading }: DashboardViewProps) {

    // Quick calculations for the mock dashboard
    const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    // Formatter
    const formatCurrency = (val: number) => new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full flex flex-col gap-5 z-10 pb-8"
        >
            <div className="flex items-center gap-2 mb-2 px-2">
                <PieChart size={18} className="text-blue-400" />
                <h3 className="text-lg font-bold text-white tracking-wide">Resumen Financiero</h3>
            </div>

            {/* Income vs Expense Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 flex flex-col bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <TrendingUp size={16} />
                        <span className="text-xs font-semibold uppercase tracking-wider">Ingresos</span>
                    </div>
                    <span className="text-xl font-bold text-white">{formatCurrency(totalIncome)}</span>
                </div>
                <div className="glass-panel p-4 flex flex-col bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/20">
                    <div className="flex items-center gap-2 text-rose-400 mb-2">
                        <TrendingDown size={16} />
                        <span className="text-xs font-semibold uppercase tracking-wider">Gastos</span>
                    </div>
                    <span className="text-xl font-bold text-white">{formatCurrency(totalExpense)}</span>
                </div>
            </div>

            {/* Mock Category Breakdown */}
            <div className="glass-panel p-5 mt-2 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-blue-300">
                        <BarChart3 size={16} />
                        <span className="text-sm font-semibold uppercase tracking-wider">Presupuesto Mensual</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Marzo 2026</span>
                </div>

                {/* Progress Bar Mock */}
                <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden mb-2 border border-slate-700/50">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative"
                    >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                    </motion.div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-medium mb-6">
                    <span>Usado: $650.00</span>
                    <span>Límite: $1,000.00</span>
                </div>

                {/* Top Category Mock */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">🍔</div>
                            <span className="text-sm text-slate-200 font-medium">Comida</span>
                        </div>
                        <span className="text-sm font-mono text-white">$240.50</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">🚗</div>
                            <span className="text-sm text-slate-200 font-medium">Transporte</span>
                        </div>
                        <span className="text-sm font-mono text-white">$120.00</span>
                    </div>
                </div>

            </div>

            <div className="glass-panel p-4 flex items-center justify-center gap-2 text-slate-400/80 text-xs text-center border-dashed border-slate-700/50">
                <Wallet size={14} /> Los gráficos reales se conectarán pronto.
            </div>

        </motion.div>
    );
}
