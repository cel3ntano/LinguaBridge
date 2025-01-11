import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { setUser } from '@/store/auth/authSlice';
import { clearFavorites, setFavorites } from '@/store/favorites/favoritesSlice';
import type { User } from '@/types/auth';
import type { AppDispatch } from '@/store';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();

          if (userData) {
            const favorites = userData.favorites || [];
            const validFavorites: string[] = [];

            if (favorites.length > 0) {
              const teachersRef = collection(db, 'teachers');
              const teacherQuery = query(
                teachersRef,
                where('id', 'in', favorites),
              );

              const teacherDocs = await getDocs(teacherQuery);
              teacherDocs.forEach((doc) => {
                if (doc.exists()) {
                  validFavorites.push(doc.id);
                }
              });

              if (validFavorites.length !== favorites.length) {
                await setDoc(
                  userRef,
                  {
                    ...userData,
                    favorites: validFavorites,
                  },
                  { merge: true },
                );
              }
            }

            const validatedUserData: User = {
              id: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || '',
              email: userData.email || firebaseUser.email || '',
              favorites: validFavorites,
            };

            dispatch(setUser(validatedUserData));
            dispatch(setFavorites(validFavorites));
          } else {
            const newUserData: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              favorites: [],
            };

            await setDoc(userRef, newUserData);
            dispatch(setUser(newUserData));
            dispatch(setFavorites([]));
          }
        } catch (error) {
          console.error('Error initializing user data:', error);
          const fallbackUserData: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            favorites: [],
          };
          dispatch(setUser(fallbackUserData));
          dispatch(setFavorites([]));
        }
      } else {
        dispatch(setUser(null));
        dispatch(clearFavorites());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
