
// import axios from '../Apiutils/axiosInstance';

// // Auth / User
// export const registerUser = (userData) => axios.post('/auth/register', userData);
// export const loginUser = (userData) => axios.post('/auth/login', userData);
// export const logoutUser = () => axios.post('/auth/logout');
// export const getAllUsers = () => axios.get('/auth/users');
// export const getUserById = (id) => axios.post(`/auth/user/${id}`);
// export const updateProfile = (data) => axios.put('/auth/user', data);
// export const changePassword = (data) => axios.put('/auth/changepassword', data);
// export const forgotPassword = (email) =>
//   axios.post('/auth/resetPasswordRequest', { email });
// export const resetPassword = (id, token, data) =>
//   axios.post(`/auth/reset-password/${id}/${token}`, data);
// export const getLoggedInUser = () => axios.get('/auth/me');

// // Address
// export const createAddress = (data) => axios.post('/address/add', data);
// export const getAllAddresses = () => axios.get('/address');
// export const getAddressByType = (type) => axios.get(`/address/${type}`);
// export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
// export const deleteAddress = (id) => axios.delete(`/address/${id}`);

// // Product
// export const getProducts = ({
//   limit = 10,
//   skip = 0,
//   search = '',
//   category,
//   sort,
//   maxPrice,
//   minPrice,
// } = {}) =>
//   axios.get('/product', {
//     params: { limit, skip, search, category, sort, maxPrice, minPrice },
//   });

// export const createProduct = (data) => axios.post('/product/add', data);
// export const fetchFeaturedProducts = () => axios.get('/product/featured');
// export const fetchFlashsellProducts = () => axios.get('/product/flashsell');
// export const getTopProducts = () => axios.get('/product/top');
// export const getProduct = (slug) => axios.get(`/product/${slug}`);
// export const getProductsByCategory = (slug) =>
//   axios.get(`/product/category/${slug}`);
// export const updateProduct = (slug, data) => axios.put(`/product/${slug}`, data);
// export const deleteProduct = (id) => axios.delete(`/product/${id}`);

// // Category
// export const getAllCategories = () => axios.get('/category');
// export const createCategory = (data) => axios.post('/category', data);
// export const getCategory = (slug) => axios.get(`/category/${slug}`);
// export const updateCategory = (slug, data) => axios.put(`/category/${slug}`, data);
// export const deleteCategory = (slug) => axios.delete(`/category/${slug}`);

// // Brand
// export const getAllBrands = () => axios.get('/brand');
// export const createBrand = (data) => axios.post('/brand', data);
// export const getBrand = (slug) => axios.get(`/brand/${slug}`);
// export const updateBrand = (slug, data) => axios.put(`/brand/${slug}`, data);
// export const deleteBrand = (slug) => axios.delete(`/brand/${slug}`);

// // Review
// export const createReview = (reviewData) => axios.post('/review', reviewData);
// export const getProductReviews = (productId) => axios.get(`/review/${productId}`);
// export const getUserAllReviews = () => axios.get('/review/user');
// export const deleteMyReview = (productId) =>
//   axios.delete(`/review/me/${productId}`);
// export const deleteReview = (reviewId) => axios.delete(`/review/${reviewId}`);

// // Cart
// export const fetchCart = () => axios.get('/cart');
// export const addToCart = (product) => axios.post('/cart/add', product);
// export const updateCartItem = (productId, quantity) =>
//   axios.put('/cart/update', { productId, quantity });
// export const removeFromCart = (productId) =>
//   axios.delete(`/cart/remove/${productId}`);
// export const clearCart = () => axios.delete('/cart/clear');

// // Order
// export const createOrder = (orderData) => axios.post('/order', orderData);
// export const getMyOrders = () => axios.get('/order/my-orders');
// export const getLastOrder = () => axios.get('/order/last-orders');
// export const getAllOrders = () => axios.get('/order');
// export const getOrderById = (orderId) => axios.get(`/order/${orderId}`);
// export const payOrder = (orderId, paymentResult) =>
//   axios.put(`/order/${orderId}/pay`, paymentResult);
// export const deliverOrder = (orderId) => axios.put(`/order/${orderId}/deliver`);
// export const deleteOrder = (orderId) => axios.delete(`/order/${orderId}`);
// export const updateDeliveryStatus = (orderId, data) =>
//   axios.put(`/order/${orderId}/delivery-status`, data);
// export const resetDeliveryStatus = (orderId) =>
//   axios.put(`/order/${orderId}/reset-status`);



import axios from '../Apiutils/axiosInstance';

// Auth / User
export const registerUser = userData => axios.post('/auth/register', userData);
export const loginUser = userData => axios.post('/auth/login', userData);
export const logoutUser = () => axios.post('/auth/logout');
export const getAllUsers = () => axios.get('/auth/users');
export const getUserById = id => axios.post(`/auth/user/${id}`);
export const updateProfile = data => axios.put('/auth/user', data);
export const changePassword = data => axios.put('/auth/changepassword', data);
export const forgotPassword = email => axios.post('/auth/resetPasswordRequest', { email });
export const resetPassword = (id, token, data) => axios.post(`/auth/reset-password/${id}/${token}`, data);
export const getLoggedInUser = () => axios.get('/auth/me');

