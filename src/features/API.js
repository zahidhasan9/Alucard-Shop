// import axios from '../Apiutils/axiosInstance';

// // User Api
// export const registerUser = (userData) => axios.post('/auth/register', userData); // URL ঠিক করা হয়েছে
// export const loginUser = (userData) => axios.post('/auth/login', userData);
// export const logoutUser = () => axios.post('/auth/logout');
// export const getAllUsers = () => axios.get('/user');
// export const getUserById = (id) => axios.get(`/user/${id}`);
// export const updateProfile = (data) => axios.put('/auth/user', data);
// export const changePassword = (data) => axios.put('/auth/changepassword', data);
// export const forgotPassword = (email) => axios.post('/auth//resetPasswordRequest', { email });
// export const resetPassword = (id, token, data) => axios.post(`/auth/reset-password/${id}/${token}`, data);
// export const getLoggedInUser = () => axios.get('/auth/me'); // get user by cookie

// // User Address Api
// export const createAddress = (data) => axios.post('/address/add', data);
// export const getAllAddresses = () => axios.get('/address');
// export const getAddressByType = (type) => axios.get(`/address/type/${type}`);
// export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
// export const deleteAddress = (id) => axios.delete(`/address/${id}`);

// // Products Api
// export const getProducts = ({ limit = 10, skip = 0, search = '', category, sort, maxPrice, minPrice }) =>
//   axios.get('/product', {
//     params: { limit, skip, search, category, sort, maxPrice, minPrice }
//   });
// export const createProduct = (data) => axios.post('/product', data);
// // export const getProducts = () => axios.get('/product');
// export const fetchFeaturedProducts = () => axios.get('/product/featured');
// export const fetchFlashsellProducts = () => axios.get('/product//flashsell');
// export const getProduct = (slug) => axios.get(`/product/${slug}`);
// export const updateProduct = (id, data) => axios.put(`/product/${id}`, data);
// export const deleteProduct = (id) => axios.delete(`/product/${id}`);
// export const createProductReview = (id, review) => axios.post(`/product/${id}/reviews`, review);
// export const getTopProducts = () => axios.get('/product/top');

// // category Api
// export const getAllCategories = () => axios.get('/category');
// export const createCategory = (data) => axios.post('/api/categories', data);
// export const getCategory = (id) => axios.get(`/api/categories/${id}`);
// export const updateCategory = (id, data) => axios.put(`/api/categories/${id}`, data);
// export const deleteCategory = (id) => axios.delete(`/api/categories/${id}`);

// // Review Api
// export const createReview = (reviewData) => axios.post('/review', reviewData);
// export const getProductReviews = (productId) => axios.get(`/review/${productId}`);
// export const getUserAllReviews = () => axios.get('review/user');
// export const deleteMyReview = (productId) => axios.delete(`/review/me/${productId}`);
// export const deleteReview = (reviewId) => axios.delete(`/review/${reviewId}`);

// // Cart Api
// export const fetchCart = () => axios.get('/cart');
// export const addToCart = (product) => axios.post('/cart/add', product);
// export const updateCartItem = (productId, quantity) => axios.put(`/cart/update`, { productId, quantity });
// export const removeFromCart = (productId) => axios.delete(`/cart/remove/${productId}`);
// // export const updateCartItem = (productId, quantity) => axios.put(`/cart/update/${productId}`, {productId, quantity });

// // Order Api
// export const createOrder = (orderData) => axios.post('/order/', orderData);
// export const getMyOrders = () => axios.get('/order/my-orders'); // Get user's own orders
// export const getLastOrder = () => axios.get('/order/last-orders'); // Get user's Last orders
// export const getOrderById = (orderId) => axios.get(`/order/${orderId}`); // Get single order by ID
// export const payOrder = (orderId, paymentResult) => axios.put(`/order/${orderId}/pay`, paymentResult); // Update order to paid
// export const deliverOrder = (orderId) => axios.put(`/order/${orderId}/deliver`); // Update order to delivered (admin only)
// // Get all orders (admin only)
// export const getAllOrders = () => axios.get('/orders');




// import axios from '../Apiutils/axiosInstance';

// // ================= User / Auth API =================

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


// // ================= Address API =================

// export const createAddress = (data) => axios.post('/address/add', data);

// export const getAllAddresses = () => axios.get('/address');

// export const getAddressByType = (type) => axios.get(`/address/${type}`);

// export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);

// export const deleteAddress = (id) => axios.delete(`/address/${id}`);


// // ================= Product API =================

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
//     params: {
//       limit,
//       skip,
//       search,
//       category,
//       sort,
//       maxPrice,
//       minPrice,
//     },
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


// // ================= Category API =================

// export const getAllCategories = () => axios.get('/category');

// export const createCategory = (data) => axios.post('/category', data);

// export const getCategory = (slug) => axios.get(`/category/${slug}`);

// export const updateCategory = (slug, data) => axios.put(`/category/${slug}`, data);

// export const deleteCategory = (slug) => axios.delete(`/category/${slug}`);


// // ================= Brand API =================

// export const getAllBrands = () => axios.get('/brand');

// export const createBrand = (data) => axios.post('/brand', data);

// export const getBrand = (slug) => axios.get(`/brand/${slug}`);

// export const updateBrand = (slug, data) => axios.put(`/brand/${slug}`, data);

