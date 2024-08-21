import axios from '../config/axiosConfig';

export const getVocabularys = async () => {
    try {
        const response = await axios.get(`/api/vocabularies/public/`);
        if (!response.data.isAuthenticated) return null;
        return response.data.vocabularies;
    } catch (error) {
        console.error('Error fetching vocabularies data:', error);
        throw error;
    }
};

export const updateVocabulary = async (vocab_id, formData) => {
    try {
        const response = await axios.put(
            `/api/vocabularies/public/${vocab_id}/`,
            formData
        );
        return response.data;
    } catch (error) {
        console.error('Error updating vocabulary:', error);
        throw error;
    }
};

export const toggleFavorite = async (vocab_id, favorite) => {
    try {
        // `updateVocabulary` 함수 호출 및 반환값 반환
        const result = await updateVocabulary(vocab_id, {
            is_favorite: favorite,
        });
        return result;
    } catch (error) {
        console.error('Error toggling favorite status:', error);
        throw error;
    }
};

export const deleteVocabulary = async (vocab_id) => {
    try {
        const response = await axios.delete(
            `/api/vocabularies/public/${vocab_id}/`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching vocabularies data:', error);
        throw error;
    }
};

export const addVocabulary = async (formData) => {
    try {
        const response = await axios.post(
            `/api/vocabularies/public/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching vocabularies data:', error);
        throw error;
    }
};
