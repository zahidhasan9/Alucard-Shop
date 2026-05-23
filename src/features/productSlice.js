// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import * as API from './API';
// // import toast from 'react-hot-toast';



// // // Create Product
// // export const createProduct = createAsyncThunk('product/create', async (data, thunkAPI) => {
// //   try {
// //     const res = await API.createProduct(data);
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create product');
// //   }
// // });

// // // Get All Products
// // // export const getProducts = createAsyncThunk('product/getAll', async (_, thunkAPI) => {
// // //   try {
// // //     const res = await API.getProducts();
// // //     return res.data;
// // //   } catch (err) {
// // //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
// // //   }
// // // });

// // export const getProducts = createAsyncThunk(
// //   'product/fetchProducts',
// //   async ({ page = 1, limit = 10, search = '', category, sort, maxPrice, minPrice }, thunkAPI) => {
// //     try {
// //       console.log('search', typeof search);
// //       const skip = (page - 1) * limit;
// //       const response = await API.getProducts({ limit, skip, search, category, sort, maxPrice, minPrice });
// //       return { ...response.data, page };
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
// //     }
// //   }
// // );

// // // Get Featured Products
// // export const getFeaturedProducts = createAsyncThunk('product/Featured', async (_, thunkAPI) => {
// //   try {
// //     const res = await API.fetchFeaturedProducts();
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
// //   }
// // });

// // // Get Flash sell Products
// // export const getFlashsellProducts = createAsyncThunk('product/Flashsell', async (_, thunkAPI) => {
// //   try {
// //     const res = await API.fetchFlashsellProducts();
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
// //   }
// // });

// // // Get Single Product
// // export const getProduct = createAsyncThunk('product/getOne', async (slug, thunkAPI) => {
// //   try {
// //     const res = await API.getProduct(slug);
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
// //   }
// // });

// // // Update Product
// // export const updateProduct = createAsyncThunk('product/update', async ({ id, data }, thunkAPI) => {
// //   try {
// //     const res = await API.updateProduct(id, data);
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
// //   }
// // });

// // // Delete Product
// // export const deleteProduct = createAsyncThunk('product/delete', async (id, thunkAPI) => {
// //   try {
// //     await API.deleteProduct(id);
// //     return id;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete product');
// //   }
// // });

// // // Create Product Review
// // export const createProductReview = createAsyncThunk('product/review', async ({ id, review }, thunkAPI) => {
// //   try {
// //     const res = await API.createProductReview(id, review);
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to submit review');
// //   }
// // });

// // // Get Top Products
// // export const getTopProducts = createAsyncThunk('product/top', async (_, thunkAPI) => {
// //   try {
// //     const res = await API.getTopProducts();
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch top products');
// //   }
// // });

// // const productSlice = createSlice({
// //   name: 'product',
// //   initialState: {
// //     products: [],
// //     featuredPro: [],
// //     flashPro: [],
// //     product: {},
// //     loading: true,
// //     total: 0,
// //     maxLimit: 0,
// //     maxSkip: 0,
// //     page: 1,
// //     error: null
// //   },
// //   reducers: {
// //     clearProductState: (state) => {
// //       state.loading = false;
// //       state.success = false;
// //       state.error = null;
// //     }
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Create
// //       .addCase(createProduct.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(createProduct.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.products.push(action.payload);
// //         toast.success('Product created successfully');
// //       })
// //       .addCase(createProduct.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         toast.error(action.payload);
// //       })

// //       // Get All
// //       .addCase(getProducts.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getProducts.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.products = action.payload.products;
// //         state.total = action.payload.total;
// //         state.maxLimit = action.payload.maxLimit;
// //         state.maxSkip = action.payload.maxSkip;
// //         state.page = action.payload.page;
// //       })
// //       .addCase(getProducts.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         // toast.error(action.payload);
// //         toast.error('Product not availbale');
// //         state.products = [];
// //       })

// //       // Get Featured Products
// //       .addCase(getFeaturedProducts.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getFeaturedProducts.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.featuredPro = action.payload;
// //       })
// //       .addCase(getFeaturedProducts.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         // toast.error(action.payload);
// //         toast.error('Product not availbale');
// //         state.products = [];
// //       })

