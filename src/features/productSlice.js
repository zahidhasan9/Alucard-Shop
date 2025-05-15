import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API'; // তোমার product-related API functions এখানে থাকবে
import toast from 'react-hot-toast';

const initialState = {
  products: [],
  topProducts: [],
  product: null,
  loading: false,
  error: null,
  success: false
};

// Create Product
export const createProduct = createAsyncThunk('product/create', async (data, thunkAPI) => {
  try {
    const res = await API.createProduct(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create product');
  }
});

// Get All Products
// export const getProducts = createAsyncThunk('product/getAll', async (_, thunkAPI) => {
//   try {
//     const res = await API.getProducts();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
//   }
// });

export const getProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ page = 1, limit = 10, search = '' }, thunkAPI) => {
    try {
      const skip = (page - 1) * limit;
      const response = await API.getProducts({ limit, skip, search });
      return { ...response.data, page };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);
// Get Single Product
export const getProduct = createAsyncThunk('product/getOne', async (id, thunkAPI) => {
  try {
    const res = await API.getProduct(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
  }
});

// Update Product
export const updateProduct = createAsyncThunk('product/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await API.updateProduct(id, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
  }
});

// Delete Product
export const deleteProduct = createAsyncThunk('product/delete', async (id, thunkAPI) => {
  try {
    await API.deleteProduct(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete product');
  }
});

// Create Product Review
export const createProductReview = createAsyncThunk('product/review', async ({ id, review }, thunkAPI) => {
  try {
    const res = await API.createProductReview(id, review);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to submit review');
  }
});

// Get Top Products
export const getTopProducts = createAsyncThunk('product/top', async (_, thunkAPI) => {
  try {
    const res = await API.getTopProducts();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch top products');
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    total: 0,
    maxLimit: 0,
    maxSkip: 0,
    page: 1,
    error: null
  },
  reducers: {
    clearProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload);
        toast.success('Product created successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get All
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.maxLimit = action.payload.maxLimit;
        state.maxSkip = action.payload.maxSkip;
        state.page = action.payload.page;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(action.payload);
        toast.error('Product not availbale');
        state.products = [];
      })

      // Get One
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter((p) => p._id !== action.payload);
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Top Products
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        toast.error(action.payload);
      });
  }
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
