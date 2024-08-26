import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPublicWords } from '../services/wordService';
import { useLocation, useParams } from 'react-router-dom';

const WordContext = createContext();

export const useWordContext = () => useContext(WordContext);

export const WordProvider = ({ children }) => {
    const { id } = useParams();
    const [words, setWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [isMemorizationMode, setIsMemorizationMode] = useState(false);
    const [vocaName, setVocaName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showAddWord, setShowAddWord] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const updateWord = (wordId, updates) => {
        try {
            // await updateWordAPI(wordId, updates, vocaName);
            setWords((prevWords) =>
                prevWords.map((word) =>
                    word.id === wordId ? { ...word, ...updates } : word
                )
            );
        } catch (error) {
            console.error('Failed to update word:', error);
        }
    };

    useEffect(() => {
        const name = queryParams.get('name');
        setVocaName(name || '무제');

        const fetchWords = async () => {
            setIsLoading(true);
            try {
                const data = await getPublicWords(id);
                setWords(data);
            } catch (error) {
                console.error('Failed to fetch words:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWords();
    }, [location.search]);

    const value = {
        words,
        vocaName,
        isLoading,
        setWords,
        selectedWords,
        setSelectedWords,
        isSelectionMode,
        setIsSelectionMode,
        isMemorizationMode,
        setIsMemorizationMode,
        updateWord,
        showAddWord,
        setShowAddWord,
    };

    return (
        <WordContext.Provider value={value}>{children}</WordContext.Provider>
    );
};
