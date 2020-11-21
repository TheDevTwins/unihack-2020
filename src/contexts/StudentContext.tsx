import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, Lesson, Program } from './types';

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
  error: any;
  selectedCourse: Course;
  selectCourse: (courseId: string) => void;
  getCourseById: (id: string) => Course;
  getLessonById: (id: string) => Lesson;
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
  const lessonsQuery = lessonsRef.where(
    firebase.firestore.FieldPath.documentId(),
    'in',
    selectedCourse?.lessonIds || ['1']
  );
  const [lessons, fetchingLessons] = useCollectionData<Lesson>(lessonsQuery, { idField: 'id' });

  const selectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const getCourseById = (id: string) => {
    return ownCourses?.find((item) => item.id === id) || ({} as Course);
  };

  const getLessonById = (id: string) => {
    return lessons?.find((item) => item.id === id) || ({} as Lesson);
  };

  console.log({ allCourses, allPrograms, ownCourses, ownPrograms });

  return (
    <StudentContext.Provider
      value={{
        fetching: fetchingCourses || fetchingPrograms || fetchingLessons,
        ownCourses: ownCourses || [],
        ownPrograms: ownPrograms || [],
        allCourses: allCourses || [],
        allPrograms: allPrograms || [],
        lessons: lessons || [],
        error: false,
        selectedCourse,
        selectCourse,
        getCourseById,
        getLessonById,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
