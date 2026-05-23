import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as API from './API';

export const applyCouponCode = createAsyncThunk('coupon/apply', async (data, thunkAPI) => {
  try {
    const res = await API.applyCoupon(data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Invalid coupon');
  }
});

const couponSlice = createSlice({
  name: 'coupon',
  initialState: { applied: null, loading: false, error: null },
  reducers: {
    clearCoupon: state => {
      state.applied = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(applyCouponCode.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCouponCode.fulfilled, (state, action) => {
        state.loading = false;
        state.applied = action.payload;
        toast.success(`Coupon ${action.payload.code} applied`);
      })
      .addCase(applyCouponCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.applied = null;
        toast.error(action.payload);
      });
  },
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
