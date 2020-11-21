import React, { useContext } from 'react';

import {
  UserContext,
  STUDENT,
  TEACHER,
  ORGANIZATION,
  StudentProvider,
  TeacherProvider,
  OrganizationProvider,
} from 'contexts';

const UserTypeContextProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <div>{children}</div>;

  switch (user.userType) {
    case STUDENT:
      return <StudentProvider>{children}</StudentProvider>;
    case TEACHER:
      return <TeacherProvider>{children}</TeacherProvider>;
    case ORGANIZATION:
      return <OrganizationProvider>{children}</OrganizationProvider>;
    default:
      return <p>invalid userType "{user.userType}"</p>;
  }
};

export default UserTypeContextProvider;
