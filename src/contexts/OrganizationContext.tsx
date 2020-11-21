import React, { createContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Course } from './types';

import { projectFirestore } from 'firebase_config';

type ContextProps = {
  fetching: boolean;
  courses: Course[];
  error: any;
};

export const OrganizationContext = createContext<ContextProps>({} as ContextProps);

export const OrganizationProvider: React.FC = ({ children }) => {
  const coursesRef = projectFirestore.collection('courses');
  const query = coursesRef.limit(10);
  const [courses, fetching, error] = useCollectionData<Course>(query, { idField: 'id' });

  return (
    <OrganizationContext.Provider
      value={{
        fetching,
        courses: courses || [],
        error,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
