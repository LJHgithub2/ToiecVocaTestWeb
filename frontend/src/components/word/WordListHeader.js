import React from 'react';
import { useWordContext } from '../../context/WordContext';

const WordListHeader = () => {
    const {
        isSelectionMode, setIsSelectionMode,
        isMemorizationMode, setIsMemorizationMode,
        vocaName, selectedWords, setSelectedWords,
        showAddWord, setShowAddWord, wordCount,
    } = useWordContext();

    const toggleSelectionMode = () => {
        if (isSelectionMode) {
            setIsSelectionMode(false);
            setSelectedWords([]);
        } else {
            setIsSelectionMode(true);
        }
    };

    return (
        <div className="mb-6">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{vocaName}</h2>
                    <span className="inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                        {Number(wordCount).toLocaleString()}개 단어
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleSelectionMode}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isSelectionMode
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="keep-all whitespace-nowrap">
                            {isSelectionMode ? `${selectedWords.length}개 선택됨` : '단어 선택'}
                        </span>
                    </button>

                    <button
                        onClick={() => setShowAddWord(!showAddWord)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                            showAddWord
                                ? 'bg-indigo-700 text-white shadow-sm'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={showAddWord ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'} />
                        </svg>
                        <span className="keep-all whitespace-nowrap">단어 추가</span>
                    </button>
                </div>
            </div>

            {/* Mode toggle + search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Mode pills */}
                <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
                    <button
                        onClick={() => setIsMemorizationMode(false)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                            !isMemorizationMode
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        기본 모드
                    </button>
                    <button
                        onClick={() => setIsMemorizationMode(true)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                            isMemorizationMode
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        🧠 암기 모드
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="단어 검색..."
                        className="w-full pl-9 pr-4 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};

export default WordListHeader;