// //       // Get Flash sell Products
// //       .addCase(getFlashsellProducts.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getFlashsellProducts.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.flashPro = action.payload;
// //       })
// //       .addCase(getFlashsellProducts.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         // toast.error(action.payload);
// //         toast.error('Product not availbale');
// //         state.products = [];
// //       })

// //       // Get One
// //       .addCase(getProduct.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getProduct.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.product = action.payload;
// //       })
// //       .addCase(getProduct.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         toast.error(action.error.message);
// //       })

// //       // Update
// //       .addCase(updateProduct.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         const index = state.products.findIndex((p) => p._id === action.payload._id);
// //         if (index !== -1) {
// //           state.products[index] = action.payload;
// //         }
// //         toast.success('Product updated successfully');
// //       })
// //       .addCase(updateProduct.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         toast.error(action.payload);
// //       })

// //       // Delete
// //       .addCase(deleteProduct.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.products = state.products.filter((p) => p._id !== action.payload);
// //         toast.success('Product deleted successfully');
// //       })
// //       .addCase(deleteProduct.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //         toast.error(action.payload);
// //       })

// //       // Top Products
// //       .addCase(getTopProducts.fulfilled, (state, action) => {
// //         state.topProducts = action.payload;
// //       })
// //       .addCase(getTopProducts.rejected, (state, action) => {
// //         toast.error(action.payload);
// //       });
// //   }
// // });

// // export const { clearProductState } = productSlice.actions;
// // export default productSlice.reducer;





// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// import toast from 'react-hot-toast';

// export const createProduct = createAsyncThunk(
//   'product/create',
//   async (data, thunkAPI) => {
//     try {
//       const res = await API.createProduct(data);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to create product'
//       );
//     }
//   }
// );

// export const getProducts = createAsyncThunk(
//   'product/fetchProducts',
//   async (
//     { page = 1, limit = 10, search = '', category, sort, maxPrice, minPrice } = {},
//     thunkAPI
//   ) => {
//     try {
//       const skip = (page - 1) * limit;

//       const response = await API.getProducts({
//         limit,
//         skip,
//         search,
//         category,
//         sort,
//         maxPrice,
//         minPrice,
//       });

//       return {
//         ...response.data,
//         page,
//       };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch products'
//       );
//     }
//   }
// );

// export const getFeaturedProducts = createAsyncThunk(
//   'product/featured',
//   async (_, thunkAPI) => {
//     try {
//       const res = await API.fetchFeaturedProducts();
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch featured products'
//       );
//     }
//   }
// );

// export const getFlashsellProducts = createAsyncThunk(
//   'product/flashsell',
//   async (_, thunkAPI) => {
//     try {
//       const res = await API.fetchFlashsellProducts();
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch flash sell products'
//       );
//     }
//   }
// );

// export const getProduct = createAsyncThunk(
//   'product/getOne',
//   async (slug, thunkAPI) => {
//     try {
//       const res = await API.getProduct(slug);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch product'
//       );
//     }
//   }
// );

// export const updateProduct = createAsyncThunk(
//   'product/update',
//   async ({ id, slug, data }, thunkAPI) => {
//     try {
//       const productSlug = slug || id;
//       const res = await API.updateProduct(productSlug, data);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to update product'
//       );
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   'product/delete',
//   async (id, thunkAPI) => {
//     try {
//       await API.deleteProduct(id);
//       return id;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to delete product'
//       );
//     }
//   }
// );

// export const createProductReview = createAsyncThunk(
//   'product/review',
//   async ({ id, review }, thunkAPI) => {
//     try {
//       const res = await API.createProductReview(id, review);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to submit review'
//       );
//     }
//   }
// );

// export const getTopProducts = createAsyncThunk(
//   'product/top',
//   async (_, thunkAPI) => {
//     try {
//       const res = await API.getTopProducts();
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch top products'
//       );
//     }
//   }
// );

