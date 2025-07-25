// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api', // your backend API base URL
  baseURL: 'https://alucard-shop-backend.onrender.com/api',
  withCredentials: true // ⬅ Enable cookie sending
});

export default axiosInstance;
// https://alucard-shop-backend.onrender.com
