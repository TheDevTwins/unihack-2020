import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { UserContext, STUDENT, TEACHER, ORGANIZATION } from 'contexts';

import LoginMock from './views/LoginMock';
import UserView from './views/UserView';
import TeacherView from './views/TeacherView';
import OrganizationView from './views/OrganizationView';

const Routes: React.FC = () => {
  const { user, loading } = useContext(UserContext);
  const user_type = user?.user_type;

  if (loading) return <p>loading</p>;

  const LoginEnforcer = (
    <Switch>
      <Route path="/login">
        <LoginMock />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );

  const Content = (
    <Switch>
      <Route path="/">
        {user_type === STUDENT && <UserView />}
        {user_type === TEACHER && <TeacherView />}
        {user_type === ORGANIZATION && <OrganizationView />}
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return <BrowserRouter>{user ? Content : LoginEnforcer}</BrowserRouter>;
};

export default Routes;
