import { useState, useEffect, useRef } from 'react';
import axios from '../config/axiosConfig';

export const useAudio = (word) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(new Audio());

    const loadAudio = async () => {
        if (audioUrl) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                '/api/openai-tts/',
                { text: word },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            if (response.data.audio_url) {
                setAudioUrl(response.data.audio_url);
                audioRef.current.src = response.data.audio_url;
            } else {
                throw new Error('No audio URL received');
            }
        } catch (error) {
            console.error('TTS API 호출 중 오류 발생:', error);
            setError('음성을 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePlay = async () => {
        if (isLoading) return;

        if (!audioUrl) {
            await loadAudio();
            if (error) return;
        }

        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        } else {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.error('오디오 재생 중 오류 발생:', error);
                setError('오디오 재생에 실패했습니다.');
                return;
            }
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        audioRef.current.onended = () => setIsPlaying(false);

        return () => {
            audioRef.current.onended = null;
        };
    }, []);

    useEffect(() => {
        setAudioUrl('');
        setIsPlaying(false);
        setError(null);
    }, [word]);

    useEffect(() => {
        console.log(audioUrl);
    }, [audioUrl]);

    return { isPlaying, togglePlay, isLoading, error };
};
