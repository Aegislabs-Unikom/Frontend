import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions
import axios from 'axios';

interface Category {
  id: string;
  nama_category: string;
};

interface CategoryState { //untuk state storage
  error: string;
  msg: string;
  data: Category[];
}

const initialState: CategoryState = {
  data: [],
  error: 'true',
  msg: 'error fetching data',
};

const baseURL = 'https://aegisquest-ernafpm2wq-uc.a.run.app';
// const baseURL = 'http://localhost:5000';

export const getAllCategory = createAsyncThunk('product/getAllCategory', async () => {
  try {
      const response = await axios.get(`${baseURL}/api/category`,{withCredentials : true});

      if (response.status === 200) {
          console.log(response.data.data);
          return response.data;
      } else {
          throw new Error("Request failed with status: " + response.status);
      }
  } catch (error) {
    console.log("ini error");
    throw error;
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

const categorySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllCategory.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    })
    .addCase(getAllCategory.rejected, (state, action) => {
      state.error = "true";
    })
  },
});

export default categorySlice.reducer;