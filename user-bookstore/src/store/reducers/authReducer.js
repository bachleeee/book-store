import { createReducer } from '@reduxjs/toolkit';
import { login } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });
});

export default authReducer;
