import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as API from './API';

export const fetchProductQuestions = createAsyncThunk('question/fetchProduct', async (productId, thunkAPI) => {
  try {
    const res = await API.getProductQuestions(productId);
    return res.data.questions || [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to load questions');
  }
});

export const submitQuestion = createAsyncThunk('question/create', async (data, thunkAPI) => {
  try {
    const res = await API.createQuestion(data);
    return res.data.question;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to submit question');
  }
});

const questionSlice = createSlice({
  name: 'question',
  initialState: { questions: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(submitQuestion.pending, state => {
        state.loading = true;
      })
      .addCase(submitQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.unshift(action.payload);
        toast.success('Question submitted');
      })
      .addCase(submitQuestion.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      });
  },
});

export default questionSlice.reducer;
