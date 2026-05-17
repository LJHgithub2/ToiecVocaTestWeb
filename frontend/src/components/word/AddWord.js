import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWordContext } from '../../context/WordContext';
import { addWord } from '../../services/wordService';

const Field = ({ label, name, type = 'text', placeholder, value, onChange, required }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {label}
            {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
        />
    </div>
);

const AddWord = React.forwardRef((_, ref) => {
    const { setShowAddWord, words, setWords } = useWordContext();
    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        word: '', chapter: '', mean: '', part_of_speech: '', example_sentence: '', memo: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data, status } = await addWord(id, inputValues);
            if (status >= 200 && status < 300) {
                setShowAddWord(false);
                setWords([...words, data.word]);
                alert(`"${inputValues.word}" 단어가 추가되었습니다.`);
            } else {
                alert('단어 추가에 실패했습니다.\n' + data.error);
            }
        } catch (error) {
            alert('오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={ref} className="mb-6 animate-slide-up">
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900">새 단어 추가</h3>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowAddWord(false)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-indigo-100 hover:text-slate-600 transition-colors"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <Field label="영어 단어" name="word" placeholder="apple" value={inputValues.word} onChange={handleChange} required />
                        <Field label="챕터" name="chapter" type="number" placeholder="1" value={inputValues.chapter} onChange={handleChange} />
                        <Field label="뜻" name="mean" placeholder="사과" value={inputValues.mean} onChange={handleChange} required />
                        <Field label="품사" name="part_of_speech" placeholder="명사" value={inputValues.part_of_speech} onChange={handleChange} />
                        <Field label="예문" name="example_sentence" placeholder="I eat an apple." value={inputValues.example_sentence} onChange={handleChange} />
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">메모</label>
                            <textarea
                                name="memo"
                                placeholder="메모를 작성하세요"
                                value={inputValues.memo}
                                onChange={handleChange}
                                rows={1}
                                className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setShowAddWord(false)}
                            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    단어 추가
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default AddWord;
