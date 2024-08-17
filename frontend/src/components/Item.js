import CheckBox from './button/checkBox';
import CounterBtn from './button/counterBtn';
import DetailView from './detailView';
import React, { useState, useRef, useEffect } from 'react';

function Item({ word, index, isSelectionMode, isSelected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [isSpeakerIcon, setIsSpeakerIcon] = useState(true);
    const toggleIcon = () => {
        setIsSpeakerIcon(!isSpeakerIcon);
    };

    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isOpen]);

    return (
        <li key={word.word} className="py-2">
            <div
                className={`flex justify-between  min-h-[100px] px-3 py-2 items-center transition duration-300 ease-in-out ${
                    isOpen ? 'bg-gray-100' : ''
                } ${isSelected ? '!bg-blue-100' : ''}`}
            >
                <div>
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <div className="flex gap-x-3 items-start">
                                <p className="text-3xl font-semibold leading-6 text-gray-900">
                                    {word.word}
                                </p>
                                <span
                                    className={`px-3 py-0.5 text-xs rounded-full text-blue-600
                                    ${
                                        isSelected
                                            ? 'bg-yellow-100'
                                            : 'bg-blue-100'
                                    }`}
                                >
                                    {word.chapter} chapter
                                </span>
                            </div>
                            <div onClick={toggleIcon}>
                                {isSpeakerIcon ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="cursor-pointer transition-all fill-slate-950 hover:bg-opacity-55 hover:bg-gray-400 hover:rounded-full"
                                    >
                                        <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M10 5.04 8.312 6.39A.5.5 0 0 1 8 6.5H6v3h2a.5.5 0 0 1 .312.11L10 10.96z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-slate-950"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                                        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                                        <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-5">
                    {!isOpen && (
                        <div className="hidden md:flex md:flex-col flex-wrap">
                            <p className="text-sm my-1 grow text-right leading-10 text-gray-900 max-w-lg sm:max-w-xs md:max-w-sm lg:max-w-lg line-clamp-1 break-all">
                                {word.mean}
                            </p>
                            <p className="text-xs my-2 leading-5 text-right text-gray-500">
                                {word.role}
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col">
                        {!isSelectionMode ? (
                            <>
                                <CheckBox id={word.word} />
                                <CounterBtn />
                            </>
                        ) : (
                            <div className="h-full content-center my-1">
                                <input
                                    type="checkbox"
                                    className="h-8 w-8 content-center bg-gray-200 rounded-lg border-2 border-gray-400 focus:ring-4 focus:ring-blue-300 checked:bg-blue-500 checked:border-transparent transition-all duration-200 ease-in-out cursor-pointer"
                                    id={word.word}
                                    onChange={(event) =>
                                        onSelect(event.target.checked)
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <button
                            className="hover:transition-all hover:scale-110"
                            onClick={() => toggleAccordion()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className={`w-6 h-6 transition duration-300 ease-in-out ${
                                    isOpen ? 'transform rotate-180' : ''
                                }`}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* 아코디언으로 표시된 상세 정보 */}
            {isOpen && (
                <div
                    ref={contentRef}
                    className="transition-max-height duration-1000 overflow-hidden ease-in-out bg-white p-4 border shadow-md"
                    style={{ maxHeight }}
                >
                    <DetailView word={word} />
                </div>
            )}
        </li>
    );
}

export default Item;
