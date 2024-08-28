import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getVocabularys,
    addVocabulary,
    toggleFavorite,
    deleteVocabulary,
} from '../services/vocabularyService';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL;

const RANK_MAP = {
    1: '비법 단어장',
    2: '인증 단어장',
    3: '일반 단어장',
    4: '인증되지 않은 단어장',
};

export default function PublicVoca() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [vocab, setVocab] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVocab, setNewVocab] = useState({
        name: '',
        description: '',
        vocab_image: '',
        rank: '',
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchVocabularys = async () => {
            try {
                const data = await getVocabularys();
                if (data) {
                    setVocab(data);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log('Failed to fetch vocabulary data.');
                setIsAuthenticated(false);
            }
        };
        fetchVocabularys();
    }, []);

    const handleAddVocabulary = async () => {
        try {
            const data = await addVocabulary(newVocab);
            if (data) {
                setVocab([...vocab, data.vocab]);
                setIsModalOpen(false);
                setNewVocab({
                    name: '',
                    description: '',
                    vocab_image: '',
                    rank: '',
                });
                setImagePreview(null);
                alert('공용 단어장 추가 성공');
            }
        } catch (error) {
            alert(error.response.data.errors);
            handleModalClose();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setNewVocab({ ...newVocab, vocab_image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleModalClose = () => {
        setNewVocab({
            name: '',
            description: '',
            rank: '',
            vocabulary_images: null,
        });
        setImagePreview(null);
        setIsModalOpen(false);
    };

    const handleToggleFavorite = async (id) => {
        try {
            const favorite = vocab.find((item) => item.id === id)?.is_favorite;
            if (favorite === undefined) {
                throw new Error('Item not found');
            }

            var data = await toggleFavorite(id, !favorite);

            if (data) {
                setVocab(
                    vocab.map((item) =>
                        item.id === id
                            ? { ...item, is_favorite: !item.is_favorite }
                            : item
                    )
                );
            }
        } catch (error) {
            alert(error.response.data.errors);
        }
    };

    const handleDeleteVocabulary = async (id) => {
        if (window.confirm('정말로 이 단어장을 삭제하시겠습니까?')) {
            try {
                var data = await deleteVocabulary(id);
                if (data) {
                    setVocab(vocab.filter((item) => item.id !== id));
                }
            } catch (error) {
                console.error('Failed to delete vocabulary:', error);
                alert(error.response.data.errors);
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full flex flex-col mb-6 sm:flex-row sm:justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        공용 단어장 목록
                    </h1>
                    <div className="flex justify-end mt-1">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            새 단어장 추가
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vocab.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-xl"
                        >
                            <div className="relative">
                                <img
                                    src={API_URL + item.vocabulary_images}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 ${
                                        item.is_favorite
                                            ? 'bg-yellow-500 hover:bg-yellow-600'
                                            : 'bg-white bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm'
                                    }`}
                                    onClick={() =>
                                        handleToggleFavorite(item.id)
                                    }
                                    aria-label={
                                        item.is_favorite
                                            ? '즐겨찾기 해제'
                                            : '즐겨찾기 추가'
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 transition-all duration-300 ${
                                            item.is_favorite
                                                ? 'text-white'
                                                : 'text-gray-400 group-hover:text-yellow-500 group-hover:scale-110'
                                        }`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {item.name}
                                    </h2>
                                    <span className="keep-all px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {RANK_MAP[item.rank]}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">
                                    {item.description}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <span>작성자: {item.owner}</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <button
                                        className="flex-grow px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        onClick={() =>
                                            navigate(
                                                `/publicVoca/${
                                                    item.id
                                                }?name=${encodeURIComponent(
                                                    item.name
                                                )}`
                                            )
                                        }
                                    >
                                        단어장 보기
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={() =>
                                            handleDeleteVocabulary(item.id)
                                        }
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                새 단어장 추가
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="단어장 이름"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newVocab.name}
                                    onChange={(e) =>
                                        setNewVocab({
                                            ...newVocab,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    placeholder="설명"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newVocab.description}
                                    onChange={(e) =>
                                        setNewVocab({
                                            ...newVocab,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                        value={newVocab.rank || ''}
                                        onChange={(e) =>
                                            setNewVocab({
                                                ...newVocab,
                                                rank: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="" disabled>
                                            등급을 선택하세요
                                        </option>
                                        {Object.entries(RANK_MAP).map(
                                            ([value, label]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className="border border-gray-300 rounded-md p-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        이미지 업로드
                                    </label>
                                    <input
                                        type="file"
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        onChange={handleFileChange}
                                    />
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img
                                                src={imagePreview}
                                                alt="미리보기"
                                                className="w-full h-48 object-cover rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex gap-2 flex-col sm:px-6 sm:flex-row-reverse">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                                onClick={handleAddVocabulary}
                            >
                                추가
                            </button>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                                onClick={handleModalClose}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
