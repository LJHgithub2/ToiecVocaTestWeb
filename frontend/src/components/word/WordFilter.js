import React from 'react';
import { useWordContext } from '../../context/WordContext';
import { RotateCcw } from 'lucide-react';

const WordFilter = () => {
    const {
        filterChapters, setFilterChapters,
        filterPOS, setFilterPOS,
        availableChapters, availablePOS,
        resetFilters,
    } = useWordContext();

    const toggleChapter = (ch) =>
        setFilterChapters(prev =>
            prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
        );

    const togglePOS = (pos) =>
        setFilterPOS(prev =>
            prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
        );

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4 animate-fade-in">

            {/* Chapter filter */}
            {availableChapters.length > 0 && (
                <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">챕터</p>
                    <div className="flex flex-wrap gap-1.5">
                        {availableChapters.map(ch => (
                            <button
                                key={ch}
                                onClick={() => toggleChapter(ch)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
                                    filterChapters.includes(ch)
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                                }`}
                            >
                                CH {ch}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Part of speech filter */}
            {availablePOS.length > 0 && (
                <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">품사</p>
                    <div className="flex flex-wrap gap-1.5">
                        {availablePOS.map(pos => (
                            <button
                                key={pos}
                                onClick={() => togglePOS(pos)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
                                    filterPOS.includes(pos)
                                        ? 'bg-violet-600 text-white shadow-sm'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600'
                                }`}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Reset */}
            <div className="flex justify-end">
                <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-700 hover:bg-white transition-all duration-150"
                >
                    <RotateCcw size={12} />
                    초기화
                </button>
            </div>
        </div>
    );
};

export default WordFilter;
