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
// const baseURL = 'http://localhost:5000';

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
async ({ id }: { id: string}) => {
  try {
    const response = await axios.get(`${baseURL}/api/products/${id}`, {
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
  } catch (error:any) {
    console.log(error.response.data.msg);
    return error;
  }
});

export const addNewProduct = createAsyncThunk('product/addNewProduct',
async ({ nama_produk, description, price, stock, images, category_id  }: { nama_produk: string, description: string, price: number, stock: number, images: string, category_id: string }) => {
  try {
    const formData = new FormData();
    console.log(images[0]);
    formData.append("images", images[0]);
    formData.append("nama_produk", nama_produk);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category_id", category_id);

    const response = await axios.post(`${baseURL}/api/products`, 
      formData, 
      {
        withCredentials : true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
    
    console.log(response.data.msg);
    return response.data;
  } catch (error) {
    return console.log(error);
  }
});

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

export const deleteProduct = createAsyncThunk('product/deleteProduct',
async ({ id }: { id: string}) => {
  try {
    console.log(id);
    const response = await axios.delete(`${baseURL}/api/products/${id}`, {withCredentials : true});

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
    .addCase(getProductById.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.error = "true";
    })
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

export default productSlice.reducer;