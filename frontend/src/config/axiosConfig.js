// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/v1', // Django 서버의 기본 URL
    withCredentials: true, // 쿠키를 포함하여 요청
});

export default axiosInstance;
