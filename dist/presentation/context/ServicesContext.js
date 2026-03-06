import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { FirestoreTransactionRepository } from '../../data/repositories/FirestoreTransactionRepository';
import { GeminiVoiceEngineService } from '../../services/gemini/GeminiVoiceEngineService';
// Initialize the concrete instances (Clean Architecture)
const transactionRepository = new FirestoreTransactionRepository();
const voiceEngineService = new GeminiVoiceEngineService();
const ServicesContext = createContext({
    transactionRepository,
    voiceEngineService
});
export const ServicesProvider = ({ children }) => {
    return (_jsx(ServicesContext.Provider, { value: { transactionRepository, voiceEngineService }, children: children }));
};
export const useServices = () => useContext(ServicesContext);
