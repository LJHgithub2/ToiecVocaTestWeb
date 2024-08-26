import { useState, useEffect, useRef } from 'react';
import axios from '../config/axiosConfig';

export const useAudio = (word) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(new Audio());

    const loadAudio = async () => {
        if (audioSrc) return;

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

            if (response.data.audio) {
                const binaryString = atob(response.data.audio);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioSrc(audioUrl);
                audioRef.current.src = audioUrl;
            } else if (response.data.audio_url) {
                setAudioSrc(response.data.audio_url);
                audioRef.current.src = response.data.audio_url;
            } else {
                throw new Error('No audio data received');
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

        if (!audioSrc) {
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
        // 오디오 재생이 끝났을 때 호출되는 핸들러 설정
        audioRef.current.onended = () => setIsPlaying(false);

        // 컴포넌트가 언마운트되거나 audioSrc가 변경될 때 호출되는 클린업 함수
        return () => {
            // 오디오 URL 객체를 해제하여 메모리 누수를 방지
            URL.revokeObjectURL(audioSrc);
            // 오디오가 끝났을 때 호출되는 핸들러를 제거
            audioRef.current.onended = null;
        };
    }, [audioSrc]);

    useEffect(() => {
        // word가 변경되면 오디오 소스를 초기화합니다.
        setAudioSrc('');
        setIsPlaying(false);
        setError(null);
    }, [word]);

    return { isPlaying, togglePlay, isLoading, error };
};
