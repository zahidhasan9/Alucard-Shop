import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import toast from 'react-hot-toast';

const initialState = {
   addresses: [],
   address: null,
   loading: false,
   error: null,
   success: false,
};

//  Create Address
export const createAddress = createAsyncThunk('address/create', async (data, thunkAPI) => {
   try {
      const res = await API.createAddress(data);
      return res.data;
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create address');
   }
});

//  Get All Addresses
export const getAllAddresses = createAsyncThunk('address/getAll', async (_, thunkAPI) => {
   try {
      const res = await API.getAllAddresses();
      return res.data;
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch addresses');
   }
});

//  Get Address by Type
export const getAddressByType = createAsyncThunk('address/getByType', async (type, thunkAPI) => {
   try {
      const res = await API.getAddressByType(type);
      return res.data;
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch address by type');
   }
});

//  Update Address
export const updateAddress = createAsyncThunk('address/update', async ({ id, data }, thunkAPI) => {
   try {
      const res = await API.updateAddress(id, data);
      return res.data;
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update address');
   }
});

//  Delete Address
export const deleteAddress = createAsyncThunk('address/delete', async (id, thunkAPI) => {
   try {
      await API.deleteAddress(id);
      return id;
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete address');
   }
});

//  Slice
const addressSlice = createSlice({
   name: 'address',
   initialState,
   reducers: {
      clearAddressState(state) {
         state.loading = false;
         state.success = false;
         state.error = null;
      },
   },
   extraReducers: builder => {
      builder

         // Create
         .addCase(createAddress.pending, state => {
            state.loading = true;
         })
         .addCase(createAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.addresses.push(action.payload);
            toast.success('Address created successfully');
         })
         .addCase(createAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
         })

         // Get All
         .addCase(getAllAddresses.pending, state => {
            state.loading = true;
         })
         .addCase(getAllAddresses.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.addresses = action.payload;
         })
         .addCase(getAllAddresses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
         })

         // Get by Type
         .addCase(getAddressByType.pending, state => {
            state.loading = true;
         })
         .addCase(getAddressByType.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.address = action.payload;
         })
         .addCase(getAddressByType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
         })

         // Update
         .addCase(updateAddress.pending, state => {
            state.loading = true;
         })
         .addCase(updateAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            const index = state.addresses.findIndex(addr => addr._id === action.payload._id);
            if (index !== -1) {
               state.addresses[index] = action.payload;
            }
            toast.success('Address updated successfully');
         })
         .addCase(updateAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
         })

         // Delete
         .addCase(deleteAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.addresses = state.addresses.filter(addr => addr._id !== action.payload);
            toast.success('Address deleted successfully');
         })
         .addCase(deleteAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
         });
   },
});

export const { clearAddressState } = addressSlice.actions;
export default addressSlice.reducer;
