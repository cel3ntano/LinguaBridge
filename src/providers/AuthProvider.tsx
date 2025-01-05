import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, database } from '@/lib/firebase';
import { setUser } from '@/store/auth/authSlice';
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
          const snapshot = await get(userRef);
          let userData: User;

          if (snapshot.exists()) {
            userData = snapshot.val() as User;
          } else {
            userData = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              favorites: [],
            };
          }
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
