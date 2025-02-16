import { createReducer } from '@reduxjs/toolkit';
import { login } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; 
    })
});

export default authReducer;
