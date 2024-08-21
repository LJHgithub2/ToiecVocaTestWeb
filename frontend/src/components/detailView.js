import React from 'react';
import { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function DetailView({ word }) {
    const [value, setValue] = useState(3); // Initialize state with default value

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    단어 상세 정보
                </h3>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            단어
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {word.word}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            뜻
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {word.mean}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            품사
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {word.part_of_speech}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            예문
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {word.example_sentence || '-'}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            메모
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {word.memo || '-'}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            난이도
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)} // Update state on change
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
