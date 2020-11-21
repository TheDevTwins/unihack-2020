import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import CourseList from './CoursesList';
import ProgramsList from './ProgramsList';
import Browser from './Browser';

const UserView: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route path={`/programs`}>
            <ProgramsList />
          </Route>
          <Route path={`/courses`}>
            <CourseList />
          </Route>
          <Route path={`/discover`}>
            <Browser />
          </Route>
          <Redirect to={`/programs`} />
        </Switch>
      </div>
    </div>
  );
};

export default UserView;
