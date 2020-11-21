import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from 'components';
import CourseList from './CourseList';
import ProgramsList from './ProgramsList';
import Browser from './Browser';
import CourseView from './CourseView';
import QuizView from './CourseView/QuizView';

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
          <Route path={`/programs`}>
            <ProgramsList />
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
