import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { setAvailableLanguages, setLoading, setError } from './filtersSlice';
import { clearTeachers } from '../teachers/teachersSlice';
import { fetchTeachers } from '../teachers/teachersOperations';

export const fetchLanguageOptions = createAsyncThunk(
  'filters/fetchLanguageOptions',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const teachersRef = collection(db, 'teachers');
      const snapshot = await getDocs(teachersRef);

      const languagesSet = new Set<string>();

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.languages) {
          Object.entries(data.languages).forEach(([lang, isAvailable]) => {
            if (isAvailable) {
              languagesSet.add(lang);
            }
          });
        }
      });

      const sortedLanguages = Array.from(languagesSet).sort();
      dispatch(setAvailableLanguages(sortedLanguages));
      dispatch(setError(null));
      return sortedLanguages;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch language options';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const applyFilters = createAsyncThunk(
  'filters/applyFilters',
  async (_, { dispatch }) => {
    try {
      dispatch(clearTeachers());
      await dispatch(fetchTeachers()).unwrap();
    } catch (error) {
      console.error('Error applying filters:', error);
      throw error;
    }
  },
);
