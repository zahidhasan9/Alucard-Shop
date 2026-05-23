import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as API from './API';

export const submitReturnRequest = createAsyncThunk('return/create', async (data, thunkAPI) => {
  try {
    const res = await API.createReturnRequest(data);
    return res.data.request;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to submit return request');
  }
});

export const fetchMyReturnRequests = createAsyncThunk('return/my', async (_, thunkAPI) => {
  try {
    const res = await API.getMyReturnRequests();
    return res.data.requests || [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch return requests');
  }
});

const returnSlice = createSlice({
  name: 'returnRequest',
  initialState: { requests: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitReturnRequest.pending, state => {
        state.loading = true;
      })
      .addCase(submitReturnRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.unshift(action.payload);
        toast.success('Return request submitted');
      })
      .addCase(submitReturnRequest.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })
      .addCase(fetchMyReturnRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      });
  },
});

export default returnSlice.reducer;
