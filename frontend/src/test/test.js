import React, { useState } from 'react';
import './test.css'; // 스타일 파일

const FormFloatingLabels = React.forwardRef((props, ref) => {
    const [showError, setShowError] = useState(false);

    const toggleError = () => {
        setShowError((prev) => !prev);
    };

    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        if (inputValue === '') setIsFocused(false);
    };
    const handleChange = (e) => setInputValue(e.target.value);

    return (
        <div
            ref={ref}
            className="container mx-auto px-6 py-8 
            transition transform duration-300 animate-fadeInUp"
        >
            <div className="bg-white border-0 shadow-lg rounded-3xl p-6">
                <h1 className="text-2xl font-bold mb-8">단어 추가</h1>
                <form id="form" noValidate>
                    <div className="flex flex-wrap md:flex-nowrap gap-9 mb-5">
                        <div className="relative z-0 w-full">
                            <input
                                type="text"
                                name="word"
                                placeholder=" "
                                required
                                className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-gray-400 border-b-2 border-x-0 border-t-0 focus:border-gray-700 focus:ring-0
                                }`}
                            />
                            <label
                                htmlFor="word"
                                className={`absolute duration-300 top-3 pl-1 -z-1 origin-0 `}
                            >
                                영어단어를 입력하세요
                            </label>
                            <span
                                className={`text-sm text-red-600 ${
                                    showError ? '' : 'hidden'
                                }`}
                                id="error"
                            >
                                word is required
                            </span>
                        </div>

                        <div className="relative z-0 w-full">
                            <input
                                type="number"
                                name="chapter"
                                placeholder=" "
                                required
                                className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-gray-400 border-b-2 border-x-0 border-t-0 focus:border-gray-700 focus:ring-0
                                }`}
                            />
                            <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">
                                chapter
                            </div>
                            <label
                                htmlFor="chapter"
                                className={`absolute duration-300 top-3 pl-1 -z-1 origin-0 `}
                            >
                                챕터를 입력하세요(숫자만)
                            </label>
                            <span
                                className={`text-sm text-red-600 ${
                                    showError ? '' : 'hidden'
                                }`}
                                id="error"
                            >
                                chapter is required
                            </span>
                        </div>

                        <div className="grid w-full md:grid-cols-2 gap-5 ">
                            <div className="relative z-0 w-full">
                                <input
                                    type="text"
                                    name="mean"
                                    placeholder=" "
                                    className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-gray-400 border-b-2 border-x-0 border-t-0 focus:border-gray-700 focus:ring-0`}
                                />
                                <label
                                    htmlFor="mean"
                                    className={`absolute duration-300 pl-1 top-3 -z-1 origin-0 `}
                                >
                                    영어단어 뜻을 입력하세요.
                                </label>
                                <span
                                    className={`text-sm text-red-600 ${
                                        showError ? '' : 'hidden'
                                    }`}
                                    id="error"
                                >
                                    mean is required
                                </span>
                            </div>

                            <div className="relative z-0 w-full">
                                <input
                                    type="text"
                                    name="part_of_speech"
                                    placeholder=" "
                                    className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-gray-400 border-b-2 border-x-0 border-t-0 focus:border-gray-700 focus:ring-0`}
                                />
                                <label
                                    htmlFor="part_of_speech"
                                    className={`absolute duration-300 top-3 pl-1 -z-1 origin-0 `}
                                >
                                    품사를 입력하세요.
                                </label>
                                <span
                                    className={`text-sm text-red-600 ${
                                        showError ? '' : 'hidden'
                                    }`}
                                    id="error"
                                >
                                    품사는 필수 입니다.
                                </span>
                            </div>
                        </div>

                        <div className="relative z-0 w-full">
                            <input
                                type="text"
                                name="example_sentence"
                                placeholder=" "
                                className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-gray-400 border-b-2 border-x-0 border-t-0 focus:border-gray-700 focus:ring-0 overflow-hidden`}
                            />
                            <label
                                htmlFor="example_sentence"
                                className={`absolute duration-300 top-4 pl-1 -z-1 origin-0 `}
                            >
                                예문를 작성하세요
                            </label>
                            <span
                                className={`text-sm text-red-600 ${
                                    showError ? '' : 'hidden'
                                }`}
                                id="error"
                            >
                                example_sentence is required
                            </span>
                        </div>

                        <div className="relative z-0 w-full mt-3">
                            <textarea
                                type="text"
                                name="memo"
                                placeholder=" "
                                className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-gray-400 border-b-2 border-x-0 border-t-2 focus:border-gray-700 focus:ring-0 overflow-hidden`}
                            />
                            <label
                                htmlFor="memo"
                                className={`absolute duration-300 top-0 pl-1 -z-1 origin-0 `}
                            >
                                메모를 작성하세요
                            </label>
                            <span
                                className={`text-sm text-red-600 ${
                                    showError ? '' : 'hidden'
                                }`}
                                id="error"
                            >
                                memo is required
                            </span>
                        </div>
                    </div>
                    <button
                        id="button"
                        type="button"
                        onClick={toggleError}
                        className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
                    >
                        Toggle Error
                    </button>
                </form>
            </div>
        </div>
    );
});

export default FormFloatingLabels;
