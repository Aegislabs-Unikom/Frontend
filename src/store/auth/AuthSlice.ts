import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Implement these API functions

export const loginAsync = createAsyncThunk('auth/login',
async ({ email, password }: { email: string; password: string }) => {
  try {
    console.log("tes");
    const response = await fetch(`https://b14e-203-210-84-203.ngrok-free.app/login`,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ email, password }),
    });
    // const data = await response.json();
    console.log(response);

    if (response.ok) {
        try {
          return response;
        } catch (jsonError) {
          console.error("Response is not JSON:", jsonError);
          throw new Error("Invalid response from the server");
        }
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
  } catch (error) {
    console.log(error);
    return error;
  }
});

// export const logoutAsync = createAsyncThunk('auth/logout', async () => {
//   try {
//     const response = await logoutAPI(); // Replace with your logout API call

//     if (response.ok) {
//       return true;
//     } else {
//       throw new Error('Logout failed');
//     }
//   } catch (error) {
//     throw error.message;
//   }
// });


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    accessToken: '',
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.accessToken = action.payload.accessToken;
        state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = '';
      state.password = '';
      state.accessToken = '';
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;