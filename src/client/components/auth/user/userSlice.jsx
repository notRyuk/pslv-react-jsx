import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  updateUser,
  fetchUserById,
} from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: null, // this info will be used in case of detailed user info, while auth will
  // only be used for loggedInUser id etc checks
};

// export const fetchLoggedInUserOrderAsync = createAsyncThunk(
//   'user/fetchLoggedInUserOrders',
//   async (id) => {
//     const response = await fetchLoggedInUserOrders(id);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const fetchUserByIdAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchUserById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (id) => {
    const response = await updateUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.userOrders = action.payload;
      // })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.userOrders = action.payload;
      })
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});

// export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

// export const { increment } = userSlice.actions;

export default userSlice.reducer;