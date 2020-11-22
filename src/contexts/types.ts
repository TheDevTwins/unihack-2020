export const STUDENT = 0;
export const TEACHER = 1;
export const ORGANIZATION = 2;
export const ADMIN = 3;

type Student = {
  courseIds: string[];
  programIds: string[];
};

type Teacher = {
  organizationId: string;
};

export type User = {
  uid: string;
  email: string;
  displayName: string;
  userType: number;
} & Student &
  Teacher;

export const EASY = 0;
export const MEDIUM = 1;
export const HARD = 2;

type Timestamp = { createdAt: { seconds: number } };

export type Metadata = {
  id: string;
  creatorUid: string;
  organizationId: string;
  title: string;
  description: string;
  tags: string[];
  duration: number; // hours
  difficulty: number;
  thumbnailUrl: string;
  price: number;
} & Timestamp;

export const MULTIPLE_CHOICE = 0;

export type Question = { description: string } & {
  questionType: number;
  correctAnswer: string;
  otherAnswers: string[];
  answers: string[];
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
  courseId: string;
} & Timestamp;

export type Lesson = { id: string; title: string; content: string; courseId: string } & Timestamp;

export type Course = Metadata & {};

export type Program = Metadata & { courseIds: string[] };
