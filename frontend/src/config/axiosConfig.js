// src/axiosConfig.js
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL + '/v1';
console.log('API_URL:', API_URL); // 디버깅을 위한 로그

// 1. axios 전역 설정
axios.defaults.withCredentials = true; // withCredentials 전역 설정

const axiosInstance = axios.create({
    baseURL: API_URL, // Django 서버의 기본 URL
});

export default axiosInstance;
