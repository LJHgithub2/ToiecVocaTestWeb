import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Item from './Item.js';
import React, { useEffect, useState, useRef } from 'react';
import ItemNav from './itemNav.js';
import { getPublicWords } from '../services/wordService';
import { useParams } from 'react-router-dom';
import FormFloatingLabels from '../components/addWord';

export default function ListItem() {
    const { id } = useParams();
    const [words, setWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [showAddWord, setShowAddWord] = useState(false);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const addWordRef = useRef(null);

    useEffect(() => {
        const fetchPublicWords = async () => {
            try {
                const data = await getPublicWords(id);
                if (data) {
                    setWords(data);
                } else {
                    console.log('단어가 없습니다.');
                    setWords([]);
                }
            } catch (error) {
                console.log('Failed to fetch profile data.');
            }
        };
        fetchPublicWords();
    }, [trigger]);

    useEffect(() => {
        if (showAddWord) {
            setTimeout(() => {
                addWordRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [showAddWord]);

    const handleWordSelect = (word, checked) => {
        if (!isSelectionMode) return;
        setSelectedWords((prevSelected) => {
            if (checked) {
                return [...prevSelected, word];
            } else {
                return prevSelected.filter((w) => w !== word);
            }
        });
    };

    const toggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        if (isSelectionMode) {
            setSelectedWords([]); // 선택 모드를 끌 때 선택된 단어들 초기화
        }
    };

    return (
        <>
            <ItemNav
                showAddWord={showAddWord}
                setShowAddWord={setShowAddWord}
                isSelectionMode={isSelectionMode}
                toggleSelectionMode={toggleSelectionMode}
                selectedWordsCount={selectedWords.length}
            />
            {showAddWord && (
                <FormFloatingLabels
                    ref={addWordRef}
                    trigger={trigger}
                    setTrigger={setTrigger}
                    setShowAddWord={setShowAddWord}
                />
            )}

            <ul role="list" className="divide-y mb-0 divide-gray-100 pl-0">
                {words.map((word, index) => (
                    <Item
                        key={word.word}
                        word={word}
                        index={index}
                        isSelectionMode={isSelectionMode}
                        isSelected={selectedWords.includes(word)}
                        onSelect={(checked) => handleWordSelect(word, checked)}
                    />
                ))}
            </ul>

            {/* 하단 바 */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{' '}
                            <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">97</span> results
                        </p>
                    </div>
                    <div>
                        <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                        >
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </a>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            <a
                                href="#"
                                aria-current="page"
                                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                2
                            </a>
                            <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            >
                                3
                            </a>
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                ...
                            </span>
                            <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            >
                                8
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                9
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                10
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
