import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { FirebaseError } from 'firebase/app';
import { auth, database } from '@/lib/firebase';
import type { User } from '@/types/auth';
import { formatFirebaseError } from '@/lib/firebase/errors';
import { clearFavorites } from '../favorites/favoritesSlice';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user: firebaseUser } = userCredential;

      await updateProfile(firebaseUser, { displayName: name });

      const userRef = ref(database, `users/${firebaseUser.uid}`);
      const userData: User = {
        id: firebaseUser.uid,
        name,
        email,
        favorites: [],
      };

      try {
        await set(userRef, userData);
      } catch (dbError) {
        console.error(dbError);
        await firebaseUser.delete();
        throw new Error('Failed to create user profile. Please try again.');
      }

      return userData;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(formatFirebaseError(error));
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user: firebaseUser } = userCredential;

      const userRef = ref(database, `users/${firebaseUser.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        const userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          favorites: [],
        };
        await set(userRef, userData);
        return userData;
      }

      return snapshot.val() as User;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(formatFirebaseError(error));
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await firebaseSignOut(auth);
      dispatch(clearFavorites());
      return null;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(formatFirebaseError(error));
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);
