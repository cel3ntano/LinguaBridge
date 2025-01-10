import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set } from 'firebase/database';
import { database } from '@/lib/firebase';
import { addToFavorites, removeFromFavorites } from './favoritesSlice';
import { setUser } from '../auth/authSlice';
import type { RootState } from '@/store';
import type { User } from '@/types/auth';

export const toggleFavoriteTeacher = createAsyncThunk(
  'favorites/toggleFavorite',
  async (teacherId: string, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const user = state.auth.user;

      if (!user) {
        throw new Error('User not authenticated');
      }

      const currentFavorites = [...(user.favorites || [])];
      const isFavorite = currentFavorites.includes(teacherId);

      const newFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== teacherId)
        : [...currentFavorites, teacherId];

      const userFavoritesRef = ref(database, `users/${user.id}/favorites`);
      await set(userFavoritesRef, newFavorites);

      if (isFavorite) {
        dispatch(removeFromFavorites(teacherId));
      } else {
        dispatch(addToFavorites(teacherId));
      }

      const updatedUser: User = {
        ...user,
        favorites: newFavorites,
      };
      dispatch(setUser(updatedUser));

      return { teacherId, isFavorite: !isFavorite };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },
);
