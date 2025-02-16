import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../service/user.service';

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await userService.login(userData);
      return response; 
    } catch (error) {
      throw error;
    }
  }
);



// import { createAsyncThunk } from '@reduxjs/toolkit';
// import userService from '../../service/user.service';

// export const login = createAsyncThunk(
//   'auth/login',
//   async (userData, thunkAPI) => {
//     try {
//       const response = await userService.login(userData);
//       return response; 
//     } catch (error) {
//       throw error;
//     }
//   }
// );
