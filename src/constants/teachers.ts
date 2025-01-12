export const TEACHER_LEVELS = [
  'A1_Beginner',
  'A2_Elementary',
  'B1_Intermediate',
  'B2_Upper_Intermediate',
  'C1_Advanced',
  'C2_Proficient',
];

export const LEVEL_ORDER = [...TEACHER_LEVELS];

export const TEACHERS_PER_PAGE = 4;

export const PRICE_OPTIONS = [10, 20, 30, 40] as const;

export type TeacherLevel = (typeof TEACHER_LEVELS)[number];
