import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions
import axios from 'axios';

interface PaymentState { //untuk state storage
    msg: string;
    token: string;
    redirectURL: string;
  }
  
const initialState: PaymentState = {
    msg: 'error fetching data',
    token: "error no token",
    redirectURL: "",
};

const baseURL = 'https://aegisquest-ernafpm2wq-uc.a.run.app';
// const baseURL = 'http://localhost:5000';

export const processCartToPayment = createAsyncThunk('payment/processCartToPayment', async () => {
    try {
        const response = await axios.post(
            `${baseURL}/api/order`,
            {},
            {
              withCredentials: true,
            }
          );    

        if (response.status === 200) {
            console.log(response.data.msg);
            return response.data;
        } else {
            throw new Error("Request failed with status: " + response.status);
        }
    } catch (error: any) {
      console.log("ini error");
      console.log(error.response);
    }
  });

  export const statusPaymentOrder = createAsyncThunk('payment/statusPaymentOrder',
  async ({ status }: { status: string}) => {
    try {
      console.log({status: status});
      const response = await axios.post(`${baseURL}/api/order/status`, 
      {
        status: status,
      }, 
      {
        withCredentials : true,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
      
      alert(response.data.data);
      console.log(response.data);

      if (response.status === 200) {
        alert(response.data.data);
        console.log(response.data);
        console.log("payment status berhasil");
      } else {
        console.log("error update status");
        alert("error");
      }
    } catch (error: any) {
      console.log(error.response);
      return error;
    }
  });

const paymentSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(processCartToPayment.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.redirectURL = action.payload.redirectURL;
      state.msg = action.payload.msg;
      console.log(state.token);
    })
    // .addCase(processCartToPayment.rejected, (state, action) => {
    //   state.error = "true";
    // })
  },
});

export default paymentSlice.reducer;