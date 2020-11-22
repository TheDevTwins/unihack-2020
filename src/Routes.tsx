import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { UserContext, STUDENT, TEACHER, ORGANIZATION } from 'contexts';

import Login from './views/Login';
import UserView from './views/UserView';
import TeacherView from './views/TeacherView';
import OrganizationView from './views/OrganizationView';

const Routes: React.FC = () => {
  const { user, loading } = useContext(UserContext);
  const userType = user?.userType;

  if (loading) return <p>loading</p>;

  const LoginEnforcer = (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );

  const Content = (
    <Switch>
      <Route path="/">
        {userType === STUDENT && <UserView />}
        {userType === TEACHER && <TeacherView />}
        {userType === ORGANIZATION && <OrganizationView />}
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return <BrowserRouter>{user ? Content : LoginEnforcer}</BrowserRouter>;
};

export default Routes;
