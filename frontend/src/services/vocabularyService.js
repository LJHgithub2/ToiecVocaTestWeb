import axios from '../config/axiosConfig';

export const getVocabularys = async () => {
    try {
        const response = await axios.get(`/api/vocab/`);
        if (!response.data.isAuthenticated) return null;
        return response.data.vocabularies;
    } catch (error) {
        console.error('Error fetching vocabularies data:', error);
        throw error;
    }
};

// 이미지 업로드를 위한 함수
export const uploadProfileImage = async (username, formData) => {
    try {
        const response = axios.post(
            `/api/profile/${username}/upload/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw error;
    }
};
