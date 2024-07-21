import axios from '../config/axiosConfig';

export const getProfile = async (username) => {
    try {
        const response = await axios.get(`/api/profile/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};

// 필요한 다른 API 함수들도 추가할 수 있습니다.
