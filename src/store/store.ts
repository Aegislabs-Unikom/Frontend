import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import { loadState, saveState } from './localstorage';
import ProductSlice from './product/ProductSlice';
import CategorySlice from './category/CategorySlice';
import CartSlice from './cart/CartSlice';
import PaymentSlice from './paymentOrder/PaymentSlice';
import OrderSlice from './paymentOrder/OrderSlice';

const persistedState = loadState();
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductSlice,
    category: CategorySlice,
    cart: CartSlice,
    payment: PaymentSlice,
    orderHistory: OrderSlice
  },
  preloadedState: persistedState
});

store.subscribe(() => { //untuk save state ke local storage
  saveState({
    auth: store.getState().auth,
    // products: store.getState().products
  });
});

export default store;
