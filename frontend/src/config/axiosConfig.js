// src/axiosConfig.js
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL + '/v1';
console.log('API_URL:', API_URL); // 디버깅을 위한 로그

const axiosInstance = axios.create({
    baseURL: API_URL, // Django 서버의 기본 URL
    withCredentials: true, // 쿠키를 포함하여 요청
});

export default axiosInstance;
