import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { UserContext } from 'contexts';

import LoginMock from './views/LoginMock';
import UserView from './views/UserView';

const Routes: React.FC = () => {
  const { user, loading } = useContext(UserContext);

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
        <UserView />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return <BrowserRouter>{user ? Content : LoginEnforcer}</BrowserRouter>;
};

export default Routes;
