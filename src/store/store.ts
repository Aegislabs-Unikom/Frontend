import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import { loadState, saveState } from './localstorage';
import ProductSlice from './product/ProductSlice';
import CategorySlice from './category/CategorySlice';

const persistedState = loadState();
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductSlice,
    category: CategorySlice
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    // products: store.getState().products
  });
});

export default store;
