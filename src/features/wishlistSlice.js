import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as API from './API';

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, thunkAPI) => {
  try {
    const res = await API.getWishlist();
    return res.data.products || [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to load wishlist');
  }
});

export const toggleWishlistItem = createAsyncThunk('wishlist/toggle', async (productId, thunkAPI) => {
  try {
    const res = await API.toggleWishlist(productId);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update wishlist');
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWishlist.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.products = action.payload.products || [];
        toast.success(action.payload.added ? 'Added to wishlist' : 'Removed from wishlist');
      })
      .addCase(toggleWishlistItem.rejected, (_, action) => {
        toast.error(action.payload);
      });
  },
});

export default wishlistSlice.reducer;
