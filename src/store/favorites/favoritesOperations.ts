import type { RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { addToFavorites, removeFromFavorites } from './favoritesSlice';
import { setUser } from '../auth/authSlice';
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

export const toggleFavoriteTeacher = createAsyncThunk(
  'favorites/toggleFavorite',
  async (teacherId: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const user = state.auth.user;

    if (!user) {
      return rejectWithValue('User not authenticated');
    }

    const currentFavorites = [...user.favorites];
    const isFavorite = currentFavorites.includes(teacherId);

    try {
      const updatedFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== teacherId)
        : [...currentFavorites, teacherId];

      dispatch(
        isFavorite ? removeFromFavorites(teacherId) : addToFavorites(teacherId),
      );
      dispatch(setUser({ ...user, favorites: updatedFavorites }));

      const userRef = doc(db, 'users', user.id);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error('User document not found');
      }

      await updateDoc(userRef, {
        favorites: isFavorite ? arrayRemove(teacherId) : arrayUnion(teacherId),
      });

      return { teacherId, isFavorite: !isFavorite };
    } catch (error) {
      dispatch(
        isFavorite ? addToFavorites(teacherId) : removeFromFavorites(teacherId),
      );
      dispatch(setUser({ ...user, favorites: currentFavorites }));

      console.error('Error toggling favorite:', error);
      throw error;
    }
  },
);
