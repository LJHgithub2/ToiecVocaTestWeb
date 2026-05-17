import React from 'react';
import { useWordContext } from '../../context/WordContext';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const FavoriteButton = ({ isFavorite, wordName, dataAllow }) => {
    const { words, setWords } = useWordContext();

    const toggleFavorite = () => {
        setWords(
            words.map((word) =>
                word.word === wordName ? { ...word, isFavorite: !word.isFavorite } : word
            )
        );
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`p-2 rounded-xl transition-all duration-200 ${
                isFavorite
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-500'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-400'
            }`}
            data-allow={dataAllow}
            aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
            {isFavorite ? (
                <StarSolid className="w-4 h-4" />
            ) : (
                <StarIcon className="w-4 h-4" />
            )}
        </button>
    );
};

export default FavoriteButton;
