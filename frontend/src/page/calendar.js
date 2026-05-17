import React from 'react';
import {
    startOfMonth, endOfMonth, startOfWeek, endOfWeek,
    eachDayOfInterval, format, addMonths, subMonths,
    isSameMonth, isToday,
} from 'date-fns';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
        weeks.push(allDays.slice(i, i + 7));
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {format(currentMonth, 'yyyy년 M월')}
                    </h1>
                    <p className="text-sm text-slate-400 mt-0.5">학습 일정을 관리하세요</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        aria-label="이전 달"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentMonth(new Date())}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        오늘
                    </button>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        aria-label="다음 달"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Calendar grid */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-slate-100">
                    {DAYS_OF_WEEK.map((day, i) => (
                        <div
                            key={day}
                            className={`py-3 text-center text-xs font-semibold uppercase tracking-wide ${
                                i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-slate-400'
                            }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Weeks */}
                {weeks.map((week, wi) => (
                    <div
                        key={wi}
                        className={`grid grid-cols-7 ${wi < weeks.length - 1 ? 'border-b border-slate-100' : ''}`}
                    >
                        {week.map((day, di) => {
                            const inMonth = isSameMonth(day, currentMonth);
                            const todayFlag = isToday(day);
                            return (
                                <div
                                    key={day}
                                    className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-slate-100 last:border-r-0 transition-colors hover:bg-slate-50 cursor-pointer ${
                                        !inMonth ? 'bg-slate-50/50' : ''
                                    }`}
                                >
                                    <span
                                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                                            todayFlag
                                                ? 'bg-indigo-600 text-white font-bold'
                                                : di === 0
                                                ? 'text-red-400'
                                                : di === 6
                                                ? 'text-blue-400'
                                                : inMonth
                                                ? 'text-slate-700'
                                                : 'text-slate-300'
                                        }`}
                                    >
                                        {format(day, 'd')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
