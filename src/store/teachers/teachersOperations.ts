import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ref,
  get,
  query,
  limitToFirst,
  startAt,
  orderByKey,
} from 'firebase/database';
import { database } from '@/lib/firebase';
import type { RootState } from '@/store';
import type { Teacher } from '@/types/teachers';

const PAGE_SIZE = 4;

const createTeachersQuery = (startAtKey?: string) => {
  const baseQuery = query(
    ref(database, 'teachers'),
    orderByKey(),
    limitToFirst(PAGE_SIZE + 1),
  );

  return startAtKey ? query(baseQuery, startAt(startAtKey)) : baseQuery;
};

const fetchInitialTeachers = async () => {
  const snapshot = await get(createTeachersQuery());

  if (!snapshot.exists()) {
    return { teachers: [], lastKey: null, hasMore: false };
  }

  const teachers: Teacher[] = [];
  let newLastKey: string | null = null;

  snapshot.forEach((childSnapshot) => {
    teachers.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
    newLastKey = childSnapshot.key;
  });

  return {
    teachers: teachers.slice(0, PAGE_SIZE),
    lastKey: newLastKey,
    hasMore: teachers.length > PAGE_SIZE,
  };
};

const fetchMoreTeachers = async (lastKey: string) => {
  const snapshot = await get(createTeachersQuery(lastKey));

  if (!snapshot.exists()) {
    return { teachers: [], lastKey: null, hasMore: false };
  }

  const teachers: Teacher[] = [];
  let newLastKey: string | null = null;
  let isFirst = true;

  snapshot.forEach((childSnapshot) => {
    if (!isFirst) {
      teachers.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
      newLastKey = childSnapshot.key;
    }
    isFirst = false;
  });

  return {
    teachers: teachers.slice(0, PAGE_SIZE),
    lastKey: newLastKey,
    hasMore: teachers.length > PAGE_SIZE - 1,
  };
};

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { lastKey, items } = state.teachers;

    return items.length === 0
      ? fetchInitialTeachers()
      : fetchMoreTeachers(lastKey as string);
  },
);
