import React from 'react';

const ItemNav = ({
    showAddWord,
    setShowAddWord,
    isSelectionMode,
    toggleSelectionMode,
    selectedWordsCount,
    vocaName,
    wordsCount,
}) => {
    var listName = vocaName;
    var listNum = wordsCount;

    return (
        <section className="container px-4 mb-3">
            <div className="sm:flex sm:items-center justify-between">
                <div>
                    <div className="flex-col items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            {listName}
                        </h2>
                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                            {listNum}개
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300"></p>
                </div>
                <div className="flex items-center mt-4 gap-x-3 ">
                    <button
                        onClick={toggleSelectionMode}
                        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide transition-colors duration-200 rounded-lg shrink-0 sm:w-auto gap-x-2
                            ${
                                isSelectionMode
                                    ? 'bg-gray-400 text-black ring-2 ring-gray-500'
                                    : 'text-gray-700 bg-white border hover:bg-gray-100'
                            }
                        `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-check-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                        </svg>
                        <span className="keep-all">
                            {isSelectionMode
                                ? `${selectedWordsCount}개 선택됨`
                                : '단어 선택'}
                        </span>
                    </button>
                    <button
                        onClick={() => {
                            showAddWord
                                ? setShowAddWord(false)
                                : setShowAddWord(true);
                        }}
                        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 rounded-lg shrink-0 sm:w-auto gap-x-2
                            ${
                                showAddWord
                                    ? 'bg-blue-700 ring-2 ring-blue-950'
                                    : 'hover:bg-blue-600 bg-blue-500'
                            }
                          `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="keep-all">단어 추가</span>
                    </button>
                </div>
            </div>

            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    <button className="px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                        기본 모드
                    </button>
                    <button className="px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        암기 모드
                    </button>
                    <button className="px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        관심 단어 보기
                    </button>
                </div>
                <div className="relative flex items-center mt-4 lg:mt-0">
                    <span className="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>
        </section>
    );
};

export default ItemNav;
