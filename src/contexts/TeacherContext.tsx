import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';

type ContextProps = {
  fetching: boolean;
  courses: Course[];
  error: any;
  createCourse: (title: string) => void;
  updateCourseDetails: (id: string, data: Partial<Course>) => void;
};

export const TeacherContext = createContext<ContextProps>({} as ContextProps);

export const TeacherProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const creatorUid = user.uid;

  const coursesRef = projectFirestore.collection('courses');
  const query = coursesRef.where('creatorUid', '==', creatorUid);
  const [courses, fetching, error] = useCollectionData<Course>(query, { idField: 'id' });

  const createCourse = async (title: string) => {
    const newCourseRef = projectFirestore.collection('courses').doc();
    await newCourseRef.set({ title });
  };

  const updateCourseDetails = async (id: string, data: Partial<Course>) => {
    const courseRef = projectFirestore.doc(`/courses/${id}`);
    await courseRef.update(data);
  };

  return (
    <TeacherContext.Provider
      value={{
        fetching,
        courses: courses || [],
        error,
        createCourse,
        updateCourseDetails,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
