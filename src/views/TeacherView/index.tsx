import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from 'components';
import CourseList from './CourseList';
import CourseView from './CourseView';

const TeacherView: React.FC = () => {
  return (
    <div>
      <Header
        buttons={[
          {
            text: 'Courses',
            url: '/courses',
          },
        ]}
      />
      <Switch>
        <Route path={`/courses/:courseId`}>
          <CourseView />
        </Route>
        <Route path={`/courses`}>
          <CourseList />
        </Route>
        <Redirect to={`/courses`} />
      </Switch>
    </div>
  );
};

export default TeacherView;
