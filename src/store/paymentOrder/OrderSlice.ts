import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions
import axios from 'axios';

interface Product {
    id: string;
    description: string;
    nama_produk: string;
    price: number;
    stock: number;
}

interface Order { //untuk state storage
  _id: string;
  status: string;
  total_amount: number;
  user_id: string;
  products: Product[];
}

interface OrderState { //untuk state storage
    msg: string;
    error: boolean;
    data: Order[];
  }
  
const initialState: OrderState = {
    msg: 'error fetching data',
    error: true,
    data: []
};

const baseURL = 'https://aegisquest-ernafpm2wq-uc.a.run.app';
// const baseURL = 'http://localhost:5000';

  export const getAllOrder = createAsyncThunk('order/getAllOrder', async () => {
    try {
        const response = await axios.get(
            `${baseURL}/api/order`,
            {
              withCredentials: true,
            }
          );    

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Request failed with status: " + response.status);
        }
    } catch (error: any) {
      console.log("ini error");
      console.log(error.response);
    }
  });

const OrderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllOrder.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.msg = action.payload.msg;
      console.log(state.msg);
    })
  },
});

export default OrderSlice.reducer;