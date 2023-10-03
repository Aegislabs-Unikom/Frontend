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
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const addNewProduct = createAsyncThunk('product/addNewProduct',
async ({ nama_produk, description, price, stock, images, category_id  }: { nama_produk: string, description: string, price: number, stock: number, images: string, category_id: string }) => {
  try {
    // var bodyFormData = new FormData();
    // bodyFormData.append('nama_produk', nama_produk);
    // bodyFormData.append('description', description);
    // bodyFormData.append('price', price);
    // bodyFormData.append('stock', stock);
    // bodyFormData.append('image', image);
    // bodyFormData.append('category_id', category_id);
    
    const response = await axios.post(`${baseURL}/api/products`, {
        nama_produk, 
        description, 
        price, 
        stock, 
        images, 
        category_id
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials : true
      });
      console.log(response.data);
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

// export const deleteProduct = createAsyncThunk('product/deleteProduct',
// async ({ productId }: { productId: string }) => {
//   console.log(productId);
//   try {
//     console.log(productId);
//     const response = await axios.delete(`${baseURL}/api/products/${productId}`, {withCredentials : true});
//     const responseData = response.data.msg;
//     console.log(responseData);

//     if (response.status === 200) {
//       console.log("bisa hapus");
//     } else {
//       throw new Error("Request failed with status: " + response.status);
//     }
//   } catch (error) {
//     console.log("ini error");
//     console.log(error);
//   }
// });

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
  },
});

export default productSlice.reducer;