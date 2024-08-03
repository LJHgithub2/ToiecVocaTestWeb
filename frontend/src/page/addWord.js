import React, { useState } from 'react';

export default function AddWord() {
    const [wordData, setWordData] = useState({
        word: '',
        mean: '',
        chapter: 0,
        part_of_speech: '',
        synonyms: [''],
        antonyms: [''],
        is_favorite: false,
        memo: '',
        example_sentence: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setWordData({
            ...wordData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleArrayChange = (e, index, field) => {
        const updatedArray = [...wordData[field]];
        updatedArray[index] = e.target.value;
        setWordData({ ...wordData, [field]: updatedArray });
    };

    const addArrayField = (field) => {
        setWordData({ ...wordData, [field]: [...wordData[field], ''] });
    };

    const removeArrayField = (index, field) => {
        const updatedArray = wordData[field].filter((_, i) => i !== index);
        setWordData({ ...wordData, [field]: updatedArray });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 데이터 전송 로직 추가
        console.log(wordData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    단어 추가
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        단어
                    </label>
                    <input
                        type="text"
                        name="word"
                        value={wordData.word}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="단어를 입력하세요"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        뜻
                    </label>
                    <textarea
                        name="mean"
                        value={wordData.mean}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="단어의 뜻을 입력하세요"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        챕터
                    </label>
                    <input
                        type="number"
                        name="chapter"
                        value={wordData.chapter}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="챕터 번호"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        품사
                    </label>
                    <input
                        type="text"
                        name="part_of_speech"
                        value={wordData.part_of_speech}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="품사를 입력하세요"
                    />
                </div>

                {/* Synonyms */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        유의어
                    </label>
                    {wordData.synonyms.map((synonym, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={synonym}
                                onChange={(e) =>
                                    handleArrayChange(e, index, 'synonyms')
                                }
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="유의어를 입력하세요"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    removeArrayField(index, 'synonyms')
                                }
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField('synonyms')}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        + 유의어 추가
                    </button>
                </div>

                {/* Antonyms */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        반의어
                    </label>
                    {wordData.antonyms.map((antonym, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={antonym}
                                onChange={(e) =>
                                    handleArrayChange(e, index, 'antonyms')
                                }
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="반의어를 입력하세요"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    removeArrayField(index, 'antonyms')
                                }
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField('antonyms')}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        + 반의어 추가
                    </button>
                </div>

                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="is_favorite"
                            checked={wordData.is_favorite}
                            onChange={handleChange}
                            className="form-checkbox text-blue-600"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">
                            즐겨찾기
                        </span>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        메모
                    </label>
                    <textarea
                        name="memo"
                        value={wordData.memo}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="메모를 입력하세요"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        예문
                    </label>
                    <textarea
                        name="example_sentence"
                        value={wordData.example_sentence}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="예문을 입력하세요"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        단어 추가
                    </button>
                </div>
            </form>
        </div>
    );
}
