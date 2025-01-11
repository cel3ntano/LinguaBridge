import type { RootState } from '@/store';
import type { Teacher } from '@/types/teachers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  orderBy,
  QuerySnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';

const PAGE_SIZE = 4;

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const { lastDocId, items } = state.teachers;

      const teachersRef = collection(db, 'teachers');
      let teachersQuery;

      if (items.length === 0) {
        teachersQuery = query(
          teachersRef,
          orderBy('name'),
          limit(PAGE_SIZE + 1),
        );
      } else if (lastDocId) {
        const lastDocRef = doc(db, 'teachers', lastDocId);
        const lastDocSnapshot = await getDoc(lastDocRef);

        if (!lastDocSnapshot.exists()) {
          throw new Error('Last document reference not found');
        }

        teachersQuery = query(
          teachersRef,
          orderBy('name'),
          startAfter(lastDocSnapshot),
          limit(PAGE_SIZE + 1),
        );
      } else {
        throw new Error('Invalid query state');
      }

      const snapshot: QuerySnapshot = await getDocs(teachersQuery);

      if (snapshot.empty) {
        return {
          teachers: [],
          lastDocId: null,
          hasMore: false,
        };
      }

      const teachers: Teacher[] = [];
      let lastVisibleId: string | null = null;

      snapshot.docs.forEach((doc, index) => {
        if (index < PAGE_SIZE) {
          const data = doc.data();

          const teacher: Teacher = {
            id: doc.id,
            name: data.name || '',
            surname: data.surname || '',
            languages: data.languages || [],
            levels: data.levels || [],
            rating: data.rating || 0,
            reviews: data.reviews || [],
            price_per_hour: data.price_per_hour || 0,
            lessons_done: data.lessons_done || 0,
            avatar_url: data.avatar_url || '',
            lesson_info: data.lesson_info || '',
            conditions: data.conditions || [],
            experience: data.experience || '',
          };

          teachers.push(teacher);

          if (index === PAGE_SIZE - 1) {
            lastVisibleId = doc.id;
          }
        }
      });

      return {
        teachers,
        lastDocId: lastVisibleId,
        hasMore: snapshot.size > PAGE_SIZE,
      };
    } catch (error) {
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error,
      });
      throw error;
    }
  },
);
