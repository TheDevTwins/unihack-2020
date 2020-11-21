import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, Program } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';
import firebase from 'firebase';

type ContextProps = {
  fetching: boolean;
  ownCourses: Course[];
  ownPrograms: Program[];
  allCourses: Course[];
  allPrograms: Program[];
  error: any;
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

  console.log({ allCourses, allPrograms, ownCourses, ownPrograms });

  return (
    <StudentContext.Provider
      value={{
        fetching: fetchingCourses || fetchingPrograms,
        ownCourses: ownCourses || [],
        ownPrograms: ownPrograms || [],
        allCourses: allCourses || [],
        allPrograms: allPrograms || [],
        error: false,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
