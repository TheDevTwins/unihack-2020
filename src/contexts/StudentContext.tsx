import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, Lesson, Quiz, Program } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';
import firebase from 'firebase';

type ContextProps = {
  fetching: boolean;
  ownCourses: Course[];
  ownPrograms: Program[];
  allCourses: Course[];
  allPrograms: Program[];
  lessons: Lesson[];
  quizzes: Quiz[];
  error: any;
  selectedCourse: Course;
  selectCourse: (courseId: string) => void;
  getCourseById: (id: string) => Course;
  getLessonById: (id: string) => Lesson;
  getQuizById: (id: string) => Quiz;
  buyCourse: (courseId: string) => Promise<void>;
  buyProgram: (programId: string) => Promise<void>;
  removeCourse: (courseId: string) => Promise<void>;
  removeProgram: (programId: string) => Promise<void>;
};

export const StudentContext = createContext<ContextProps>({} as ContextProps);

export const StudentProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const courseIds = user.courseIds?.length ? user.courseIds : ['1'];
  const programIds = user.programIds?.length ? user.programIds : ['1'];

  const coursesRef = projectFirestore.collection('courses');
  const [allCourses, fetchingCourses] = useCollectionData<Course>(coursesRef.limit(10), {
    idField: 'id',
  });
  const ownCoursesQuery = coursesRef.where(
    firebase.firestore.FieldPath.documentId(),
    'in',
    courseIds
  );
  const [ownCourses, fetchingOwnCourses] = useCollectionData<Course>(ownCoursesQuery, {
    idField: 'id',
  });

  const programsRef = projectFirestore.collection('programs');
  const [allPrograms, fetchingPrograms] = useCollectionData<Program>(programsRef.limit(10), {
    idField: 'id',
  });
  const ownProgramsQuery = programsRef.where(
    firebase.firestore.FieldPath.documentId(),
    'in',
    programIds
  );
  const [ownPrograms, fetchingOwnPrograms] = useCollectionData<Program>(ownProgramsQuery, {
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

  const selectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const getCourseById = (id: string) => {
    return ownCourses?.find((item) => item.id === id) || (undefined as any);
  };

  const getLessonById = (id: string) => {
    return lessons?.find((item) => item.id === id) || (undefined as any);
  };

  const getQuizById = (id: string) => {
    return quizzes?.find((item) => item.id === id) || (undefined as any);
  };

  const buyCourse = async (courseId: string) => {
    const userRef = projectFirestore.doc(`/users/${user.uid}`);
    await userRef.update({
      courseIds: firebase.firestore.FieldValue.arrayUnion(courseId),
    });
  };

  const removeCourse = async (courseId: string) => {
    const userRef = projectFirestore.doc(`/users/${user.uid}`);
    await userRef.update({
      courseIds: firebase.firestore.FieldValue.arrayRemove(courseId),
    });
  };

  const buyProgram = async (programId: string) => {
    const userRef = projectFirestore.doc(`/users/${user.uid}`);
    await userRef.update({
      programIds: firebase.firestore.FieldValue.arrayUnion(programId),
    });
  };

  const removeProgram = async (programId: string) => {
    const userRef = projectFirestore.doc(`/users/${user.uid}`);
    await userRef.update({
      programIds: firebase.firestore.FieldValue.arrayRemove(programId),
    });
  };

  console.log({ allCourses, allPrograms, ownCourses, ownPrograms });

  return (
    <StudentContext.Provider
      value={{
        fetching:
          fetchingCourses ||
          fetchingPrograms ||
          fetchingLessons ||
          fetchingQuizzes ||
          fetchingOwnCourses ||
          fetchingOwnPrograms,
        ownCourses: ownCourses || [],
        ownPrograms: ownPrograms || [],
        allCourses: allCourses || [],
        allPrograms: allPrograms || [],
        lessons: lessons || [],
        quizzes: quizzes || [],
        error: false,
        selectedCourse,
        selectCourse,
        getCourseById,
        getLessonById,
        getQuizById,
        buyCourse,
        buyProgram,
        removeCourse,
        removeProgram,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
