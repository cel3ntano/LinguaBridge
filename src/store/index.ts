import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import teachersReducer from './teachers/teachersSlice';
import favoritesReducer from './favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
