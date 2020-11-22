import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from 'reusable';
import CourseList from './CourseList';
import ProgramList from './ProgramList';
import ProgramView from './ProgramView';
import Browser from './Browser';
import CourseView from './CourseView';

const UserView: React.FC = () => {
  return (
    <div className="userView">
      <Header
        buttons={[
          {
            text: 'Programs',
            url: '/programs',
          },
          {
            text: 'Courses',
            url: '/courses',
          },
          {
            text: 'Discover new',
            url: '/discover',
          },
        ]}
      />

      <div className="wrapper">
        <Switch>
          <Route path={`/programs/:programId`}>
            <ProgramView />
          </Route>
          <Route path={`/programs`}>
            <ProgramList />
          </Route>
          <Route path={`/courses/:courseId`}>
            <CourseView />
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
