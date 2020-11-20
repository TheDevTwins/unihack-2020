import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Editor from './Views/Editor';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Editor initialValue={'<div></div>'} onSave={(s: string) => {}} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
