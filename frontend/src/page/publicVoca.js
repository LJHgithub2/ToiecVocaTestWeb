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
    4: '미인증 단어장',
};

const RANK_COLOR = {
    1: 'bg-amber-100 text-amber-700 border border-amber-200',
    2: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    3: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    4: 'bg-slate-100 text-slate-500 border border-slate-200',
};

export default function PublicVoca() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [vocab, setVocab] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newVocab, setNewVocab] = useState({ name: '', description: '', vocab_image: '', rank: '' });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getVocabularys();
                if (data) setVocab(data);
                else setIsAuthenticated(false);
            } catch {
                setIsAuthenticated(false);
            }
        })();
    }, []);

    const handleAddVocabulary = async () => {
        setIsSubmitting(true);
        try {
            const data = await addVocabulary(newVocab);
            if (data) {
                setVocab((prev) => [...prev, data.vocab]);
                handleModalClose();
                alert('단어장이 추가되었습니다.');
            }
        } catch (error) {
            alert(error.response?.data?.errors || '추가에 실패했습니다.');
            handleModalClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setNewVocab((prev) => ({ ...prev, vocab_image: file }));
        };
        reader.readAsDataURL(file);
    };

    const handleModalClose = () => {
        setNewVocab({ name: '', description: '', rank: '', vocab_image: '' });
        setImagePreview(null);
        setIsModalOpen(false);
    };

    const handleToggleFavorite = async (id) => {
        try {
            const item = vocab.find((v) => v.id === id);
            if (!item) return;
            const data = await toggleFavorite(id, !item.is_favorite);
            if (data) {
                setVocab((prev) =>
                    prev.map((v) => (v.id === id ? { ...v, is_favorite: !v.is_favorite } : v))
                );
            }
        } catch (error) {
            alert(error.response?.data?.errors || '오류가 발생했습니다.');
        }
    };

    const handleDeleteVocabulary = async (id) => {
        if (!window.confirm('정말로 이 단어장을 삭제하시겠습니까?')) return;
        try {
            const data = await deleteVocabulary(id);
            if (data) setVocab((prev) => prev.filter((v) => v.id !== id));
        } catch (error) {
            alert(error.response?.data?.errors || '삭제에 실패했습니다.');
        }
    };

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">공용 단어장</h1>
                    <p className="text-sm text-slate-500 mt-0.5">총 {vocab.length}개의 단어장</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    새 단어장 추가
                </button>
            </div>

            {/* Grid */}
            {vocab.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-4xl mb-3">📚</div>
                    <p className="text-slate-500 font-medium">아직 단어장이 없습니다</p>
                    <p className="text-sm text-slate-400 mt-1">첫 번째 단어장을 추가해보세요</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {vocab.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-44 bg-slate-100 overflow-hidden">
                                <img
                                    src={API_URL + item.vocabulary_images}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Favorite */}
                                <button
                                    onClick={() => handleToggleFavorite(item.id)}
                                    className={`absolute top-3 right-3 p-2 rounded-xl shadow-sm transition-all duration-200 ${
                                        item.is_favorite
                                            ? 'bg-amber-400 hover:bg-amber-500'
                                            : 'bg-white/80 backdrop-blur-sm hover:bg-white'
                                    }`}
                                    aria-label={item.is_favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                                >
                                    <svg
                                        className={`h-4 w-4 transition-colors ${
                                            item.is_favorite ? 'text-white' : 'text-slate-400 hover:text-amber-500'
                                        }`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                                {/* Rank badge */}
                                <div className="absolute bottom-3 left-3">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${RANK_COLOR[item.rank] || RANK_COLOR[4]}`}>
                                        {RANK_MAP[item.rank] || '단어장'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="mb-3">
                                    <h2 className="font-semibold text-slate-900 text-base leading-snug">{item.name}</h2>
                                    <p className="text-xs text-slate-400 mt-0.5">작성자: {item.owner}</p>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{item.description}</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400">
                                        {item.word_count.toLocaleString()}개 단어
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/publicVoca/${item.id}?name=${encodeURIComponent(item.name)}&word_count=${item.word_count}`
                                                )
                                            }
                                            className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            학습하기
                                        </button>
                                        <button
                                            onClick={() => handleDeleteVocabulary(item.id)}
                                            className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-slide-up">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-semibold text-slate-900">새 단어장 추가</h3>
                            <button
                                onClick={handleModalClose}
                                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="px-6 py-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">단어장 이름</label>
                                <input
                                    type="text"
                                    placeholder="단어장 이름"
                                    className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={newVocab.name}
                                    onChange={(e) => setNewVocab((prev) => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">설명</label>
                                <textarea
                                    rows={3}
                                    placeholder="단어장에 대한 설명"
                                    className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none"
                                    value={newVocab.description}
                                    onChange={(e) => setNewVocab((prev) => ({ ...prev, description: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">등급</label>
                                <select
                                    className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={newVocab.rank || ''}
                                    onChange={(e) => setNewVocab((prev) => ({ ...prev, rank: e.target.value }))}
                                >
                                    <option value="" disabled>등급을 선택하세요</option>
                                    {Object.entries(RANK_MAP).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">이미지</label>
                                <label className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="미리보기" className="h-full w-full object-cover rounded-xl" />
                                    ) : (
                                        <div className="text-center">
                                            <svg className="h-8 w-8 text-slate-300 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <p className="text-xs text-slate-400">클릭하여 이미지 업로드</p>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-100 flex gap-3 justify-end">
                            <button
                                onClick={handleModalClose}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleAddVocabulary}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : '추가'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
