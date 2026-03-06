import React from 'react';
import { 
    TrendingUp, 
    ShoppingCart, 
    Coffee, 
    Car, 
    Home, 
    Zap, 
    HeartPulse, 
    GraduationCap, 
    CreditCard, 
    Utensils, 
    Plane
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Transaction } from '../../domain/entities/Transaction';

// Helper for category icons
const getCategoryIcon = (category: string, isIncome: boolean) => {
    if (isIncome) return <TrendingUp size={20} />;
    
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes('comida') || lowerCat.includes('restaurante')) return <Utensils size={20} />;
    if (lowerCat.includes('café') || lowerCat.includes('coffee')) return <Coffee size={20} />;
    if (lowerCat.includes('transporte') || lowerCat.includes('auto')) return <Car size={20} />;
    if (lowerCat.includes('casa') || lowerCat.includes('hogar') || lowerCat.includes('renta')) return <Home size={20} />;
    if (lowerCat.includes('servicios') || lowerCat.includes('luz') || lowerCat.includes('agua')) return <Zap size={20} />;
    if (lowerCat.includes('salud') || lowerCat.includes('médico')) return <HeartPulse size={20} />;
    if (lowerCat.includes('educación') || lowerCat.includes('escula')) return <GraduationCap size={20} />;
    if (lowerCat.includes('compras') || lowerCat.includes('ropa')) return <ShoppingCart size={20} />;
    if (lowerCat.includes('viaje') || lowerCat.includes('vuelo')) return <Plane size={20} />;
    
    return <CreditCard size={20} />;
};

export function TransactionItem({ transaction, index = 0 }: { transaction: Transaction, index?: number }) {
    const isIncome = transaction.type === 'INCOME';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            className="flex items-center justify-between glass p-4 rounded-2xl mb-3 hover:bg-slate-800/60 transition-all cursor-pointer group hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-900/10 border border-slate-700/30"
        >

            <div className="flex items-center gap-4">
                {/* Icon based on category or type */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${isIncome
                        ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-400 border border-emerald-500/20 group-hover:from-emerald-500/30 group-hover:to-emerald-500/10'
                        : 'bg-gradient-to-br from-rose-500/20 to-rose-500/5 text-rose-400 border border-rose-500/20 group-hover:from-rose-500/30 group-hover:to-rose-500/10'
                    } transition-all duration-300`}
                >
                    {getCategoryIcon(transaction.category, isIncome)}
                </div>

                <div>
                    <p className="text-white font-medium text-base mb-0.5 group-hover:text-blue-100 transition-colors">{transaction.category}</p>
                    <p className="text-slate-400 text-xs truncate max-w-[150px] font-light">
                        {transaction.description || 'Sin descripción'}
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className={`font-mono text-lg font-bold tracking-tight ${isIncome ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-slate-100'}`}>
                    {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider mt-0.5">
                    {transaction.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '')}
                </p>
            </div>

        </motion.div>
    );
}
