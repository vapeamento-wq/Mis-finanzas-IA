import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';
export function ViewToggle({ onToggle }) {
    const [viewMode, setViewMode] = useState(() => {
        // Load persisted view mode from localStorage
        const saved = localStorage.getItem('mf_view_mode');
        return saved || 'simple';
    });
    useEffect(() => {
        // Persist to localStorage whenever it changes
        localStorage.setItem('mf_view_mode', viewMode);
        if (onToggle)
            onToggle(viewMode);
    }, [viewMode, onToggle]);
    return (_jsxs("div", { className: "relative flex items-center bg-slate-800/60 backdrop-blur-md p-1 rounded-full border border-slate-700/50 w-fit cursor-pointer mx-auto shadow-inner overflow-hidden", children: [_jsx(motion.div, { className: "absolute w-1/2 h-[calc(100%-8px)] top-1 bg-blue-500 shadow-md shadow-blue-500/20 rounded-full z-0", initial: false, animate: {
                    left: viewMode === 'simple' ? '4px' : 'calc(50% - 4px)'
                }, transition: { type: 'spring', stiffness: 400, damping: 30 } }), _jsxs("div", { onClick: () => setViewMode('simple'), className: `relative z-10 flex items-center justify-center gap-1.5 px-5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${viewMode === 'simple' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`, children: [_jsx(List, { size: 14 }), "Lista"] }), _jsxs("div", { onClick: () => setViewMode('advanced'), className: `relative z-10 flex items-center justify-center gap-1.5 px-5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${viewMode === 'advanced' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`, children: [_jsx(LayoutGrid, { size: 14 }), "Resumen"] })] }));
}
