import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { UserContext } from 'contexts';

import LoginMock from './views/LoginMock';

const Routes: React.FC = () => {
  const { user } = useContext(UserContext);

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
        <h1>Hello unihack</h1>
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
