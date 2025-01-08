import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTeachers } from './teachersOperations';
import type { TeachersState } from '@/types/teachers';

const initialState: TeachersState = {
  items: [],
  lastKey: null,
  loading: false,
  error: null,
  hasMore: true,
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearTeachers: (state) => {
      state.items = [];
      state.lastKey = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.items =
          state.items.length === 0
            ? action.payload.teachers
            : [...state.items, ...action.payload.teachers];
        state.lastKey = action.payload.lastKey;
        state.hasMore = action.payload.hasMore;
      })
      .addMatcher(isAnyOf(fetchTeachers.pending), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchTeachers.fulfilled), (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchTeachers.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teachers';
      });
  },
});

export const { clearTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;