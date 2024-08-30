import React, { useRef, useEffect } from 'react';
import { useWordContext } from '../context/WordContext';
import WordItem from '../components/word/WordItem';
import WordListHeader from '../components/word/WordListHeader';
import Pagination from '../components/word/Pagination';
import AddWord from '../components/word/AddWord.js';
import Loading from '../components/loading.js';

const WordList = () => {
    const {
        words,
        isSelectionMode,
        isMemorizationMode,
        showAddWord,
        setShowAddWord,
        isLoading,
    } = useWordContext();
    const addWordRef = useRef(null);

    useEffect(() => {
        if (showAddWord) {
            setTimeout(() => {
                addWordRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [showAddWord]);

    return (
        <>
            <WordListHeader />

            {showAddWord && (
                <AddWord ref={addWordRef} setShowAddWord={setShowAddWord} />
            )}
            {isLoading ? (
                <div>
                    <Loading message="단어"></Loading>
                </div>
            ) : (
                <ul className="divide-y divide-gray-100 p-0 sm:p-3 md:p-6">
                    {words.map((word) => (
                        <WordItem
                            key={word.id}
                            word={word}
                            isSelectionMode={isSelectionMode}
                            isMemorizationMode={isMemorizationMode}
                        />
                    ))}
                </ul>
            )}
            <Pagination />
        </>
    );
};

export default WordList;
