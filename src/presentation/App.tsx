import { useState } from 'react';
import { Bot, RefreshCcw } from 'lucide-react';
import { ViewToggle, ViewMode } from './components/ViewToggle';
import { ActionCenter } from './components/ActionCenter';
import { TransactionList } from './components/TransactionList';
import { DashboardView } from './components/dashboard/DashboardView';
import { ConfirmationOverlay } from './components/ConfirmationOverlay';
import { useTransactions } from './hooks/useTransactions';
import { useVoiceEngine } from './hooks/useVoiceEngine';
import { Transaction } from '../domain/entities/Transaction';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const { transactions, loading, addTransaction, refreshTransactions } = useTransactions();
    const {
        isListening,
        isProcessing,
        extractedData,
        error,
        startListening,
        processText,
        resetData
    } = useVoiceEngine();

    const [currentView, setCurrentView] = useState<ViewMode>('simple');

    // Overlay state derived from voice engine
    const isOverlayOpen = isListening || isProcessing || extractedData !== null || error !== null;

    // Calculate live balance
    const balance = transactions.reduce((acc, tx) => {
        return tx.type === 'INCOME' ? acc + tx.amount : acc - tx.amount;
    }, 0);

    const handleStartVoice = () => {
        startListening();
    };

    const handleConfirmTransaction = async () => {
        if (!extractedData) return;

        try {
            const newTx = new Transaction({
                amount: extractedData.amount,
                category: extractedData.category,
                type: extractedData.type,
                description: extractedData.description || 'Registrado por voz',
                date: new Date(),
                accountId: 'user_demo_123'
            });

            await addTransaction(newTx);
            resetData();
        } catch (e) {
            console.error("Failed to commit transaction", e);
            alert("Error local al guardar la transacción. Verifica consola.");
        }
    };

    // Formatter
    const currencyFormatter = new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    return (
        <div className="min-h-screen p-6 max-w-2xl mx-auto flex flex-col gap-8 relative pb-24 overflow-x-hidden">

            {/* HEADER */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-start justify-between mt-4"
            >
                <div className="flex flex-col gap-1">
                    <p className="text-blue-200/60 text-xs font-bold tracking-widest uppercase">Balance Total</p>
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">
                            {currencyFormatter.format(balance)}
                        </h1>
                        <button
                            onClick={refreshTransactions}
                            className="p-2.5 glass-panel text-blue-400 hover:text-white hover:bg-blue-500/20 rounded-xl transition-all active:scale-95 group"
                            disabled={loading}
                        >
                            <RefreshCcw size={18} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        </button>
                    </div>
                </div>
                {/* AI Status Indicator */}
                <div className="w-14 h-14 rounded-2xl glass-panel flex flex-col items-center justify-center bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden group border-blue-400/20">
                    <Bot size={26} className="relative z-10 transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-blue-500/20 blur-md group-hover:h-full transition-all duration-300"></div>
                </div>
            </motion.header>

            {/* VIEW TOGGLE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <ViewToggle onToggle={(mode) => setCurrentView(mode)} />
            </motion.div>

            {/* ACTION CENTER */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            >
                <ActionCenter
                    onStartVoice={handleStartVoice}
                    onTextSubmit={processText}
                />
            </motion.div>

            {/* DYNAMIC VIEW AREA */}
            <div className="flex-1 relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    {currentView === 'simple' ? (
                        <motion.div
                            key="simple-view"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="absolute inset-0"
                        >
                            <TransactionList transactions={transactions} isLoading={loading} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="advanced-view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="absolute inset-0"
                        >
                            <DashboardView transactions={transactions} isLoading={loading} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* AI CONFIRMATION OVERLAY */}
            <ConfirmationOverlay
                isOpen={isOverlayOpen}
                isProcessing={isProcessing || isListening}
                data={extractedData}
                errorMessage={error}
                onConfirm={handleConfirmTransaction}
                onCancel={resetData}
            />

            {/* Ad Placeholder (Refined) */}
            <div className="w-[calc(100%-3rem)] max-w-xl mx-auto h-[60px] glass-panel bg-slate-900/60 rounded-xl flex items-center justify-center border border-slate-700/50 text-[10px] uppercase tracking-widest text-slate-500/50 fixed bottom-6 left-1/2 -translate-x-1/2 z-40 backdrop-blur-xl">
                [Espacio Publicitario Reservado]
            </div>

        </div>
    );
}

export default App;
