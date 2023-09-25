import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import { loadState, saveState } from './localstorage';

const persistedState = loadState();
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  });
});

export default store;
