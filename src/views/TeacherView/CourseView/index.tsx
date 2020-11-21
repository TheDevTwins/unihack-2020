import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { TeacherContext } from 'contexts';

import CourseDetails from './CourseDetails';
import LessonList from './LessonList';
import LessonEdit from './LessonEdit';

const CourseView: React.FC = () => {
  const { fetching } = useContext(TeacherContext);

  if (fetching) return null;

  return (
    <Switch>
      <Route path={'/courses/:courseId/lessons/:lessonId'}>
        <LessonEdit />
      </Route>
      <Route path={'/courses/:courseId'}>
        <div>
          <CourseDetails /> <LessonList />
        </div>
      </Route>
    </Switch>
  );
};

export default CourseView;
