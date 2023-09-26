import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions
import axios from 'axios';

interface User {
  email: string;
  nama: string;
  role: string;
  is_verified: string;
};

interface Data {
  accessToken: string;
  user: User[];
}

interface UserState { //untuk state storage
  error: string;
  msg: string;
  data: Data[];
}

const initialState: UserState = {
  data: [],
  error: 'true',
  msg: 'string',
};

export const loginAsync = createAsyncThunk('auth/login',
async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post(`https://bc34-103-172-116-212.ngrok-free.app/api/user/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    

    if (response.status === 200) {
      console.log(response.data.msg);
      return response.data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const register = createAsyncThunk('auth/register',
async ({ nama, email, password, confPassword  }: { nama: string, email: string; password: string, confPassword: string }) => {
  try {
    console.log("tes");
    const response = await axios.post(`https://bc34-103-172-116-212.ngrok-free.app/api/user/register`, {
        nama,
        email,
        password,
        confPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const responseData = response.data;
    console.log(responseData);
  } catch (error) {
    return console.log(error);
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.delete(`https://bc34-103-172-116-212.ngrok-free.app/api/user/logout`);
    console.log("sip logout");
  } catch (error:any) {
    console.error(error.message);
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginAsync.fulfilled, (state, action) => {
      console.log("sampe sini");
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
      console.log(action.payload.msg);
    })
    .addCase(loginAsync.rejected, (state, action) => {
      state.error = "true";
    })
  },
});

export default authSlice.reducer;