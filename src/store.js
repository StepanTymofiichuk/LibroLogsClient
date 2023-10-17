import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from "./slices/bookSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
