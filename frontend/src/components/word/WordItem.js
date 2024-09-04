import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWordContext } from '../../context/WordContext';
import WordDetails from './WordDetails';
import FavoriteButton from './FavoriteButton';
import SelectionCheckbox from './SelectionCheckbox';
import AudioPlayer from './AudioPlayer';
import CounterBtn from './counterBtn';

const WordItem = ({ word, isSelectionMode, isMemorizationMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedWords, setSelectedWords } = useWordContext();
    const [maxHeight, setMaxHeight] = useState('0px');
    const contentRef = useRef(null);

    const [myMemorizationMode, setMyMemorizationMode] =
        useState(isMemorizationMode);

    const [timerId, setTimerId] = useState(null);
    const [isDarkening, setIsDarkening] = useState(false); // To track if the color should darken
    const isHeld = useRef(false);

    const startHold = () => {
        isHeld.current = true;
        setIsDarkening(true);
        const id = setTimeout(() => {
            if (isHeld.current) {
                setMyMemorizationMode(false);
            }
        }, 1000);
        setTimerId(id);
    };

    const endHold = () => {
        isHeld.current = false;
        setIsDarkening(false);
        setMyMemorizationMode(true);
        if (timerId) {
            clearTimeout(timerId);
            setTimerId(null);
        }
    };
    const handleTouchOrMouse = (event) => {
        if (!isMemorizationMode) return; // isMemorizationMode가 true일 때만 이벤트 처리

        // 이벤트 발생 요소부터 부모 요소까지 순회하면서 data-allow 속성을 가진 요소를 찾음
        let currentElement = event.target;

        while (currentElement) {
            if (currentElement.hasAttribute('data-allow')) {
                // data-allow 속성이 있는 부모 요소가 있으면 이벤트를 허용
                return;
            }
            currentElement = currentElement.parentElement;
        }

        // data-allow 속성이 없는 경우 기본 동작을 막고 이벤트 전파를 중단
        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'mousedown' || event.type === 'touchstart') {
            startHold();
        } else if (
            event.type === 'mouseup' ||
            event.type === 'mouseleave' ||
            event.type === 'touchend'
        ) {
            endHold();
        }
    };

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (checked) => {
        setSelectedWords((prev) =>
            checked ? [...prev, word] : prev.filter((w) => w.id !== word.id)
        );
    };

    useEffect(() => {
        setMyMemorizationMode(isMemorizationMode);
    }, [isMemorizationMode]);

    useEffect(() => {
        if (isOpen) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isOpen]);

    return (
        <li key={word.word} className="py-2 w-full">
            <div
                className={`transition duration-300 ease-in-out rounded-lg
                ${
                    isDarkening
                        ? '!bg-cyan-50'
                        : selectedWords.includes(word)
                        ? 'bg-blue-100'
                        : isOpen
                        ? 'bg-gray-100'
                        : ''
                } 
                ${isDarkening ? 'transition-all duration-[1000ms]' : ''}`}
                onMouseDown={handleTouchOrMouse}
                onMouseUp={handleTouchOrMouse}
                onMouseLeave={handleTouchOrMouse}
                onTouchStart={handleTouchOrMouse}
                onTouchEnd={handleTouchOrMouse}
            >
                <div className="flex gap-x-3 items-center px-3 pt-2 justify-between">
                    <p className="text-2xl font-semibold text-gray-900 line-clamp-2 break-words whitespace-normal">
                        {word.word}
                    </p>
                    <span
                        className={`px-2 py-1 text-xs rounded-full  no-select ${
                            selectedWords.includes(word)
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                        {myMemorizationMode ? '-' : word.chapter} chapter
                    </span>
                </div>
                <div className={`flex justify-between px-3 pb-2 items-center`}>
                    <div className="flex  w-[40%] items-center space-x-4">
                        <div className="min-w-0">
                            <p className="text-base text-gray-800 font-medium mt-1 line-clamp-2 break-words whitespace-normal">
                                {myMemorizationMode ? '****' : word.mean}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 italic">
                                {myMemorizationMode
                                    ? '****'
                                    : word.part_of_speech}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                        <AudioPlayer word={word.word} dataAllow="true" />
                        <FavoriteButton
                            isFavorite={word.isFavorite || false}
                            wordName={word.word}
                            dataAllow="true"
                        />

                        {!isSelectionMode ? (
                            <div className="hidden sm:block" data-allow="true">
                                <CounterBtn />
                            </div>
                        ) : (
                            <SelectionCheckbox
                                isSelected={selectedWords.includes(word)}
                                onChange={handleSelect}
                                dataAllow="true"
                            />
                        )}

                        <button
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={toggleAccordion}
                            data-allow="true"
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
            </div>
            {isOpen && (
                <div
                    ref={contentRef}
                    className="transition-all duration-300 ease-in-out overflow-hidden bg-white p-4 border-t"
                    style={{ maxHeight }}
                >
                    <WordDetails word={word} />
                </div>
            )}
        </li>
    );
};

WordItem.propTypes = {
    // word prop은 객체 형태로 되어야 하며, 아래의 속성들을 포함해야 합니다.
    word: PropTypes.shape({
        word: PropTypes.string.isRequired, // word는 필수로 문자열이어야 합니다.
        mean: PropTypes.string.isRequired, // mean은 필수로 문자열이어야 합니다.
        // isFavorite: PropTypes.bool.isRequired, // isFavorite은 필수로 불리언 값이어야 합니다.
    }).isRequired, // word는 필수로 제공되어야 하는 객체입니다.

    // isSelectionMode prop은 불리언 값이어야 하며 필수로 제공되어야 합니다.
    isSelectionMode: PropTypes.bool.isRequired,

    // isMemorizationMode prop은 불리언 값이어야 하며 필수로 제공되어야 합니다.
    isMemorizationMode: PropTypes.bool.isRequired,
};

export default React.memo(WordItem);
