// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// import toast from 'react-hot-toast';

// //  Fetch Cart
// export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
//   try {
//     const res = await API.fetchCart();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch cart');
//   }
// });

// //  Add to Cart
// export const addToCart = createAsyncThunk('cart/add', async (product, thunkAPI) => {
//   try {
//     const res = await API.addToCart(product);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add to cart');
//   }
// });

// //  Update Cart Item Quantity
// export const updateCartItem = createAsyncThunk('cart/update', async ({ productId, quantity }, thunkAPI) => {
//   try {
//     const res = await API.updateCartItem(productId, quantity);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update cart item');
//   }
// });

// //  Remove From Cart
// export const removeFromCart = createAsyncThunk('cart/remove', async (productId, thunkAPI) => {
//   try {
//     await API.removeFromCart(productId);
//     return productId;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to remove item');
//   }
// });

// // 🔹 Initial State
// const initialState = {
//   cartItems: [],
//   loading: false,
//   error: null,
//   success: false
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     clearCartState: (state) => {
//       state.cartItems = [];
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       //  Fetch Cart
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems = action.payload;
//         state.success = true;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         // toast.error(action.payload);
//       })

//       //  Add to Cart
//       .addCase(addToCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         // state.cartItems.push(action.payload);
//         state.success = true;
//         toast.success('Item added to cart');
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       // Update Cart Item
//       .addCase(updateCartItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         // const index = state.cartItems.findIndex((item) => item._id === action.payload._id);
//         // if (index !== -1) {
//         //   state.cartItems[index] = action.payload;
//         // }
//         toast.success('Item quantity updated');
//       })
//       .addCase(updateCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       //  Remove From Cart
//       .addCase(removeFromCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         // state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
//         toast.success('Item removed');
//       })
//       .addCase(removeFromCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       });
//   }
// });

// export const { clearCartState } = cartSlice.actions;
// export default cartSlice.reducer;




import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as API from './API';

const normalizeCartPayload = payload => {
  const cart =
    payload?.cart ||
    payload?.data?.cart ||
    payload?.data ||
    payload;

  if (Array.isArray(cart?.items)) {
    return cart;
  }

  if (Array.isArray(cart)) {
    return {
      items: cart,
    };
  }

  return {
    items: [],
  };
};

const getLatestCart = async () => {
  const response = await API.fetchCart();
  return normalizeCartPayload(response.data);
};

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const response = await API.fetchCart();
    return normalizeCartPayload(response.data);
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Failed to fetch cart'
    );
  }
});

export const addToCart = createAsyncThunk(
  'cart/add',
  async (product, thunkAPI) => {
    try {
      await API.addToCart(product);
      return await getLatestCart();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to add to cart'
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await API.updateCartItem(productId, quantity);
      return await getLatestCart();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update cart item'
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId, thunkAPI) => {
    try {
      await API.removeFromCart(productId);
      return await getLatestCart();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to remove item'
      );
    }
  }
);

export const clearCart = createAsyncThunk('cart/clear', async (_, thunkAPI) => {
  try {
    await API.clearCart();
    return {
      items: [],
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Failed to clear cart'
    );
  }
});

const initialState = {
  cartItems: {
    items: [],
  },
  loading: false,
  error: null,
  success: false,
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    clearCartState: state => {
      state.cartItems = {
        items: [],
      };
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.success = true;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.success = true;
        toast.success('Item added to cart');
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(updateCartItem.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.success = true;
        toast.success('Item quantity updated');
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(removeFromCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.success = true;
        toast.success('Item removed');
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(clearCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.success = true;
        toast.success('Cart cleared');
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;