import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { UserContext } from 'contexts';

import LoginMock from './views/LoginMock';
import UserView from './views/UserView';

const Routes: React.FC = () => {
  const { user, logout } = useContext(UserContext);

  const LoginEnforcer = (
    <>
      <Route path="/login">
        <LoginMock />
      </Route>
      <Redirect to="/login" />
    </>
  );

  const Content = (
    <>
      <Route exact path="/">
        <UserView />
      </Route>
      <Redirect to="/" />
    </>
  );

  return (
    <BrowserRouter>
      <Switch>{user ? Content : LoginEnforcer}</Switch>
    </BrowserRouter>
  );
};

export default Routes;
