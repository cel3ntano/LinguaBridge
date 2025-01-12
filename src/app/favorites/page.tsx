'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { selectFavorites } from '@/store/favorites/favoritesSelectors';
import TeacherCard from '@/components/features/teachers/TeacherCard';
import TeacherCardSkeleton from '@/components/features/teachers/TeacherCardSkeleton';
import TeacherFilters from '@/components/features/teachers/TeacherFilters';
import {
  selectTeachers,
  selectIsLoading,
} from '@/store/teachers/teachersSelectors';

const FavoritesPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const allTeachers = useAppSelector(selectTeachers);
  const loading = useAppSelector(selectIsLoading);
  const favorites = useAppSelector(selectFavorites);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/');
    }
  }, [isAuthenticated]);

  const favoriteTeachers = allTeachers.filter((teacher) =>
    favorites.includes(teacher.id),
  );

  if (loading && favoriteTeachers.length === 0) {
    return (
      <main className="bg-background-backdrop px-32 py-24">
        <div className="mx-auto max-w-[1440px]">
          <TeacherFilters />
          <div className="space-y-8">
            <TeacherCardSkeleton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background-backdrop px-32 py-24">
      <div className="mx-auto max-w-[1440px]">
        <TeacherFilters />
        <div className="space-y-8">
          {favoriteTeachers.length > 0 ? (
            favoriteTeachers.map((teacher, index) => (
              <TeacherCard key={`${teacher.name}-${index}`} teacher={teacher} />
            ))
          ) : (
            <div className="text-center py-8">
              <h2 className="text-2xl font-medium text-text-primary mb-4">
                No favorite teachers yet
              </h2>
              <p className="text-text-secondary">
                Visit the Teachers page to find and add teachers to your
                favorites
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FavoritesPage;
