import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions
import axios from 'axios';

interface Product {
    id: string;
    category_id: string;
    description: string;
    nama_produk: string;
    price: number;
    stock: number;
}

interface ProductInCart {
    product: Product[];
    quantity: number;
}

interface UserState { //untuk state storage
  error: string;
  msg: string;
  data: ProductInCart[];
}

const initialState: UserState = {
  data: [],
  error: 'true',
  msg: 'error fetching data',
};

const baseURL = 'https://aegisquest-ernafpm2wq-uc.a.run.app';
// const baseURL = 'http://localhost:5000';

export const addToCart = createAsyncThunk('product/addToCart',
async ({ quantity, id }: { quantity: number, id: string}) => {
  try {
    console.log(id);
    console.log(quantity);
    const response = await axios.post(`${baseURL}/api/cart/${id}`, 
    {quantity}, 
    {
      withCredentials : true
    });

    if (response.status === 200) {
      console.log(response.data.msg);
      console.log(response.data);

      return response.data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error: any) {
    console.log(error.response);
    return error;
  }
});

export const getAllCart = createAsyncThunk('product/getAllCart', async () => {
  try {
      const response = await axios.get(`${baseURL}/api/cart`,{withCredentials : true});

      if (response.status === 200) {
          console.log(response.data.msg);
        //   console.log(response.data);
          return response.data;
      } else {
          throw new Error("Request failed with status: " + response.status);
      }
  } catch (error: any) {
    console.log("ini error");
    throw error.response;
  }
});

const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllCart.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    })
    .addCase(getAllCart.rejected, (state, action) => {
      state.error = "true";
    })
  },
});

export default cartSlice.reducer;