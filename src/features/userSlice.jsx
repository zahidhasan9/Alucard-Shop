// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './userAPI';

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

// Async Thunks
export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const res = await API.loginUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
  try {
    const res = await API.registerUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const fetchLoggedInUser = createAsyncThunk('user/fetchMe', async (_, thunkAPI) => {
  try {
    const res = await API.getLoggedInUser();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Add other thunks: getAllUsers, getUserById, updateProfile, forgotPassword, resetPassword ...

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout(state) {
        state.user = null;
        toast.info("Logged out");
      },
      clearState(state) {
        state.loading = false;
        state.success = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
  
        // LOGIN
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.success = true;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        })
  
        // REGISTER
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.success = true;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        })
  
        // FETCH LOGGED-IN USER
        .addCase(fetchLoggedInUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
        })
        .addCase(fetchLoggedInUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { logout, clearState } = userSlice.actions;
  export default userSlice.reducer;