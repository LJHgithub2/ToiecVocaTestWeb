import CheckBox from './button/checkBox';
import CounterBtn from './button/counterBtn';
import DetailView from './detailView';
import React, { useState, useRef, useEffect } from 'react';
import {
    StarIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';

function Item({ word, index, isSelectionMode, isSelected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [isSpeakerIcon, setIsSpeakerIcon] = useState(true);
    const [isFavorite, setIsFavorite] = useState(word.is_favorite);

    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Here you would typically update the backend as well
    };

    useEffect(() => {
        if (isOpen) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isOpen]);
    useEffect(() => {
        console.log(isSelectionMode);
    }, [isSelectionMode]);

    return (
        <li key={word.word} className="py-2 w-full">
            <div
                className={`flex justify-between px-3 py-2 items-center transition duration-300 ease-in-out rounded-lg hover:shadow-md ${
                    isOpen ? 'bg-gray-100' : ''
                } ${isSelected ? '!bg-blue-100' : ''}`}
            >
                <div className="flex  w-[40%] items-center space-x-4">
                    <div className="min-w-0">
                        <div className="flex gap-x-3 items-center">
                            <p className="text-2xl font-semibold text-gray-900">
                                {word.word}
                            </p>
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                    isSelected
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}
                            >
                                {word.chapter} chapter
                            </span>
                        </div>
                        {/* 단어의 뜻을 강조하여 표시하고, 줄바꿈과 단어 분리 적용 */}
                        <p className="text-base text-gray-800 font-medium mt-1 line-clamp-2 break-words whitespace-normal">
                            {word.mean}
                        </p>
                        {/* 품사를 더 작고 연한 색상으로 표시 */}
                        <p className="text-xs text-gray-400 mt-1 italic">
                            {word.part_of_speech}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-end space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <button
                        onClick={() => setIsSpeakerIcon(!isSpeakerIcon)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        {isSpeakerIcon ? (
                            <SpeakerWaveIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <SpeakerXMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                    </button>

                    <button
                        onClick={toggleFavorite}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        <StarIcon
                            className={`w-5 h-5 ${
                                isFavorite
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-400 dark:text-gray-500'
                            }`}
                        />
                    </button>

                    {!isSelectionMode ? (
                        <div className="hidden sm:block">
                            <CounterBtn />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out"
                                id={word.word}
                                onChange={(event) =>
                                    onSelect(event.target.checked)
                                }
                                checked={isSelected}
                            />
                        </div>
                    )}

                    <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                        onClick={toggleAccordion}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition duration-300 ease-in-out ${
                                isOpen ? 'transform rotate-180' : ''
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div
                    ref={contentRef}
                    className="transition-all duration-300 ease-in-out overflow-hidden bg-white p-4 border-t"
                    style={{ maxHeight }}
                >
                    <DetailView word={word} />
                </div>
            )}
        </li>
    );
}

export default Item;
