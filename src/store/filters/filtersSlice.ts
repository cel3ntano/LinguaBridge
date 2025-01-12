import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  language: string;
  level: string;
  price: number | null;
  availableLanguages: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FiltersState = {
  language: '',
  level: '',
  price: null,
  availableLanguages: [],
  loading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLanguageFilter: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLevelFilter: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setPriceFilter: (state, action: PayloadAction<number | null>) => {
      state.price = action.payload;
    },
    setAvailableLanguages: (state, action: PayloadAction<string[]>) => {
      state.availableLanguages = action.payload;
    },
    resetFilters: (state) => {
      state.language = '';
      state.level = '';
      state.price = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLanguageFilter,
  setLevelFilter,
  setPriceFilter,
  setAvailableLanguages,
  resetFilters,
  setLoading,
  setError,
} = filtersSlice.actions;
export default filtersSlice.reducer;
