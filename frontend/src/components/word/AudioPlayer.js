import React from 'react';
import PropTypes from 'prop-types';
import { useAudio } from '../../hooks/useAudio';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const AudioPlayer = ({ word, dataAllow }) => {
    const { isPlaying, togglePlay, isLoading, error } = useAudio(word);

    // Define button class names based on the state
    const buttonClassNames = `p-2 rounded-full transition-colors duration-200 ${
        isLoading
            ? 'bg-gray-300 dark:bg-gray-800 cursor-not-allowed' // Updated color for loading state
            : isPlaying
            ? 'bg-green-400 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600' // Gradient for playing state
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600' // Updated color for idle state
    }`;

    return (
        <div className="relative inline-flex items-center">
            <button
                onClick={togglePlay}
                disabled={isLoading}
                data-allow={dataAllow}
                className={buttonClassNames}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-4 border-transparent border-t-teal-600 rounded-full animate-spin"></div>
                ) : isPlaying ? (
                    <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                ) : (
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
            </button>
            {error && (
                <span className="absolute left-full ml-2 whitespace-nowrap text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
};

AudioPlayer.propTypes = {
    word: PropTypes.string.isRequired,
    dataAllow: PropTypes.string,
};

export default AudioPlayer;
