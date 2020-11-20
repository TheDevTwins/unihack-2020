import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';

type ContextProps = {
  fetching: boolean;
  courses: Course[];
  error: any;
};

export const TeacherContext = createContext<ContextProps>({} as ContextProps);

export const TeacherProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const creatorUid = user.uid;

  const coursesRef = projectFirestore.collection('courses');
  const query = coursesRef.where('creatorUid', '==', creatorUid);
  const [courses, fetching, error] = useCollectionData<Course>(query);

  return (
    <TeacherContext.Provider
      value={{
        fetching,
        courses: courses || [],
        error,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
