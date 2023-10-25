import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions
import axios from 'axios';

interface Province { //untuk state storage
  province_id: string;
  province: string;
}

interface City { //untuk state storage
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

interface Cost {
  etd: string;
  note: string;
  value: number;
}

interface Costs {
  cost: Cost[];
  description: string;
  service: string;
}

interface PaymentState { //untuk state storage
    msg: string;
    token: string;
    redirectURL: string;
    provinces:Province[];
    cities: City[];
    costs: Costs[];
  }
  
const initialState: PaymentState = {
    msg: 'error fetching data',
    token: "error no token",
    redirectURL: "",
    provinces:[],
    cities: [],
    costs: [],
};

const baseURL = 'https://aegisquest-ernafpm2wq-uc.a.run.app';
// const baseURL = 'http://localhost:5000';

export const processCartToPayment = createAsyncThunk('payment/processCartToPayment', 
async ({ biayaOngkir }: { biayaOngkir: number}) => {
    try {
        const response = await axios.post(
            `${baseURL}/api/order`,
            {ongkir: biayaOngkir},
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
  async ({ status, order_id }: { status: string, order_id: string}) => {
    try {
      console.log({status: status});
      console.log({order_id: order_id});
      const response = await axios.post(`${baseURL}/api/order/status`, 
      {
        status: status,
        order_id: order_id,
      }, 
      {
        withCredentials : true,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
      
      // alert(response.data.data);
      console.log(response.data);

      if (response.status === 200) {
        alert(response.data.msg);
        console.log(response.data);
        console.log("payment status berhasil");
      } else {
        console.log("error update status");
        alert("error");
      }
    } catch (error: any) {
      console.log(error);
      return error;
    }
  });

  export const getProvince = createAsyncThunk('payment/getProvince', async () => {
    try {
        const response = await axios.get(
            `${baseURL}/api/rajaongkir/provinsi`,
            {
              withCredentials: true,
            }
          );    

        if (response.status === 200) {
            // console.log(response.data.rajaongkir.results);
            return response.data.rajaongkir.results;
        } else {
            throw new Error("Request failed with status: " + response.status);
        }
    } catch (error: any) {
      console.log("ini error");
      console.log(error.response);
    }
  });

  export const getKota = createAsyncThunk('payment/getKota', 
  async ({ id }: { id: Number}) => {
    try {
        const response = await axios.get(
            `${baseURL}/api/rajaongkir/kota/${id}`,
            {
              withCredentials: true,
            }
          );    

        if (response.status === 200) {
            // console.log(response.data.rajaongkir.results);
            return response.data.rajaongkir.results;
        } else {
            throw new Error("Request failed with status: " + response.status);
        }
    } catch (error: any) {
      console.log("ini error");
      console.log(error.response);
    }
  });

  export const cekOngkir = createAsyncThunk('payment/setAlamat', 
  async ({ alamat, tujuan, berat, kurir }: { alamat: string, tujuan: string, berat: string, kurir: string}) => {
    try {
        const response = await axios.post(
            `${baseURL}/api/user/alamat`,
            { alamat: alamat },
            {
              withCredentials: true,
            }
          );    
        
        const getOngkir = await axios.get(
          `${baseURL}/api/rajaongkir/ongkir/9/${tujuan}/${berat}/${kurir}`,
          {
            withCredentials: true,
          }
        );

        const ro = getOngkir.data.rajaongkir;

        if (ro.status.code === 200) {
            console.log(ro.results[0].costs[0]);
            return ro.results[0].costs[0];
        } else {
            throw new Error("Request failed with status: " + response.status);
        }
    } catch (error: any) {
      console.log("ini error");
      console.log(error);
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
    .addCase(getProvince.fulfilled, (state, action) => {
      state.provinces = action.payload;
    })
    .addCase(getKota.fulfilled, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(cekOngkir.fulfilled, (state, action) => {
      state.costs = action.payload;
    })
  },
});

export default paymentSlice.reducer;