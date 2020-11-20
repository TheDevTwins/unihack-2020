export const STUDENT = 0;
export const TEACHER = 1;
export const ORGANIZATION = 2;
export const ADMIN = 3;

export type User = {
  uid: string;
  email: string;
  displayName: string;
  user_type: number;
};

export type Course = {
  creatorUid: string;
  lessons: string;
};
