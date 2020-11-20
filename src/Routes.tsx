import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoginMock from './views/LoginMock';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginMock />
        </Route>
        <Route exact path="/">
          <h1>Hello unihack</h1>
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
