import type { User } from '@/types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { auth, db } from '@/lib/firebase';
import { formatFirebaseError } from '@/lib/firebase/errors';
import { clearFavorites } from '../favorites/favoritesSlice';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';

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

      const userData: User = {
        id: firebaseUser.uid,
        name,
        email,
        favorites: [],
      };

      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        await setDoc(userRef, userData);
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

      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          favorites: [],
        };
        await setDoc(userRef, userData);
        return userData;
      }

      return userDoc.data() as User;
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
