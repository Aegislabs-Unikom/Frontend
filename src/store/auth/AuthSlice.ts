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

const baseURL = 'https://aegisquest-ernafpm2wq-uc.a.run.app';
// const baseURL = 'http://localhost:5000';

export const loginAsync = createAsyncThunk('auth/login',
async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseURL}/api/user/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials : true
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
async ({ nama, email, no_hp, password, confPassword  }: { nama: string, email: string, no_hp: string, password: string, confPassword: string }) => {
  
  try {
    const response = await axios.post(`${baseURL}/api/user/register`, {
        nama,
        email,
        // alamat,
        no_hp,
        password,
        confPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
    const responseData = response.data.data.user_id;
    console.log(responseData);
  } catch (error) {
    return console.log(error);
  }
});

export const verifyOTP = createAsyncThunk('auth/verify',
async ({ otp }: { otp: string }) => {
  try {
    const response = await axios.post(`${baseURL}/api/otp/verify`, {
      otp,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
        withCredentials : true
    });
    console.log(response.status);

    if (response.status === 200) {
      console.log("berhasil verify");
      return;
    } else {
      console.log(response.status);
      //throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    return console.log(error);
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axios.delete(`${baseURL}/api/user/logout`,{withCredentials : true});
    console.log(response.data);
    
    console.log("sip logout");
    return response.data;
  } catch (error) {
    console.log("ini error");
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
    .addCase(logoutAsync.fulfilled, (state, action) => {
      console.log("sampe sini");
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
      console.log(action.payload.msg);
    })
  },
});

export default authSlice.reducer;