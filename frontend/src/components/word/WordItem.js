import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWordContext } from '../../context/WordContext';
import WordDetails from './WordDetails';
import FavoriteButton from './FavoriteButton';
import SelectionCheckbox from './SelectionCheckbox';
import AudioPlayer from './AudioPlayer';
import CounterBtn from './counterBtn';

const HOLD_DURATION = 900;

const WordItem = ({ word, isSelectionMode, isMemorizationMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedWords, setSelectedWords } = useWordContext();
    const contentRef = useRef(null);

    const [myMemorizationMode, setMyMemorizationMode] = useState(isMemorizationMode);
    const [isRevealing, setIsRevealing] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);
    const isHeld = useRef(false);
    const rafId = useRef(null);

    const isSelected = selectedWords.some((w) => w.id === word.id);

    const startHold = () => {
        isHeld.current = true;
        setIsRevealing(true);
        setHoldProgress(0);

        const startTime = Date.now();

        const tick = () => {
            if (!isHeld.current) return;
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
            setHoldProgress(progress);
            if (progress < 100) {
                rafId.current = requestAnimationFrame(tick);
            } else {
                setMyMemorizationMode(false);
            }
        };

        rafId.current = requestAnimationFrame(tick);
    };

    const endHold = () => {
        isHeld.current = false;
        setIsRevealing(false);
        setHoldProgress(0);
        setMyMemorizationMode(true);
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    };

    const handleTouchOrMouse = (event) => {
        if (!isMemorizationMode) return;

        let el = event.target;
        while (el) {
            if (el.hasAttribute('data-allow')) return;
            el = el.parentElement;
        }

        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'mousedown' || event.type === 'touchstart') startHold();
        else if (['mouseup', 'mouseleave', 'touchend'].includes(event.type)) endHold();
    };

    useEffect(() => {
        setMyMemorizationMode(isMemorizationMode);
    }, [isMemorizationMode]);

    const handleSelect = (checked) => {
        setSelectedWords((prev) =>
            checked ? [...prev, word] : prev.filter((w) => w.id !== word.id)
        );
    };

    return (
        <li className="py-1.5">
            <div
                className={`rounded-2xl border transition-all duration-200 select-none ${
                    isRevealing
                        ? 'border-indigo-200 bg-indigo-50/50'
                        : isSelected
                        ? 'border-indigo-300 bg-indigo-50'
                        : isOpen
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
                onMouseDown={handleTouchOrMouse}
                onMouseUp={handleTouchOrMouse}
                onMouseLeave={handleTouchOrMouse}
                onTouchStart={handleTouchOrMouse}
                onTouchEnd={handleTouchOrMouse}
            >
                <div className="flex items-center gap-3 px-4 py-3.5">
                    {/* Word info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-bold text-slate-900 break-words">{word.word}</span>
                            <span className={`px-2 py-0.5 rounded-md text-xs font-medium no-select ${
                                isSelected ? 'bg-indigo-200 text-indigo-800' : 'bg-slate-100 text-slate-500'
                            }`}>
                                {myMemorizationMode ? 'CH ?' : `CH ${word.chapter}`}
                            </span>
                        </div>
                        <p className={`text-sm mt-0.5 font-medium transition-all duration-300 ${
                            myMemorizationMode ? 'text-transparent bg-slate-200 rounded select-none' : 'text-slate-600'
                        }`}>
                            {word.mean}
                        </p>
                        {!myMemorizationMode && word.part_of_speech && (
                            <p className="text-xs text-slate-400 italic mt-0.5">{word.part_of_speech}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0" data-allow="true">
                        <AudioPlayer word={word.word} dataAllow="true" />
                        <FavoriteButton isFavorite={word.isFavorite || false} wordName={word.word} dataAllow="true" />

                        {!isSelectionMode ? (
                            <div className="hidden sm:block" data-allow="true">
                                <CounterBtn />
                            </div>
                        ) : (
                            <SelectionCheckbox isSelected={isSelected} onChange={handleSelect} dataAllow="true" />
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                            data-allow="true"
                            aria-label="상세보기"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Hold progress bar */}
                {isRevealing && (
                    <div className="h-1 w-full bg-slate-200 rounded-b-2xl overflow-hidden">
                        <div
                            className="h-full bg-indigo-500"
                            style={{ width: `${holdProgress}%` }}
                        />
                    </div>
                )}

                {/* Accordion details */}
                {isOpen && (
                    <div
                        ref={contentRef}
                        className="border-t border-slate-100 animate-fade-in"
                    >
                        <WordDetails word={word} />
                    </div>
                )}
            </div>
        </li>
    );
};

WordItem.propTypes = {
    word: PropTypes.shape({
        word: PropTypes.string.isRequired,
        mean: PropTypes.string.isRequired,
    }).isRequired,
    isSelectionMode: PropTypes.bool.isRequired,
    isMemorizationMode: PropTypes.bool.isRequired,
};

export default React.memo(WordItem);
