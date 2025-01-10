import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, database } from '@/lib/firebase';
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
          const userRef = ref(database, `users/${firebaseUser.uid}`);
          const userSnapshot = await get(userRef);
          const userData = userSnapshot.val();

          const favorites = userData?.favorites || [];
          const validFavorites: string[] = [];

          await Promise.all(
            favorites.map(async (teacherId: string) => {
              const teacherRef = ref(database, `teachers/${teacherId}`);
              const teacherSnapshot = await get(teacherRef);
              if (teacherSnapshot.exists()) {
                validFavorites.push(teacherId);
              }
            }),
          );

          const validatedUserData: User = {
            id: firebaseUser.uid,
            name: userData?.name || firebaseUser.displayName || '',
            email: userData?.email || firebaseUser.email || '',
            favorites: validFavorites,
          };

          dispatch(setUser(validatedUserData));
          dispatch(setFavorites(validFavorites));

          if (
            JSON.stringify(validFavorites) !==
            JSON.stringify(userData?.favorites)
          ) {
            const userFavoritesRef = ref(
              database,
              `users/${firebaseUser.uid}/favorites`,
            );
            await set(userFavoritesRef, validFavorites);
          }
        } catch (error) {
          console.error('Error initializing user data:', error);
          dispatch(
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              favorites: [],
            }),
          );
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
