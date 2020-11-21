import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

import { StudentContext } from 'contexts';

import LessonList from './LessonList';
import LessonView from './LessonView';

const CourseView: React.FC = () => {
  const { fetching, selectCourse, selectedCourse } = useContext(StudentContext);
  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    !fetching && selectCourse(courseId);
  }, [fetching]);

  if (fetching) return null;

  if (!selectedCourse) return null;

  return (
    <Switch>
      <Route path={'/courses/:courseId/lessons/:lessonId'}>
        <LessonView />
      </Route>
      <Route path={'/courses/:courseId'}>
        <div>
          <LessonList />
        </div>
      </Route>
    </Switch>
  );
};

export default CourseView;