// Address
export const createAddress = data => axios.post('/address/add', data);
export const getAllAddresses = () => axios.get('/address');
export const getAddressByType = type => axios.get(`/address/${type}`);
export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
export const deleteAddress = id => axios.delete(`/address/${id}`);

// Product
export const getProducts = ({
  limit = 12,
  skip = 0,
  search = '',
  category,
  brand,
  sort = 'latest',
  maxPrice,
  minPrice,
  minRating,
  stock,
} = {}) =>
  axios.get('/product', {
    params: { limit, skip, search, category, brand, sort, maxPrice, minPrice, minRating, stock },
  });

export const createProduct = data => axios.post('/product/add', data);
export const fetchFeaturedProducts = () => axios.get('/product/featured');
export const fetchFlashsellProducts = () => axios.get('/product/flashsell');
export const getTopProducts = () => axios.get('/product/top');
export const getProduct = slug => axios.get(`/product/${slug}`);
export const getRelatedProducts = (slug, limit = 8) => axios.get(`/product/${slug}/related`, { params: { limit } });
export const getProductsByCategory = slug => axios.get(`/product/category/${slug}`);
export const updateProduct = (slug, data) => axios.put(`/product/${slug}`, data);
export const deleteProduct = id => axios.delete(`/product/${id}`);

// Category
export const getAllCategories = () => axios.get('/category');
export const createCategory = data => axios.post('/category', data);
export const getCategory = slug => axios.get(`/category/${slug}`);
export const updateCategory = (slug, data) => axios.put(`/category/${slug}`, data);
export const deleteCategory = slug => axios.delete(`/category/${slug}`);

// Brand
export const getAllBrands = () => axios.get('/brand');
export const createBrand = data => axios.post('/brand', data);
export const getBrand = slug => axios.get(`/brand/${slug}`);
export const updateBrand = (slug, data) => axios.put(`/brand/${slug}`, data);
export const deleteBrand = slug => axios.delete(`/brand/${slug}`);

// Review
export const createReview = reviewData => axios.post('/review', reviewData);
export const getProductReviews = productId => axios.get(`/review/${productId}`);
export const getUserAllReviews = () => axios.get('/review/user');
export const deleteMyReview = productId => axios.delete(`/review/me/${productId}`);
export const deleteReview = reviewId => axios.delete(`/review/${reviewId}`);

// Cart
export const fetchCart = () => axios.get('/cart');
export const addToCart = product => axios.post('/cart/add', product);
export const updateCartItem = (productId, quantity) => axios.put('/cart/update', { productId, quantity });
export const removeFromCart = productId => axios.delete(`/cart/remove/${productId}`);
export const clearCart = () => axios.delete('/cart/clear');

// Coupon
export const applyCoupon = data => axios.post('/coupon/apply', data);
export const getCoupons = () => axios.get('/coupon');
export const createCoupon = data => axios.post('/coupon', data);
export const updateCoupon = (id, data) => axios.put(`/coupon/${id}`, data);
export const deleteCoupon = id => axios.delete(`/coupon/${id}`);

// Wishlist


export const getWishlist = () => axios.get('/wishlist');
export const getWishlistIds = () => axios.get('/wishlist/ids');
export const toggleWishlist = (productId) => axios.post('/wishlist/toggle', { productId });
export const removeWishlistItem = (productId) => axios.delete(`/wishlist/${productId}`);
export const clearWishlist = () => axios.delete('/wishlist/clear');

// Questions / Q&A
export const createQuestion = data => axios.post('/question', data);
export const getProductQuestions = productId => axios.get(`/question/product/${productId}`);
export const answerQuestion = (id, answer) => axios.post(`/question/${id}/answer`, { answer });
export const deleteQuestion = id => axios.delete(`/question/${id}`);

// Return / Refund
export const createReturnRequest = data => axios.post('/return-request', data);
export const getMyReturnRequests = () => axios.get('/return-request/my');
export const getReturnRequests = () => axios.get('/return-request');
export const updateReturnStatus = (id, data) => axios.put(`/return-request/${id}/status`, data);

// Order
export const createOrder = orderData => axios.post('/order', orderData);
export const getMyOrders = () => axios.get('/order/my-orders');
export const getLastOrder = () => axios.get('/order/last-orders');
export const getAllOrders = params => axios.get('/order', { params });
export const getOrderById = orderId => axios.get(`/order/${orderId}`);
export const payOrder = (orderId, paymentResult) => axios.put(`/order/${orderId}/pay`, paymentResult);
export const submitManualPayment = (orderId, data) => axios.put(`/order/${orderId}/manual-payment`, data);
export const verifyManualPayment = (orderId, data) => axios.put(`/order/${orderId}/verify-payment`, data);
export const deliverOrder = orderId => axios.put(`/order/${orderId}/deliver`);
export const deleteOrder = orderId => axios.delete(`/order/${orderId}`);
export const updateDeliveryStatus = (orderId, data) => axios.put(`/order/${orderId}/delivery-status`, data);
export const resetDeliveryStatus = orderId => axios.put(`/order/${orderId}/reset-status`);
