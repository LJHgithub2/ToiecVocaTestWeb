import React, { useState } from 'react';

const CounterBtn = () => {
    const [count, setCount] = useState(0);

    const decrement = () => { if (count > -5) setCount((c) => c - 1); };
    const increment = () => { if (count < 5) setCount((c) => c + 1); };

    const color =
        count > 0 ? 'text-red-500' : count < 0 ? 'text-emerald-600' : 'text-slate-500';

    return (
        <div className="flex flex-col items-center gap-0.5" data-allow="true">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">난이도</span>
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl px-1.5 py-1">
                <button
                    onClick={decrement}
                    className="h-5 w-5 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                    data-allow="true"
                    aria-label="감소"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                </button>
                <span className={`text-sm font-bold w-5 text-center tabular-nums ${color}`}>{count}</span>
                <button
                    onClick={increment}
                    className="h-5 w-5 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                    data-allow="true"
                    aria-label="증가"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CounterBtn;
