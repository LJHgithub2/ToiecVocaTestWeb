import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPublicWords } from '../services/wordService';
import { useLocation, useParams } from 'react-router-dom';

const WordContext = createContext();

export const useWordContext = () => useContext(WordContext);

export const WordProvider = ({ children }) => {
    const { id } = useParams();
    const [wordCount, setWordCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
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

    const fetchWords = async (id, page) => {
        setIsLoading(true);
        try {
            const data = await getPublicWords(id, page);
            if (data) {
                setWords(data);
            }
        } catch (error) {
            console.error('Failed to fetch words:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWords(id, currentPage);
    }, [currentPage]);

    useEffect(() => {
        const name = queryParams.get('name');
        const word_count = queryParams.get('word_count', null);
        if (word_count == null) {
            alert('잘못된 접근입니다.');
        }
        setVocaName(name || '새로고침을 해주세요');
        setWordCount(word_count);
        setCurrentPage(1);
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
        wordCount,
        setWordCount,
        currentPage,
        setCurrentPage,
    };

    return (
        <WordContext.Provider value={value}>{children}</WordContext.Provider>
    );
};
