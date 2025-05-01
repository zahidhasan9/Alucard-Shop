import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './userAPI';
import toast from 'react-hot-toast'; // make sure to import it

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  success: false
};

// // Async Thunks
// export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
//   try {
//     const res = await API.registerUser(data);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
//   }
// });

export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
  try {
    const res = await API.registerUser(data);
    console.log('Registration data:', res.data);

    return { user: res.data, token: res.data.token };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const res = await API.loginUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

export const fetchLoggedInUser = createAsyncThunk('/me', async (_, thunkAPI) => {
  try {
    const res = await API.getLoggedInUser();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      toast.info('Logged out'); // toast info on logout
    },
    clearState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
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
        state.token = action.payload.token;
        state.success = true;
        toast.success('Login successful'); // success toast on login
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        toast.error(`Login failed: ${action.payload}`); // error toast on login failure
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
        state.token = action.payload.token;
        state.success = true;
        toast.success('Registration successful'); // success toast on register
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        toast.error(`Registration failed: ${action.payload}`); // error toast on registration failure
      })

      // FETCH LOGGED-IN USER
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearState } = userSlice.actions;
export default userSlice.reducer;
