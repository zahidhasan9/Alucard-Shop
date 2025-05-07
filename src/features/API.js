import { data } from 'react-router';
import axios from '../Apiutils/axiosInstance';

// User Api
export const registerUser = userData => axios.post('/auth/register', userData); // URL ঠিক করা হয়েছে
export const loginUser = userData => axios.post('/auth/login', userData);
export const logoutUser = () => axios.post('/auth/logout');
export const getAllUsers = () => axios.get('/user');
export const getUserById = id => axios.get(`/user/${id}`);
export const updateProfile = data => axios.put('/auth/user', data);
export const changePassword = data => axios.put('/auth/changepassword',data );
export const forgotPassword = email => axios.post('/auth/forgot-password', { email });
export const resetPassword = (token, data) => axios.post(`/auth/reset-password/${token}`, data);
export const getLoggedInUser = () => axios.get('/auth/me'); // get user by cookie

// User Address Api
export const createAddress = data => axios.post('/address/add', data);
export const getAllAddresses = () => axios.get('/address');
export const getAddressByType = type => axios.get(`/address/type/${type}`);
export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
export const deleteAddress = id => axios.delete(`/address/${id}`);
