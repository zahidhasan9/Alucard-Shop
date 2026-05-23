import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import * as API from './API';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, thunkAPI) => {
    try {
      const res = await API.getWishlist();

      return {
        products: res.data?.products || [],
        productIds: res.data?.productIds || [],
        count: res.data?.count || 0,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to load wishlist'
      );
    }
  }
);

export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleWishlistItem',
  async (productId, thunkAPI) => {
    try {
      const res = await API.toggleWishlist(productId);

      return {
        added: res.data?.added,
        message: res.data?.message,
        products: res.data?.products || [],
        productIds: res.data?.productIds || [],
        count: res.data?.count || 0,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update wishlist'
      );
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  'wishlist/removeWishlistItem',
  async (productId, thunkAPI) => {
    try {
      const res = await API.removeWishlistItem(productId);

      return {
        products: res.data?.products || [],
        productIds: res.data?.productIds || [],
        count: res.data?.count || 0,
        message: res.data?.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to remove wishlist item'
      );
    }
  }
);

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, thunkAPI) => {
    try {
      const res = await API.clearWishlist();

      return {
        products: [],
        productIds: [],
        count: 0,
        message: res.data?.message || 'Wishlist cleared',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to clear wishlist'
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',

  initialState: {
    products: [],
    productIds: [],
    count: 0,
    loading: false,
    toggling: false,
    clearing: false,
    error: null,
  },

  reducers: {
    resetWishlist(state) {
      state.products = [];
      state.productIds = [];
      state.count = 0;
      state.loading = false;
      state.toggling = false;
      state.clearing = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productIds = action.payload.productIds;
        state.count = action.payload.count;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(toggleWishlistItem.pending, (state) => {
        state.toggling = true;
        state.error = null;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.toggling = false;
        state.products = action.payload.products;
        state.productIds = action.payload.productIds;
        state.count = action.payload.count;

        toast.success(
          action.payload.added ? 'Added to wishlist' : 'Removed from wishlist'
        );
      })
      .addCase(toggleWishlistItem.rejected, (state, action) => {
        state.toggling = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(removeWishlistItem.pending, (state) => {
        state.toggling = true;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.toggling = false;
        state.products = action.payload.products;
        state.productIds = action.payload.productIds;
        state.count = action.payload.count;
        toast.success(action.payload.message || 'Removed from wishlist');
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.toggling = false;
        toast.error(action.payload);
      })

      .addCase(clearWishlist.pending, (state) => {
        state.clearing = true;
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.clearing = false;
        state.products = [];
        state.productIds = [];
        state.count = 0;
        toast.success(action.payload.message || 'Wishlist cleared');
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.clearing = false;
        toast.error(action.payload);
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;