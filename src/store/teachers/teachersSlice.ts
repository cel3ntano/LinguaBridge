import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachers } from './teachersOperations';
import type { TeachersState } from '@/types/teachers';

const initialState: TeachersState = {
  items: [],
  lastDocId: null,
  loading: false,
  error: null,
  hasMore: false,
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearTeachers: (state) => {
      state.items = [];
      state.lastDocId = null;
      state.hasMore = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        if (state.items.length === 0) {
          state.items = action.payload.teachers;
        } else {
          state.items = [...state.items, ...action.payload.teachers];
        }
        state.lastDocId = action.payload.lastDocId;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teachers';
      });
  },
});

export const { clearTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
