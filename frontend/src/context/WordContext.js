import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getPublicWords, getAllPublicWords } from '../services/wordService';
import { useLocation, useParams } from 'react-router-dom';

function mulberry32(seed) {
    let s = seed;
    return () => {
        s = (s + 0x6D2B79F5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function seededShuffle(arr, seed) {
    const rand = mulberry32(seed);
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

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

    // Filter state
    const [filterChapters, setFilterChapters] = useState([]);
    const [filterPOS, setFilterPOS] = useState([]);
    const [filterFavorites, setFilterFavorites] = useState(false);
    const [shuffleSeed, setShuffleSeed] = useState('');
    const [isShuffled, setIsShuffled] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // All words cache (fetched once when filter panel opens)
    const [allWords, setAllWords] = useState([]);
    const [allWordsFetched, setAllWordsFetched] = useState(false);

    const isFilterActive = filterChapters.length > 0 || filterPOS.length > 0 || filterFavorites || isShuffled;
    const activeFilterCount = filterChapters.length + filterPOS.length + (filterFavorites ? 1 : 0) + (isShuffled ? 1 : 0);

    const updateWord = (wordId, updates) => {
        try {
            setWords((prevWords) =>
                prevWords.map((word) =>
                    word.id === wordId ? { ...word, ...updates } : word
                )
            );
        } catch (error) {
            console.error('Failed to update word:', error);
        }
    };

    const fetchWords = async (vocabId, page) => {
        setIsLoading(true);
        try {
            const data = await getPublicWords(vocabId, page);
            if (data) setWords(data);
        } catch (error) {
            console.error('Failed to fetch words:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllWords = useCallback(async () => {
        if (allWordsFetched) return;
        setIsLoading(true);
        try {
            const data = await getAllPublicWords(id);
            if (data) setAllWords(data);
            setAllWordsFetched(true);
        } catch (error) {
            console.error('Failed to fetch all words:', error);
        } finally {
            setIsLoading(false);
        }
    }, [id, allWordsFetched]);

    const availableChapters = useMemo(() =>
        [...new Set((allWordsFetched ? allWords : words).map(w => w.chapter))].sort((a, b) => a - b),
        [allWords, words, allWordsFetched]
    );

    const availablePOS = useMemo(() =>
        [...new Set((allWordsFetched ? allWords : words).map(w => w.part_of_speech).filter(Boolean))].sort(),
        [allWords, words, allWordsFetched]
    );

    const displayWords = useMemo(() => {
        if (!isFilterActive) return words;
        let result = [...allWords];
        if (filterChapters.length > 0)
            result = result.filter(w => filterChapters.includes(w.chapter));
        if (filterPOS.length > 0)
            result = result.filter(w => filterPOS.includes(w.part_of_speech));
        if (filterFavorites)
            result = result.filter(w => w.isFavorite);
        if (isShuffled && shuffleSeed !== '')
            result = seededShuffle(result, parseInt(shuffleSeed, 10));
        return result;
    }, [isFilterActive, allWords, words, filterChapters, filterPOS, filterFavorites, isShuffled, shuffleSeed]);

    const resetFilters = useCallback(() => {
        setFilterChapters([]);
        setFilterPOS([]);
        setFilterFavorites(false);
        setShuffleSeed('');
        setIsShuffled(false);
    }, []);

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
        displayWords,
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
        // Filter
        filterChapters, setFilterChapters,
        filterPOS, setFilterPOS,
        filterFavorites, setFilterFavorites,
        shuffleSeed, setShuffleSeed,
        isShuffled, setIsShuffled,
        isFilterOpen, setIsFilterOpen,
        isFilterActive,
        activeFilterCount,
        availableChapters,
        availablePOS,
        fetchAllWords,
        resetFilters,
    };

    return (
        <WordContext.Provider value={value}>{children}</WordContext.Provider>
    );
};
