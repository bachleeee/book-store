import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../service/user.service';

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await userService.login(userData);
      console.log(response);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Login failed'); 
    }
  }
);
