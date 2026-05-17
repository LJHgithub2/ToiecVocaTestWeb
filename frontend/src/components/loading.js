import React from 'react';

const Loading = ({ message = '정보' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[320px]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-sm font-medium text-slate-400">{message}를 불러오는 중...</p>
            </div>
        </div>
    );
};

export default Loading;
