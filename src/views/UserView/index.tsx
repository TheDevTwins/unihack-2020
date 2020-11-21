import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import CourseList from './CoursesList';

const UserView: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path={`/programs`}>programs</Route>
        <Route path={`/courses`}>
          <CourseList />
        </Route>
        <Route path={`/discover`}>discover</Route>
        <Redirect to={`/programs`} />
      </Switch>
    </div>
  );
};

export default UserView;
