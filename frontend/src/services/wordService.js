import axios from '../config/axiosConfig';

export const getPublicWords = async (vocab_id) => {
    try {
        console.log(vocab_id);
        const response = await axios.get(`/api/vocabularies/${vocab_id}/`);
        console.log(response.data.words);
        if (!response.data.isAuthenticated) return null;
        return response.data.words;
    } catch (error) {
        console.error('Error fetching vocabularies data:', error);
        throw error;
    }
};
