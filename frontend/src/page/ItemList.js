import React, { useRef, useEffect } from 'react';
import { useWordContext } from '../context/WordContext';
import WordItem from '../components/word/WordItem';
import WordListHeader from '../components/word/WordListHeader';
import Pagination from '../components/word/Pagination';
import AddWord from '../components/word/AddWord.js';
import Loading from '../components/loading.js';

const WordList = () => {
    const { words, isSelectionMode, isMemorizationMode, showAddWord, setShowAddWord, isLoading } = useWordContext();
    const addWordRef = useRef(null);

    useEffect(() => {
        if (showAddWord) {
            setTimeout(() => {
                addWordRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [showAddWord]);

    return (
        <div className="animate-fade-in">
            <WordListHeader />

            {showAddWord && (
                <AddWord ref={addWordRef} setShowAddWord={setShowAddWord} />
            )}

            {isLoading ? (
                <Loading message="단어" />
            ) : words.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-slate-500 font-medium">단어가 없습니다</p>
                    <p className="text-sm text-slate-400 mt-1">단어 추가 버튼으로 첫 단어를 등록하세요</p>
                </div>
            ) : (
                <ul className="space-y-1.5 p-0 list-none">
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
        </div>
    );
};

export default WordList;
