import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';

type ContextProps = {
  fetching: boolean;
  ownCourses: Course[];
  error: any;
  createCourse: (title: string) => void;
  updateCourseDetails: (id: string, data: Partial<Course>) => void;
  getCourseById: (id: string) => Course;
};

export const TeacherContext = createContext<ContextProps>({} as ContextProps);

export const TeacherProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const creatorUid = user.uid;

  const coursesRef = projectFirestore.collection('courses');
  const query = coursesRef.where('creatorUid', '==', creatorUid);
  const [ownCourses, fetching, error] = useCollectionData<Course>(query, { idField: 'id' });

  const createCourse = async (title: string) => {
    const newCourseRef = projectFirestore.collection('courses').doc();
    await newCourseRef.set({ title });
  };

  const updateCourseDetails = async (id: string, data: Partial<Course>) => {
    const courseRef = projectFirestore.doc(`/courses/${id}`);
    await courseRef.update(data);
  };

  const getCourseById = (id: string) => {
    return ownCourses?.find((item) => item.id === id) || ({} as any);
  };

  return (
    <TeacherContext.Provider
      value={{
        fetching,
        ownCourses: ownCourses || [],
        error,
        createCourse,
        updateCourseDetails,
        getCourseById,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
