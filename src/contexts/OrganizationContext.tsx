import React, { createContext, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course, User } from './types';

import { projectFirestore } from 'firebase_config';

import { UserContext } from './UserContext';

type ContextProps = {
  fetching: boolean;
  courses: Course[];
  teachers: User[];
  error: any;
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

  return (
    <OrganizationContext.Provider
      value={{
        fetching: fetchingCourses || fetchingUsers,
        courses: courses || [],
        teachers: teachers || [],
        error: false,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
