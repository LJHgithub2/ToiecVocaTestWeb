import React from 'react';
import { useWordContext } from '../../context/WordContext';
import { StarIcon } from '@heroicons/react/24/outline';

const FavoriteButton = ({ isFavorite, wordName, dataAllow }) => {
    const { words, setWords } = useWordContext();

    const toggleFavorite = () => {
        setWords(
            words.map((word) =>
                word.word === wordName
                    ? { ...word, isFavorite: !word.isFavorite }
                    : word
            )
        );
    };

    return (
        <button
            onClick={toggleFavorite}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
            data-allow={dataAllow}
        >
            <StarIcon
                className={`w-5 h-5 ${
                    isFavorite
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400 dark:text-gray-500'
                }`}
            />
        </button>
    );
};

export default FavoriteButton;
