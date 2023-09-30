import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions
import axios from 'axios';

interface Products {
  id: string;
  nama_produk: string;
  description: string;
  price: number;
  stock: number;
};

interface UserState { //untuk state storage
  error: string;
  msg: string;
  data: Products[];
}

const initialState: UserState = {
  data: [],
  error: 'true',
  msg: 'error fetching data',
};

const baseURL = 'https://aegisquest-ernafpm2wq-uc.a.run.app';

export const getAllProducts = createAsyncThunk('product/getAllProduct', async () => {
    try {
        const response = await axios.get(`${baseURL}/api/products`,{withCredentials : true});

        if (response.status === 200) {
            console.log(response.data.msg);
            return response.data;
        } else {
            throw new Error("Request failed with status: " + response.status);
        }
    } catch (error) {
      console.log("ini error");
      throw error;
    }
  });

export const getProductById = createAsyncThunk('product/getProductById',
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

export const addNewProduct = createAsyncThunk('product/addNewProduct',
async ({ nama_produk, description, price, stock, image, category_id  }: { nama_produk: string, description: string, price: number, stock: number, image: string, category_id: string }) => {
  try {
    const response = await axios.post(`${baseURL}/api/products`, {
        nama_produk, 
        description, 
        price, 
        stock, 
        image, 
        category_id
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

export const addNewCategory = createAsyncThunk('product/addNewCategory',
async ({ nama_category }: { nama_category: string }) => {
  try {
    const response = await axios.post(`${baseURL}/api/category`, {
        nama_category,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
    const responseData = response.data.msg;
    console.log(responseData);
  } catch (error) {
    return console.log(error);
  }
});

export const verifyOTP = createAsyncThunk('auth/login',
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

    if (response.status === 200) {
      return;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    throw error;
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.delete(`${baseURL}/api/user/logout`,{withCredentials : true});
    console.log("sip logout");
  } catch (error) {
    console.log("ini error");
    throw error;
  }
});

const productSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.error = "true";
    })
  },
});

export default productSlice.reducer;