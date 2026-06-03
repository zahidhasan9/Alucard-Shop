import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as API from './API';

export const createProduct = createAsyncThunk('product/create', async (data, thunkAPI) => {
  try {
    const res = await API.createProduct(data);
    return res.data.product || res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create product');
  }
});

export const getProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ page = 1, limit = 12, search = '', category, brand, sort = 'latest', maxPrice, minPrice, minRating, stock } = {}, thunkAPI) => {
    try {
      const skip = (page - 1) * limit;
      const response = await API.getProducts({ limit, skip, search, category, brand, sort, maxPrice, minPrice, minRating, stock });
      return { ...response.data, page };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const getFeaturedProducts = createAsyncThunk('product/featured', async (_, thunkAPI) => {
  try {
    const res = await API.fetchFeaturedProducts();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch featured products');
  }
});

export const getFlashsellProducts = createAsyncThunk('product/flashsell', async (_, thunkAPI) => {
  try {
    const res = await API.fetchFlashsellProducts();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch flash sell products');
  }
});

export const getProduct = createAsyncThunk('product/getOne', async (slug, thunkAPI) => {
  try {
    const res = await API.getProduct(slug);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
  }
});

export const updateProduct = createAsyncThunk('product/update', async ({ id, slug, data }, thunkAPI) => {
  try {
    const res = await API.updateProduct(slug || id, data);
    return res.data.updatedProduct || res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
  }
});

export const deleteProduct = createAsyncThunk('product/delete', async (id, thunkAPI) => {
  try {
    await API.deleteProduct(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete product');
  }
});

export const getTopProducts = createAsyncThunk('product/top', async (_, thunkAPI) => {
  try {
    const res = await API.getTopProducts();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch top products');
  }
});

const initialState = {
  products: [],
  featuredPro: [],
  flashPro: [],
  topProducts: [],
  product: {},
  loading: false,
  listLoading: false,
  singleLoading: false,
  success: false,
  total: 0,
  pages: 1,
  maxLimit: 0,
  maxSkip: 0,
  page: 1,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductState: state => {
      state.loading = false;
      state.listLoading = false;
      state.singleLoading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.unshift(action.payload);
        toast.success('Product created successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProducts.pending, state => {
        state.loading = true;
        state.listLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.listLoading = false;
        state.products = action.payload.products || [];
        state.total = action.payload.total || 0;
        state.pages = action.payload.pages || 1;
        state.maxLimit = action.payload.maxLimit || 0;
        state.maxSkip = action.payload.maxSkip || 0;
        state.page = action.payload.page || 1;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.listLoading = false;
        state.products = [];
        state.error = action.payload;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.featuredPro = Array.isArray(action.payload) ? action.payload : action.payload?.products || [];
      })
      .addCase(getFlashsellProducts.fulfilled, (state, action) => {
        state.flashPro = Array.isArray(action.payload) ? action.payload : action.payload?.products || [];
      })
      .addCase(getProduct.pending, state => {
        state.loading = true;
        state.singleLoading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleLoading = false;
        state.product = action.payload || {};
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.singleLoading = false;
        state.product = {};
        state.error = action.payload;
        toast.error(action.payload || 'Failed to fetch product');
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.products.findIndex(product => product._id === updated?._id);
        if (index !== -1) state.products[index] = updated;
        toast.success('Product updated successfully');
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
        toast.success('Product deleted successfully');
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.topProducts = Array.isArray(action.payload) ? action.payload : action.payload?.products || [];
      });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
