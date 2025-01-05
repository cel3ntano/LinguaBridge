'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function FavoritesPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <main className="mx-auto max-w-[1440px] mt-5 px-16 pb-8">
      <h1 className="text-4xl font-medium mb-8">Favorite Teachers</h1>
      {/* Favorites content will be implemented later */}
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-lg text-text-secondary">
          Your favorites list is currently empty.
        </p>
      </div>
    </main>
  );
}
