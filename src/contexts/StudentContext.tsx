import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, Program } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';

type ContextProps = {
  fetching: boolean;
  allCourses: Course[];
  allPrograms: Program[];
  error: any;
};

export const StudentContext = createContext<ContextProps>({} as ContextProps);

export const StudentProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  const coursesRef = projectFirestore.collection('courses');
  const [courses, fetchingCourses] = useCollectionData<Course>(coursesRef.limit(10), {
    idField: 'id',
  });

  const programsRef = projectFirestore.collection('programs');
  const [programs, fetchingPrograms] = useCollectionData<Program>(programsRef.limit(10), {
    idField: 'id',
  });

  console.log({ courses, programs });

  return (
    <StudentContext.Provider
      value={{
        fetching: fetchingCourses || fetchingPrograms,
        allCourses: courses || [],
        allPrograms: programs || [],
        error: false,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
