import React, { createContext, useContext } from 'react';
import { FirestoreTransactionRepository } from '../../data/repositories/FirestoreTransactionRepository';
import { GeminiVoiceEngineService } from '../../services/gemini/GeminiVoiceEngineService';

// Initialize the concrete instances (Clean Architecture)
const transactionRepository = new FirestoreTransactionRepository();
const voiceEngineService = new GeminiVoiceEngineService();

interface ServicesContextProps {
    transactionRepository: FirestoreTransactionRepository;
    voiceEngineService: GeminiVoiceEngineService;
}

const ServicesContext = createContext<ServicesContextProps>({
    transactionRepository,
    voiceEngineService
});

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ServicesContext.Provider value={{ transactionRepository, voiceEngineService }}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => useContext(ServicesContext);
