// src/features/user/userAPI.js
import axios from '../Apiutils/axiosInstance';

export const registerUser = (userData) => axios.post('/auth/register', userData);
export const loginUser = (userData) => axios.post('/auth/login', userData);
export const getAllUsers = () => axios.get('/user');
export const getUserById = (id) => axios.get(`/user/${id}`);
export const updateProfile = (data) => axios.put('/user/profile', data);
export const forgotPassword = (email) => axios.post('/auth/forgot-password', { email });
export const resetPassword = (token, data) => axios.post(`/auth/reset-password/${token}`, data);
export const getLoggedInUser = () => axios.get('/auth/me'); // get user by cookie
