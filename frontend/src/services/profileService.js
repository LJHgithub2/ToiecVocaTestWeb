import axios from '../config/axiosConfig';

export const updateProfile = async (username, formData) => {
    try {
        const response = await axios.put(`/api/profile/${username}/`, formData);
        if (!response.data.isAuthenticated || response.status !== 200)
            return null;
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};

export const getProfile = async (username) => {
    try {
        const response = await axios.get(`/api/profile/${username}/`);
        if (!response.data.isAuthenticated) return null;
        return response.data.profile;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};

// 프로필 이미지 업로드 함수
export const uploadProfileImage = async (username, formData) => {
    try {
        const response = axios.put(
            `/api/profile/${username}/image/`,
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

// 프로필 이미지 삭제 함수
export const deleteProfileImage = async (username) => {
    try {
        const response = axios.delete(`/api/profile/${username}/image/`);
        return response;
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
        throw error;
    }
};
