import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from 'components';
import CourseList from './CourseList';

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
        <Route path={`/courses/:courseId`}>access course</Route>
        <Route path={`/courses`}>
          <CourseList />
        </Route>
        <Redirect to={`/courses`} />
      </Switch>
    </div>
  );
};

export default TeacherView;
