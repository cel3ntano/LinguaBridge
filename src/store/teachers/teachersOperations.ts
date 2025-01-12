import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  where,
  QuerySnapshot,
  doc,
  getDoc,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { RootState } from '@/store';
import { formatDisplayLevel } from '@/lib/utils/formatters';
import { LEVEL_ORDER, TEACHERS_PER_PAGE } from '@/constants/teachers';

const sortLevels = (levels: string[]): string[] => {
  return levels.sort((a, b) => {
    const indexA = LEVEL_ORDER.indexOf(a);
    const indexB = LEVEL_ORDER.indexOf(b);
    return indexA - indexB;
  });
};
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const { lastDocId } = state.teachers;
      const { language, level, price } = state.filters;

      const teachersRef = collection(db, 'teachers');
      const queryConstraints: QueryConstraint[] = [];

      if (language) {
        queryConstraints.push(where(`languages.${language}`, '==', true));
      }
      if (level) {
        queryConstraints.push(where(`levels.${level}`, '==', true));
      }
      if (price) {
        queryConstraints.push(where('price_per_hour', '<=', price));
      }

      if (lastDocId) {
        const lastDocRef = doc(db, 'teachers', lastDocId);
        const lastDocSnapshot = await getDoc(lastDocRef);
        if (lastDocSnapshot.exists()) {
          queryConstraints.push(startAfter(lastDocSnapshot));
        }
      }

      queryConstraints.push(limit(TEACHERS_PER_PAGE + 1));

      const finalQuery = query(teachersRef, ...queryConstraints);
      const snapshot: QuerySnapshot = await getDocs(finalQuery);

      if (snapshot.empty) {
        return {
          teachers: [],
          lastDocId: null,
          hasMore: false,
        };
      }

      const docs = snapshot.docs;
      const hasMore = docs.length > TEACHERS_PER_PAGE;
      const currentPageDocs = docs.slice(0, TEACHERS_PER_PAGE);

      const teachers = currentPageDocs.map((doc) => {
        const data = doc.data();
        const languages = Object.entries(data.languages || {})
          .filter(([, isAvailable]) => isAvailable)
          .map(([lang]) => formatDisplayLevel(lang));

        const levels = Object.entries(data.levels || {})
          .filter(([, isAvailable]) => isAvailable)
          .map(([level]) => level);

        return {
          id: doc.id,
          name: data.name || '',
          surname: data.surname || '',
          languages,
          levels: sortLevels(levels).map((level) => formatDisplayLevel(level)),
          rating: data.rating || 0,
          reviews: data.reviews || [],
          price_per_hour: data.price_per_hour || 0,
          lessons_done: data.lessons_done || 0,
          avatar_url: data.avatar_url || '',
          lesson_info: data.lesson_info || '',
          conditions: data.conditions || [],
          experience: data.experience || '',
        };
      });

      return {
        teachers,
        lastDocId: currentPageDocs[currentPageDocs.length - 1]?.id || null,
        hasMore,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