// const initialState = {
//   products: [],
//   featuredPro: [],
//   flashPro: [],
//   topProducts: [],
//   product: {},
//   loading: false,
//   listLoading: false,
//   featuredLoading: false,
//   flashLoading: false,
//   singleLoading: false,
//   success: false,
//   total: 0,
//   maxLimit: 0,
//   maxSkip: 0,
//   page: 1,
//   error: null,
// };

// const productSlice = createSlice({
//   name: 'product',
//   initialState,

//   reducers: {
//     clearProductState: (state) => {
//       state.loading = false;
//       state.listLoading = false;
//       state.featuredLoading = false;
//       state.flashLoading = false;
//       state.singleLoading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // CREATE PRODUCT
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.products.unshift(action.payload);

//         toast.success('Product created successfully');
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;

//         toast.error(action.payload);
//       })

//       // GET ALL PRODUCTS
//       .addCase(getProducts.pending, (state) => {
//         state.loading = true;
//         state.listLoading = true;
//         state.error = null;
//       })
//       .addCase(getProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.listLoading = false;
//         state.success = true;
//         state.products = action.payload?.products || [];
//         state.total = action.payload?.total || 0;
//         state.maxLimit = action.payload?.maxLimit || 0;
//         state.maxSkip = action.payload?.maxSkip || 0;
//         state.page = action.payload?.page || 1;
//       })
//       .addCase(getProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.listLoading = false;
//         state.error = action.payload;
//         state.products = [];

//         toast.error('Product not available');
//       })

//       // FEATURED PRODUCTS
//       .addCase(getFeaturedProducts.pending, (state) => {
//         state.featuredLoading = true;
//         state.error = null;
//       })
//       .addCase(getFeaturedProducts.fulfilled, (state, action) => {
//         state.featuredLoading = false;
//         state.success = true;
//         state.featuredPro = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.products || action.payload?.data || [];
//       })
//       .addCase(getFeaturedProducts.rejected, (state, action) => {
//         state.featuredLoading = false;
//         state.error = action.payload;
//         state.featuredPro = [];
//       })

//       // FLASH SELL PRODUCTS
//       .addCase(getFlashsellProducts.pending, (state) => {
//         state.flashLoading = true;
//         state.error = null;
//       })
//       .addCase(getFlashsellProducts.fulfilled, (state, action) => {
//         state.flashLoading = false;
//         state.success = true;
//         state.flashPro = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.products || action.payload?.data || [];
//       })
//       .addCase(getFlashsellProducts.rejected, (state, action) => {
//         state.flashLoading = false;
//         state.error = action.payload;
//         state.flashPro = [];
//       })

//       // SINGLE PRODUCT
//       .addCase(getProduct.pending, (state) => {
//         state.loading = true;
//         state.singleLoading = true;
//         state.error = null;
//       })
//       .addCase(getProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.singleLoading = false;
//         state.success = true;
//         state.product = action.payload || {};
//       })
//       .addCase(getProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.singleLoading = false;
//         state.error = action.payload;
//         state.product = {};

//         toast.error(action.payload || 'Failed to fetch product');
//       })

//       // UPDATE PRODUCT
//       .addCase(updateProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         const updatedProduct = action.payload;
//         const index = state.products.findIndex(
//           (product) => product._id === updatedProduct?._id
//         );

//         if (index !== -1) {
//           state.products[index] = updatedProduct;
//         }

//         toast.success('Product updated successfully');
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;

//         toast.error(action.payload);
//       })

//       // DELETE PRODUCT
//       .addCase(deleteProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.products = state.products.filter(
//           (product) => product._id !== action.payload
//         );

//         toast.success('Product deleted successfully');
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;

//         toast.error(action.payload);
//       })

//       // CREATE PRODUCT REVIEW
//       .addCase(createProductReview.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createProductReview.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;

//         toast.success('Review submitted successfully');
//       })
//       .addCase(createProductReview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;

//         toast.error(action.payload);
//       })

//       // TOP PRODUCTS
//       .addCase(getTopProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getTopProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.topProducts = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.products || action.payload?.data || [];
//       })
//       .addCase(getTopProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;

//         toast.error(action.payload);
//       });
//   },
// });

// export const { clearProductState } = productSlice.actions;
// export default productSlice.reducer;



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
