// // src/utils/axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api', // your backend API base URL
//   // baseURL: 'https://alucard-shop-backend.onrender.com/api',
//   withCredentials: true // ⬅️ Enable cookie sending
// });

// export default axiosInstance;
// // https://alucard-shop-backend.onrender.com


import axios from 'axios';

const API_BASE_URL = 
// 'http://localhost:5000/api'
'https://alucard-shop-backend.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;