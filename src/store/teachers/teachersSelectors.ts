import { RootState } from '@/store';
export const selectTeachers = (state: RootState) => state.teachers.items;
export const selectIsLoading = (state: RootState) => state.teachers.loading;
export const selectError = (state: RootState) => state.teachers.error;
export const selectHasMore = (state: RootState) => state.teachers.hasMore;
export const selectLastKey = (state: RootState) => state.teachers.lastKey;
