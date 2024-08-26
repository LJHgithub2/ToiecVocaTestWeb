import React from 'react';
import PropTypes from 'prop-types';
import { useAudio } from '../../hooks/useAudio';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const AudioPlayer = ({ word, dataAllow }) => {
    const { isPlaying, togglePlay, isLoading, error } = useAudio(word);

    return (
        <>
            <button
                onClick={togglePlay}
                disabled={isLoading}
                data-allow={dataAllow}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
            >
                {isPlaying ? (
                    <SpeakerXMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
            </button>
            {error && <span className="text-red-500">{error}</span>}
        </>
    );
};

AudioPlayer.propTypes = {
    word: PropTypes.string.isRequired,
};

export default AudioPlayer;
