import React, { createContext, useEffect, useState, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, Lesson } from './types';

import { UserContext } from './UserContext';
import { projectFirestore } from 'firebase_config';
import firebase from 'firebase';

type ContextProps = {
  fetching: boolean;
  ownCourses: Course[];
  lessons: Lesson[];
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
  const ownCoursesQuery = coursesRef.where('creatorUid', '==', creatorUid);
  const [ownCourses, fetchingOwnCourses] = useCollectionData<Course>(ownCoursesQuery, {
    idField: 'id',
  });

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const selectedCourse = ownCourses?.find((item) => item.id === selectedCourseId) || ({} as Course);

  const lessonsRef = projectFirestore.collection('lessons');
  const lessonsQuery = lessonsRef.where(
    firebase.firestore.FieldPath.documentId(),
    'in',
    selectedCourse.lessonIds || ['1']
  );
  const [lessons, fetchingLessons] = useCollectionData<Lesson>(lessonsQuery, { idField: 'id' });

  const createCourse = async (title: string) => {
    const newCourseRef = projectFirestore.collection('courses').doc();
    await newCourseRef.set({ title });
  };

  const updateCourseDetails = async (id: string, data: Partial<Course>) => {
    const courseRef = projectFirestore.doc(`/courses/${id}`);
    await courseRef.update(data);
  };

  const getCourseById = (id: string) => {
    const course = ownCourses?.find((item) => item.id === id) || ({} as Course);
    setSelectedCourseId(course.id);
    return course;
  };

  return (
    <TeacherContext.Provider
      value={{
        fetching: fetchingLessons || fetchingOwnCourses,
        ownCourses: ownCourses || [],
        lessons: lessons || [],
        error: false,
        createCourse,
        updateCourseDetails,
        getCourseById,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
