import { useState, useCallback, useEffect } from 'react';
import { useServices } from '../context/ServicesContext';
export function useTransactions() {
    const { transactionRepository } = useServices();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            // For now we get by a hardcoded user ID. 
            // Later this hooks to Authentication Context.
            const userId = 'user_demo_123';
            const data = await transactionRepository.findByAccountId(userId);
            setTransactions(data);
        }
        catch (error) {
            console.error("Error fetching transactions:", error);
        }
        finally {
            setLoading(false);
        }
    }, [transactionRepository]);
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);
    const addTransaction = async (tx) => {
        try {
            await transactionRepository.save(tx);
            // Optimistic UI update or refetch
            setTransactions(prev => [tx, ...prev]);
        }
        catch (error) {
            console.error("Error saving transaction:", error);
            throw error;
        }
    };
    return { transactions, loading, addTransaction, refreshTransactions: fetchTransactions };
}
