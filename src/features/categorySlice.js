import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import toast from 'react-hot-toast';

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
  success: false
};

// Create Category
export const createCategory = createAsyncThunk('category/create', async (data, thunkAPI) => {
  try {
    const res = await API.createCategory(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create category');
  }
});

// Get All Categories
export const getAllCategories = createAsyncThunk('category/getAll', async (_, thunkAPI) => {
  try {
    const res = await API.getAllCategories();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
  }
});

// Get Category by ID
export const getCategory = createAsyncThunk('category/get', async (id, thunkAPI) => {
  try {
    const res = await API.getCategory(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch category');
  }
});

// Update Category
export const updateCategory = createAsyncThunk('category/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await API.updateCategory(id, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update category');
  }
});

// Delete Category
export const deleteCategory = createAsyncThunk('category/delete', async (id, thunkAPI) => {
  try {
    await API.deleteCategory(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete category');
  }
});

// Slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload);
        toast.success('Category created successfully');
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get All
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = action.payload.data;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get One
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        toast.success('Category updated successfully');
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = state.categories.filter((c) => c._id !== action.payload);
        toast.success('Category deleted successfully');
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  }
});

export const { clearCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
