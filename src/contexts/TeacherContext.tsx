import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, Lesson, Question, Quiz } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';
import firebase from 'firebase';

import { sortedByTimestamp } from './utils';

type ContextProps = {
  fetching: boolean;
  ownCourses: Course[];
  selectedCourse: Course;
  lessons: Lesson[];
  quizzes: Quiz[];
  error: any;
  createCourse: () => void;
  updateCourseDetails: (id: string, data: Partial<Course>) => void;
  getCourseById: (id: string) => Course;
  selectCourse: (courseId: string) => void;
  getLessonById: (id: string) => Lesson;
  createNewLesson: (courseId: string, title: string) => void;
  updateLesson: (id: string, data: Partial<Lesson>) => void;
  createQuiz: (courseId: string) => void;
  updateQuiz: (id: string, data: Partial<Quiz>[]) => void;
  getQuizById: (id: string) => Quiz;
  deleteCourse: (id: string) => void;
};

export const TeacherContext = createContext<ContextProps>({} as ContextProps);

export const TeacherProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const creatorUid = user.uid;

  const coursesRef = projectFirestore.collection('courses');
  const ownCoursesQuery = coursesRef.where('creatorUid', '==', creatorUid);
  const [ownCourses, fetchingOwnCourses] = useCollectionData<Course>(ownCoursesQuery, {
    idField: 'id',
  });

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const selectedCourse =
    ownCourses?.find((item) => item.id === selectedCourseId) || (undefined as any);

  const lessonsRef = projectFirestore.collection('lessons');
  const lessonsQuery = lessonsRef.where('courseId', '==', selectedCourse?.id || '1');
  const [lessons, fetchingLessons] = useCollectionData<Lesson>(lessonsQuery, { idField: 'id' });

  const quizzesRef = projectFirestore.collection('quizzes');
  const quizzesQuery = quizzesRef.where('courseId', '==', selectedCourse?.id || '1');
  const [quizzes, fetchingQuizzes] = useCollectionData<Quiz>(quizzesQuery, { idField: 'id' });

  const createCourse = async () => {
    const newCourseRef = projectFirestore.collection('courses').doc();
    await newCourseRef.set({
      creatorUid: user.uid,
      organizationId: user.organizationId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const updateCourseDetails = async (id: string, data: Partial<Course>) => {
    const courseRef = projectFirestore.doc(`/courses/${id}`);
    await courseRef.update(data);
  };

  const getCourseById = (id: string) => {
    return ownCourses?.find((item) => item.id === id) || ({} as Course);
  };

  const selectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const getLessonById = (id: string) => {
    return lessons?.find((item) => item.id === id) || ({} as Lesson);
  };

  const updateLesson = async (id: string, data: Partial<Lesson>) => {
    const lessonRef = projectFirestore.doc(`/lessons/${id}`);
    await lessonRef.update(data);
  };

  const createNewLesson = async (courseId: string, title: string) => {
    const lessonRef = projectFirestore.collection('lessons').doc();
    await lessonRef.set({
      title,
      content: '<p><br></p>',
      courseId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const createQuiz = async (courseId: string) => {
    const quizRef = projectFirestore.collection('quizzes').doc();
    await quizRef.set({
      courseId,
      title: 'new quiz',
      questions: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const updateQuiz = async (id: string, data: Partial<Quiz>[]) => {
    const quizRef = projectFirestore.doc(`/quizzes/${id}`);
    await quizRef.update(data);
  };

  const getQuizById = (id: string) => {
    return quizzes?.find((item) => item.id === id) || ({} as Quiz);
  };

  const deleteCourse = async (id: string) => {
    const courseRef = projectFirestore.doc(`/courses/${id}`);
    await courseRef.delete();
  };

  return (
    <TeacherContext.Provider
      value={{
        fetching: fetchingLessons || fetchingOwnCourses || fetchingQuizzes,
        ownCourses: sortedByTimestamp(ownCourses),
        selectedCourse,
        lessons: sortedByTimestamp(lessons),
        quizzes: sortedByTimestamp(quizzes),
        error: false,
        createCourse,
        updateCourseDetails,
        getCourseById,
        selectCourse,
        getLessonById,
        createNewLesson,
        updateLesson,
        createQuiz,
        updateQuiz,
        getQuizById,
        deleteCourse
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