// export const deleteBrand = (slug) => axios.delete(`/brand/${slug}`);


// // ================= Review API =================

// export const createReview = (reviewData) => axios.post('/review', reviewData);

// export const getProductReviews = (productId) =>
//   axios.get(`/review/${productId}`);

// export const getUserAllReviews = () => axios.get('/review/user');

// // Backend route e ekhono delete review route active nai.
// // Tai ei function gula call korle backend 404 dite pare.
// export const deleteMyReview = (productId) =>
//   axios.delete(`/review/me/${productId}`);

// export const deleteReview = (reviewId) => axios.delete(`/review/${reviewId}`);


// // ================= Cart API =================

// export const fetchCart = () => axios.get('/cart');

// export const addToCart = (product) => axios.post('/cart/add', product);

// export const updateCartItem = (productId, quantity) =>
//   axios.put('/cart/update', { productId, quantity });

// export const removeFromCart = (productId) =>
//   axios.delete(`/cart/remove/${productId}`);

// export const clearCart = () => axios.delete('/cart/clear');


// // ================= Order API =================

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
export const registerUser = (userData) => axios.post('/auth/register', userData);
export const loginUser = (userData) => axios.post('/auth/login', userData);
export const logoutUser = () => axios.post('/auth/logout');
export const getAllUsers = () => axios.get('/auth/users');
export const getUserById = (id) => axios.post(`/auth/user/${id}`);
export const updateProfile = (data) => axios.put('/auth/user', data);
export const changePassword = (data) => axios.put('/auth/changepassword', data);
export const forgotPassword = (email) =>
  axios.post('/auth/resetPasswordRequest', { email });
export const resetPassword = (id, token, data) =>
  axios.post(`/auth/reset-password/${id}/${token}`, data);
export const getLoggedInUser = () => axios.get('/auth/me');

// Address
export const createAddress = (data) => axios.post('/address/add', data);
export const getAllAddresses = () => axios.get('/address');
export const getAddressByType = (type) => axios.get(`/address/${type}`);
export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
export const deleteAddress = (id) => axios.delete(`/address/${id}`);

// Product
export const getProducts = ({
  limit = 10,
  skip = 0,
  search = '',
  category,
  sort,
  maxPrice,
  minPrice,
} = {}) =>
  axios.get('/product', {
    params: { limit, skip, search, category, sort, maxPrice, minPrice },
  });

export const createProduct = (data) => axios.post('/product/add', data);
export const fetchFeaturedProducts = () => axios.get('/product/featured');
export const fetchFlashsellProducts = () => axios.get('/product/flashsell');
export const getTopProducts = () => axios.get('/product/top');
export const getProduct = (slug) => axios.get(`/product/${slug}`);
export const getProductsByCategory = (slug) =>
  axios.get(`/product/category/${slug}`);
export const updateProduct = (slug, data) => axios.put(`/product/${slug}`, data);
export const deleteProduct = (id) => axios.delete(`/product/${id}`);

// Category
export const getAllCategories = () => axios.get('/category');
export const createCategory = (data) => axios.post('/category', data);
export const getCategory = (slug) => axios.get(`/category/${slug}`);
export const updateCategory = (slug, data) => axios.put(`/category/${slug}`, data);
export const deleteCategory = (slug) => axios.delete(`/category/${slug}`);

// Brand
export const getAllBrands = () => axios.get('/brand');
export const createBrand = (data) => axios.post('/brand', data);
export const getBrand = (slug) => axios.get(`/brand/${slug}`);
export const updateBrand = (slug, data) => axios.put(`/brand/${slug}`, data);
export const deleteBrand = (slug) => axios.delete(`/brand/${slug}`);

// Review
export const createReview = (reviewData) => axios.post('/review', reviewData);
export const getProductReviews = (productId) => axios.get(`/review/${productId}`);
export const getUserAllReviews = () => axios.get('/review/user');
export const deleteMyReview = (productId) =>
  axios.delete(`/review/me/${productId}`);
export const deleteReview = (reviewId) => axios.delete(`/review/${reviewId}`);

// Cart
export const fetchCart = () => axios.get('/cart');
export const addToCart = (product) => axios.post('/cart/add', product);
export const updateCartItem = (productId, quantity) =>
  axios.put('/cart/update', { productId, quantity });
export const removeFromCart = (productId) =>
  axios.delete(`/cart/remove/${productId}`);
export const clearCart = () => axios.delete('/cart/clear');

// Order
export const createOrder = (orderData) => axios.post('/order', orderData);
export const getMyOrders = () => axios.get('/order/my-orders');
export const getLastOrder = () => axios.get('/order/last-orders');
export const getAllOrders = () => axios.get('/order');
export const getOrderById = (orderId) => axios.get(`/order/${orderId}`);
export const payOrder = (orderId, paymentResult) =>
  axios.put(`/order/${orderId}/pay`, paymentResult);
export const deliverOrder = (orderId) => axios.put(`/order/${orderId}/deliver`);
export const deleteOrder = (orderId) => axios.delete(`/order/${orderId}`);
export const updateDeliveryStatus = (orderId, data) =>
  axios.put(`/order/${orderId}/delivery-status`, data);
export const resetDeliveryStatus = (orderId) =>
  axios.put(`/order/${orderId}/reset-status`);