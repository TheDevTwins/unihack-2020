import React, { useContext } from 'react';

import { UserContext, TeacherProvider, STUDENT, StudentProvider } from 'contexts';

import { TEACHER } from './types';

const UserTypeContextProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <div>{children}</div>;

  switch (user.userType) {
    case STUDENT:
      return <StudentProvider>{children}</StudentProvider>;
    case TEACHER:
      return <TeacherProvider>{children}</TeacherProvider>;
    default:
      return <p>invalid userType "{user.userType}"</p>;
  }
};

export default UserTypeContextProvider;
