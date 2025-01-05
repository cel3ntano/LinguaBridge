import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, signOut } from './authOperations';
import type { AuthState, User } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending, signOut.pending),
        (state: AuthState) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(registerUser.fulfilled, loginUser.fulfilled),
        (state: AuthState, action: PayloadAction<User>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected, signOut.rejected),
        (state: AuthState, action) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export const { clearError, clearAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
