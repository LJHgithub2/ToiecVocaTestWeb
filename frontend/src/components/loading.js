import React from 'react';

const Loading = ({ message = '정보' }) => {
    return (
        <div className="flex flex-col items-center justify-center py-3 bg-gray-50">
            <div className="p-8 bg-gray-800 rounded-lg shadow-lg my-24">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-t-4 border-cyan-400 border-solid rounded-full animate-spin"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-blue-200 border-solid rounded-full animate-pulse opacity-50"></div>
                    </div>
                    <div className="text-blue-100 text-xl font-light tracking-wider">
                        {message}를 불러오는 중입니다...
                    </div>
                </div>
                {/* <div className="mt-6 w-64 bg-gray-700 rounded-full h-1 overflow-hidden">
                    <div className="bg-blue-500 h-1 rounded-full w-0 animate-loading-progress"></div>
                </div> */}
            </div>
        </div>
    );
};

export default Loading;
