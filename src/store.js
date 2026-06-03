import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice.js';
import addressReducer from './features/addressSlice.js';
import productReducer from './features/productSlice.js';
import categoryReducer from './features/categorySlice.js';
import searchReducer from './features/SearchSlice.js';
import reviewReducer from './features/reviewSlice.js';
import cartReducer from './features/cartSlice.js';
import orderReducer from './features/OrderSlice.js';
import wishlistReducer from './features/wishlistSlice.js';
import couponReducer from './features/couponSlice.js';
import questionReducer from './features/questionSlice.js';
import returnReducer from './features/returnSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    addressReducer,
    product: productReducer,
    search: searchReducer,
    category: categoryReducer,
    review: reviewReducer,
    cart: cartReducer,
    Order: orderReducer,
    wishlist: wishlistReducer,
    coupon: couponReducer,
    question: questionReducer,
    returnRequest: returnReducer,
  },
});
