import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from "./slices/bookSlice";
import goalReducer from "./slices/goalSlice";
import sessionReducer from "./slices/sessionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    goals: goalReducer,
    sessions: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
