import type { RootState } from '@/store';
import type { User } from '@/types/auth';
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
  async (teacherId: string, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const user = state.auth.user;

      if (!user) {
        throw new Error('User not authenticated');
      }

      const userRef = doc(db, 'users', user.id);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error('User document not found');
      }

      const currentFavorites = userDoc.data().favorites || [];
      const isFavorite = currentFavorites.includes(teacherId);

      await updateDoc(userRef, {
        favorites: isFavorite ? arrayRemove(teacherId) : arrayUnion(teacherId),
      });

      if (isFavorite) {
        dispatch(removeFromFavorites(teacherId));
      } else {
        dispatch(addToFavorites(teacherId));
      }

      const updatedUser: User = {
        ...user,
        favorites: isFavorite
          ? currentFavorites.filter((id: string) => id !== teacherId)
          : [...currentFavorites, teacherId],
      };
      dispatch(setUser(updatedUser));

      return { teacherId, isFavorite: !isFavorite };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },
);
