import React, { useContext } from 'react';

import Routes from './Routes';

import { LoadingWrapper } from 'components';
import { UserContext, StudentContext, TeacherContext, OrganizationContext } from 'contexts';

function App() {
  const { loading: userLoading } = useContext(UserContext);
  const { fetching: studentFetching } = useContext(StudentContext);
  const { fetching: teacherFetching } = useContext(TeacherContext);
  const { fetching: organizationFetching } = useContext(OrganizationContext);

  const loading = userLoading || studentFetching || teacherFetching || organizationFetching;

  return (
    <div className="App">
      <LoadingWrapper overwriteScreen loading={loading}>
        <Routes />
      </LoadingWrapper>
    </div>
  );
}

export default App;
