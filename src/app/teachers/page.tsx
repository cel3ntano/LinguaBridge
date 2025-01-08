'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTeachers } from '@/store/teachers/teachersOperations';
import TeacherCard from '@/components/features/teachers/TeacherCard';
import TeacherCardSkeleton from '@/components/features/teachers/TeacherCardSkeleton';
import TeacherFilters from '@/components/features/teachers/TeacherFilters';
import Button from '@/components/common/Button';
import {
  selectTeachers,
  selectIsLoading,
  selectHasMore,
} from '@/store/teachers/teachersSelectors';

const ITEMS_PER_PAGE = 4;

const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectTeachers);
  const loading = useAppSelector(selectIsLoading);
  const hasMore = useAppSelector(selectHasMore);
  const listRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    await dispatch(fetchTeachers());
    requestAnimationFrame(() => {
      if (listRef.current) {
        const firstCard = listRef.current.children[0] as HTMLDivElement;
        const cardHeight = firstCard?.offsetHeight || 0;
        window.scrollBy({
          top: cardHeight + 32,
          behavior: 'smooth',
        });
      }
      setIsLoadingMore(false);
    });
  };

  if (loading && teachers.length === 0) {
    return (
      <main className="bg-background-backdrop px-32 py-24">
        <div className="mx-auto max-w-[1440px]">
          <TeacherFilters />
          <div className="space-y-8">
            {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <TeacherCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background-backdrop px-32 py-24">
      <div className="mx-auto max-w-[1440px]">
        <TeacherFilters />
        <div ref={listRef} className="space-y-8">
          {teachers.map((teacher, index) => (
            <TeacherCard key={`${teacher.name}-${index}`} teacher={teacher} />
          ))}

          {isLoadingMore &&
            [...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <TeacherCardSkeleton key={`loading-${index}`} />
            ))}
        </div>

        {hasMore && !loading && !isLoadingMore && (
          <div className="flex justify-center mt-16">
            <Button
              onClick={handleLoadMore}
              size="large"
              className="px-12"
              disabled={isLoadingMore}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default TeachersPage;