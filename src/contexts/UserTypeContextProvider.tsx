import React, { useContext } from 'react';

import { UserContext, TeacherProvider, STUDENT, StudentProvider } from 'contexts';

import { TEACHER } from './types';

const UserTypeContextProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <div>{children}</div>;

  switch (user.user_type) {
    case STUDENT:
    case 0:
      return <StudentProvider>{children}</StudentProvider>;
    case TEACHER:
      return <TeacherProvider>{children}</TeacherProvider>;
    default:
      return <p>invalid user_type "{user.user_type}"</p>;
  }
};

export default UserTypeContextProvider;
