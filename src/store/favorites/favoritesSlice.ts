import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
  clearFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
