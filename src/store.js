// // src/app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './features/userSlice.js';
// import addressReducer from './features/addressSlice.js';
// import productSlice from './features/productSlice.js';
// import categorySlice from './features/categorySlice.js';
// import SearchSlice from './features/SearchSlice.js';
// import reviewSlice from './features/reviewSlice.js';
// import CartSlice from './features/cartSlice.js';
// import OrderSlice from './features/OrderSlice.js';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     addressReducer: addressReducer,
//     product: productSlice,
//     search: SearchSlice,
//     category: categorySlice,
//     review: reviewSlice,
//     cart: CartSlice,
//     Order: OrderSlice
//   }
// });



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
