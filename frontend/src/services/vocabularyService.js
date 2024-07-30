import axios from '../config/axiosConfig';

export const getVocabularys = async () => {
    try {
        const response = await axios.get(`/api/vocabularies/`);
        if (!response.data.isAuthenticated) return null;
        return response.data.vocabularies;
    } catch (error) {
        console.error('Error fetching vocabularies data:', error);
        throw error;
    }
};
