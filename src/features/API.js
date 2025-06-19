import axios from '../Apiutils/axiosInstance';

// User Api
export const registerUser = (userData) => axios.post('/auth/register', userData); // URL ঠিক করা হয়েছে
export const loginUser = (userData) => axios.post('/auth/login', userData);
export const logoutUser = () => axios.post('/auth/logout');
export const getAllUsers = () => axios.get('/user');
export const getUserById = (id) => axios.get(`/user/${id}`);
export const updateProfile = (data) => axios.put('/auth/user', data);
export const changePassword = (data) => axios.put('/auth/changepassword', data);
export const forgotPassword = (email) => axios.post('/auth//resetPasswordRequest', { email });
export const resetPassword = (id, token, data) => axios.post(`/auth/reset-password/${id}/${token}`, data);
export const getLoggedInUser = () => axios.get('/auth/me'); // get user by cookie

// User Address Api
export const createAddress = (data) => axios.post('/address/add', data);
export const getAllAddresses = () => axios.get('/address');
export const getAddressByType = (type) => axios.get(`/address/type/${type}`);
export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
export const deleteAddress = (id) => axios.delete(`/address/${id}`);

// Products Api
export const getProducts = ({ limit = 10, skip = 0, search = '', category, sort, maxPrice, minPrice }) =>
  axios.get('/product', {
    params: { limit, skip, search, category, sort, maxPrice, minPrice }
  });
export const createProduct = (data) => axios.post('/product', data);
// export const getProducts = () => axios.get('/product');
export const getProduct = (slug) => axios.get(`/product/${slug}`);
export const updateProduct = (id, data) => axios.put(`/product/${id}`, data);
export const deleteProduct = (id) => axios.delete(`/product/${id}`);
export const createProductReview = (id, review) => axios.post(`/product/${id}/reviews`, review);
export const getTopProducts = () => axios.get('/product/top');

// category Api
export const getAllCategories = () => axios.get('/category');
export const createCategory = (data) => axios.post('/api/categories', data);
export const getCategory = (id) => axios.get(`/api/categories/${id}`);
export const updateCategory = (id, data) => axios.put(`/api/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`/api/categories/${id}`);

// Review Api
export const createReview = (reviewData) => axios.post('/review', reviewData);
export const getProductReviews = (productId) => axios.get(`/review/${productId}`);
export const getUserAllReviews = () => axios.get('review/user');
export const deleteMyReview = (productId) => axios.delete(`/review/me/${productId}`);
export const deleteReview = (reviewId) => axios.delete(`/review/${reviewId}`);

// Cart Api
export const fetchCart = () => axios.get('/cart');
export const addToCart = (product) => axios.post('/cart/add', product);
export const updateCartItem = (productId, quantity) => axios.put(`/cart/update`, { productId, quantity });
export const removeFromCart = (productId) => axios.delete(`/cart/remove/${productId}`);
// export const updateCartItem = (productId, quantity) => axios.put(`/cart/update/${productId}`, {productId, quantity });

// Order Api
export const createOrder = (orderData) => axios.post('/order/', orderData);
export const getMyOrders = () => axios.get('/order/my-orders'); // Get user's own orders
export const getLastOrder = () => axios.get('/order/last-orders'); // Get user's Last orders
export const getOrderById = (orderId) => axios.get(`/order/${orderId}`); // Get single order by ID
export const payOrder = (orderId, paymentResult) => axios.put(`/order/${orderId}/pay`, paymentResult); // Update order to paid
export const deliverOrder = (orderId) => axios.put(`/order/${orderId}/deliver`); // Update order to delivered (admin only)
// Get all orders (admin only)
export const getAllOrders = () => axios.get('/orders');
