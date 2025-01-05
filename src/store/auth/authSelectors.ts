import { RootState } from '@/store';
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;
export const selectIsInitialized = (state: RootState) =>
  state.auth.isInitialized;
