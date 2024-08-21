import axios from '../config/axiosConfig';

export const getPublicWords = async (vocab_id) => {
    try {
        const response = await axios.get(
            `/api/vocabularies/public/${vocab_id}/words/`
        );
        // console.log(response.data.words);
        if (!response.data.isAuthenticated) return null;
        return response.data.words;
    } catch (error) {
        console.error('Error fetching vocabularies data:', error);
        throw error;
    }
};

export const addWord = async (vocab_id, inputValues) => {
    try {
        const response = await axios.post(
            `/api/vocabularies/public/${vocab_id}/words/`,
            inputValues
        );
        console.log(response);
        return { data: response.data, status: response.status };
    } catch (error) {
        var response = error.response;
        console.error('There was an error!', error);
        return { data: response.data, status: response.status };
    }
};
