import React, { createContext, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, Program, User } from './types';

import { projectFirestore } from 'firebase_config';

import { UserContext } from './UserContext';

type ContextProps = {
  fetching: boolean;
  courses: Course[];
  teachers: User[];
  ownPrograms: Program[];
  error: any;
  createProgram: (title: string, courseIds: string[]) => void;
  updateProgramDetails: (id: string, data: Partial<Program>) => void;
};

export const OrganizationContext = createContext<ContextProps>({} as ContextProps);

export const OrganizationProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  const coursesRef = projectFirestore.collection('courses');
  const coursesQuery = coursesRef.where('organizationId', '==', user.uid);
  const [courses, fetchingCourses] = useCollectionData<Course>(coursesQuery, { idField: 'id' });

  const usersRef = projectFirestore.collection('users');
  const teachersQuery = usersRef.where('organizationId', '==', user.uid);
  const [teachers, fetchingUsers] = useCollectionData<User>(teachersQuery, { idField: 'id' });

  const programsRef = projectFirestore.collection('programs');
  const programsQuery = programsRef.where('organizationId', '==', user.uid);
  const [ownPrograms, fetchingPrograms] = useCollectionData<Program>(programsQuery, {
    idField: 'id',
  });

  const createProgram = async (title: string, courseIds: string[]) => {
    const newCourseRef = projectFirestore.collection('programs').doc();
    await newCourseRef.set({ title, creatorUid: user.uid, organizationId: user.uid, courseIds });
  };

  const updateProgramDetails = async (id: string, data: Partial<Program>) => {
    const programRef = projectFirestore.doc(`/programs/${id}`);
    await programRef.update(data);
  };

  return (
    <OrganizationContext.Provider
      value={{
        fetching: fetchingCourses || fetchingUsers || fetchingPrograms,
        courses: courses || [],
        teachers: teachers || [],
        ownPrograms: ownPrograms || [],
        error: false,
        createProgram,
        updateProgramDetails,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
