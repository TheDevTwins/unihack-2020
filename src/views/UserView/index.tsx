import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from 'components';
import CourseList from './CoursesList';
import ProgramsList from './ProgramsList';

const UserView: React.FC = () => {
  return (
    <div>
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
      <Switch>
        <Route path={`/programs`}>
          <ProgramsList />
        </Route>
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
