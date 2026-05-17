import React from 'react';
import PropTypes from 'prop-types';
import { useAudio } from '../../hooks/useAudio';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const AudioPlayer = ({ word, dataAllow }) => {
    const { isPlaying, togglePlay, isLoading, error } = useAudio(word);

    return (
        <div className="relative inline-flex items-center">
            <button
                onClick={togglePlay}
                disabled={isLoading}
                data-allow={dataAllow}
                className={`p-2 rounded-xl transition-all duration-200 ${
                    isLoading
                        ? 'bg-slate-100 cursor-not-allowed'
                        : isPlaying
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                }`}
                aria-label={isPlaying ? '정지' : '발음 듣기'}
            >
                {isLoading ? (
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                    <SpeakerXMarkIcon className="w-4 h-4 text-white" />
                ) : (
                    <SpeakerWaveIcon className="w-4 h-4" />
                )}
            </button>
            {error && (
                <span className="absolute left-full ml-2 whitespace-nowrap text-xs text-red-500 bg-red-50 px-2 py-1 rounded-lg">
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
