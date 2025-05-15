// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice.js';
import addressReducer from './features/addressSlice.js';
import productSlice from './features/productSlice.js';
import SearchSlice from './features/SearchSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    addressReducer: addressReducer,
    product: productSlice,
    search: SearchSlice
  }
});
