import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export const selectLanguageFilter = (state: RootState) =>
  state.filters.language;
export const selectLevelFilter = (state: RootState) => state.filters.level;
export const selectPriceFilter = (state: RootState) => state.filters.price;
export const selectAvailableLanguages = (state: RootState) =>
  state.filters.availableLanguages;
export const selectIsLoading = (state: RootState) => state.filters.loading;
export const selectError = (state: RootState) => state.filters.error;

export const selectActiveFilters = createSelector(
  [selectLanguageFilter, selectLevelFilter, selectPriceFilter],
  (language, level, price) => ({
    language,
    level,
    price,
  }),
);
