// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// import toast from 'react-hot-toast'; // make sure to import it

// const initialState = {
//   user: null,
//   users: [],
//   loading: true,
//   error: null,
//   success: false,
//   isAuthenticated: false,
//   token: localStorage.getItem('token') || null
//   // isAuthenticated: !!localStorage.getItem('token')
// };

// export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
//   try {
//     const res = await API.registerUser(data);
//     return { user: res.data, token: res.data.token };
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
//   }
// });

// export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
//   try {
//     const res = await API.loginUser(data);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
//   }
// });

// export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
//   try {
//     const res = await API.logoutUser();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed');
//   }
// });

// export const updateProfile = createAsyncThunk('user/updateProfile', async (data, thunkAPI) => {
//   try {
//     const res = await API.updateProfile(data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile update failed');
//   }
// });

// export const forgotPassword = createAsyncThunk('user/forgotPassword', async (data, thunkAPI) => {
//   try {
//     const res = await API.forgotPassword(data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile update failed');
//   }
// });

// export const resetPassword = createAsyncThunk('user/resetPassword', async ({ data, id, token }, thunkAPI) => {
//   try {
//     const res = await API.resetPassword(id, token, data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile update failed');
//   }
// });

// export const changePassword = createAsyncThunk('user/changePassword', async (data, thunkAPI) => {
//   try {
//     console.log('pass', data);
//     const res = await API.changePassword(data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Password update failed');
//   }
// });

// export const fetchLoggedInUser = createAsyncThunk('/me', async (_, thunkAPI) => {
//   try {
//     const res = await API.getLoggedInUser();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
//   }
// });

// // Slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     //   logout(state) {
//     //     state.user = null;
//     //     state.token = null;
//     //     state.isAuthenticated = false;
//     //     localStorage.removeItem('token');
//     //     toast.info('Logged out'); // toast info on logout
//     //   },
//     clearState(state) {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder

//       // LOGIN
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.success = true;
//         state.isAuthenticated = true;
//         localStorage.setItem('token', action.payload.token); // <-- Save token
//         toast.success('Login successful'); // success toast on login
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         state.isAuthenticated = false;
//         toast.error(`Login failed: ${action.payload}`); // error toast on login failure
//       })

//       // REGISTER
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         // state.user = action.payload.user;
//         // state.token = action.payload.token;
//         state.success = true;
//         // state.isAuthenticated = true;
//         toast.success('Registration successful'); // success toast on register
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         state.isAuthenticated = false;
//         toast.error(`Registration failed: ${action.payload}`); // error toast on registration failure
//       })

//       // UPDATE USER PROFILE
//       .addCase(updateProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('Profile updated successfully');
//       })
//       .addCase(updateProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         toast.error(`Profile update failed: ${action.payload}`);
//       })

//       // FORGOT USER PASSWORD
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.forgotPasswordError = null;
//         state.success = false;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('Email send successfully');
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.forgotPasswordError = action.payload;
//         state.success = false;
//         // toast.error(`Profile update failed: ${action.payload}`);
//       })

//       // RESET USER PASSWORD
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.resetPasswordError = null;
//         state.success = false;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('New password set successfully');
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.resetPasswordError = action.payload;
//         state.success = false;
//         //   toast.error(`Profile update failed: ${action.payload}`);
//       })

//       // UPDATE/CHANGE  USER PASSWORD
//       .addCase(changePassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(changePassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('Password updated successfully');
//       })
//       .addCase(changePassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         toast.error(`Password update failed: ${action.payload}`);
//       })

//       // FETCH LOGGED-IN USER
//       .addCase(fetchLoggedInUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//       })
//       .addCase(fetchLoggedInUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       })

//       // logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//         state.loading = false;
//         localStorage.removeItem('token');
//         toast.success('Logged out successfully');
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(`Logout failed: ${action.payload}`);
//       });
//   }
// });

// export const { logout, clearState } = userSlice.actions;
// export default userSlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import toast from 'react-hot-toast';

const savedToken = localStorage.getItem('token');

const initialState = {
  user: null,
  users: [],
  loading: false,
  authLoading: false,
  authChecked: !savedToken,
  error: null,
  forgotPasswordError: null,
  resetPasswordError: null,
  success: false,
  isAuthenticated: Boolean(savedToken),
  token: savedToken || null,
};

export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
  try {
    const res = await API.registerUser(data);
    return {
      user: res.data,
      token: res.data.token,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Something went wrong'
    );
  }
});

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const res = await API.loginUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Something went wrong'
    );
  }
});

export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const res = await API.logoutUser();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Logout failed'
    );
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data, thunkAPI) => {
    try {
      const res = await API.updateProfile(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Profile update failed'
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data, thunkAPI) => {
    try {
      const res = await API.forgotPassword(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Email sending failed'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ data, id, token }, thunkAPI) => {
    try {
      const res = await API.resetPassword(id, token, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Password reset failed'
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data, thunkAPI) => {
    try {
      const res = await API.changePassword(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Password update failed'
      );
    }
  }
);

export const fetchLoggedInUser = createAsyncThunk('user/me', async (_, thunkAPI) => {
  try {
    const res = await API.getLoggedInUser();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Something went wrong'
    );
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState(state) {
      state.loading = false;
      state.authLoading = false;
      state.success = false;
      state.error = null;
      state.forgotPasswordError = null;
      state.resetPasswordError = null;
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
        state.authChecked = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.isAuthenticated = true;

        localStorage.setItem('token', action.payload.token);
        toast.success('Login successful');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.isAuthenticated = false;
        state.authChecked = true;

        toast.error(`Login failed: ${action.payload}`);
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

        toast.success('Registration successful');
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.isAuthenticated = false;

        toast.error(`Registration failed: ${action.payload}`);
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (action.payload?.user) {
          state.user = action.payload.user;
        }

        toast.success('Profile updated successfully');
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;

        toast.error(`Profile update failed: ${action.payload}`);
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.forgotPasswordError = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

        toast.success('Email sent successfully');
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.forgotPasswordError = action.payload;
        state.success = false;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.resetPasswordError = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

        toast.success('New password set successfully');
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetPasswordError = action.payload;
        state.success = false;
      })

      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

        toast.success('Password updated successfully');
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;

        toast.error(`Password update failed: ${action.payload}`);
      })

      // FETCH LOGGED-IN USER
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.authChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.authLoading = false;
        state.authChecked = true;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;

        localStorage.removeItem('token');
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.loading = false;

        localStorage.removeItem('token');
        toast.success('Logged out successfully');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        toast.error(`Logout failed: ${action.payload}`);
      });
  },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;