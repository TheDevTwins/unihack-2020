import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { TextEditor } from 'components';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <TextEditor initialValue={'<div></div>'} onSave={() => {}} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
