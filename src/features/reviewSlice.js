// src/features/review/reviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import toast from 'react-hot-toast';

// Thunks
export const createReview = createAsyncThunk('review/create', async (reviewData, thunkAPI) => {
  try {
    const res = await API.createReview(reviewData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create review');
  }
});

export const getProductReviews = createAsyncThunk('review/getAll', async (productId, thunkAPI) => {
  try {
    const res = await API.getProductReviews(productId);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews');
  }
});

export const getUserAllReviews = createAsyncThunk('review/user', async () => {
  try {
    const res = await API.getUserAllReviews();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews');
  }
});

export const deleteMyReview = createAsyncThunk('review/deleteMine', async (productId, thunkAPI) => {
  try {
    const res = await API.deleteMyReview(productId);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete your review');
  }
});

export const deleteReview = createAsyncThunk('review/delete', async (reviewId, thunkAPI) => {
  try {
    const res = await API.deleteReview(reviewId);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete review');
  }
});

// Slice
const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    userallreviews: [],
    loading: true,
    success: false,
    error: null
  },
  reducers: {
    clearReviewState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.reviews.push(action.payload);
        toast.success('Review created successfully');
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get All Reviews
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get All Reviews
      .addCase(getUserAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.userallreviews = action.payload.reviews;
      })
      .addCase(getUserAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Delete My Review
      .addCase(deleteMyReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((rev) => rev._id !== action.payload.reviewId);
        toast.success('Your review has been deleted');
      })
      .addCase(deleteMyReview.rejected, (state, action) => {
        toast.error(action.payload);
      })

      // Admin Delete Review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((rev) => rev._id !== action.payload.reviewId);
        toast.success('Review deleted');
      })
      .addCase(deleteReview.rejected, (state, action) => {
        toast.error(action.payload);
      });
  }
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
