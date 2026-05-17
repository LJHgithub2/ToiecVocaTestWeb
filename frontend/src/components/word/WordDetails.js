import React, { useState, useEffect } from 'react';
import { useWordContext } from '../../context/WordContext';

const DetailRow = ({ label, value, isGray }) => (
    <div className={`px-5 py-3.5 ${isGray ? 'bg-slate-50' : 'bg-white'}`}>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-sm text-slate-800 break-words leading-relaxed">{value || '-'}</p>
    </div>
);

export default function WordDetails({ word }) {
    const { updateWord } = useWordContext();
    const [difficulty, setDifficulty] = useState(word.difficulty || 3);

    useEffect(() => {
        setDifficulty(word.difficulty || 3);
    }, [word]);

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
        updateWord(word.id, { difficulty: newDifficulty });
    };

    const difficultyLabels = ['', '매우 쉬움', '쉬움', '보통', '어려움', '매우 어려움'];
    const difficultyColors = ['', 'text-emerald-600', 'text-green-600', 'text-amber-600', 'text-orange-600', 'text-red-600'];

    return (
        <div className="rounded-b-2xl overflow-hidden divide-y divide-slate-100">
            <DetailRow label="단어" value={word.word} isGray />
            <DetailRow label="뜻" value={word.mean} />
            <DetailRow label="품사" value={word.part_of_speech} isGray />
            {word.synonyms && <DetailRow label="유의어" value={word.synonyms} />}
            {word.antonyms && <DetailRow label="반의어" value={word.antonyms} isGray />}
            <DetailRow label="예문" value={word.example_sentence} />
            <DetailRow label="메모" value={word.memo} isGray />

            {/* Difficulty */}
            <div className="px-5 py-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">난이도</p>
                    <span className={`text-xs font-semibold ${difficultyColors[difficulty]}`}>
                        {difficultyLabels[difficulty]}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={difficulty}
                        onChange={(e) => handleDifficultyChange(Number(e.target.value))}
                        className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                    />
                    <span className="text-sm font-bold text-slate-700 w-4 text-center">{difficulty}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="px-5 py-3.5 bg-slate-50 flex gap-6">
                <div>
                    <p className="text-xs text-slate-400 font-medium">정답</p>
                    <p className="text-lg font-bold text-emerald-600">{word.correct_count ?? 0}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-medium">오답</p>
                    <p className="text-lg font-bold text-red-500">{word.incorrect_count ?? 0}</p>
                </div>
            </div>
        </div>
    );
}
