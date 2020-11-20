import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import UserView from './views/UserView';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UserView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
