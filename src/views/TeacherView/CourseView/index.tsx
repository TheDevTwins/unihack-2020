import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import { TeacherContext } from 'contexts';

import CourseDetails from './CourseDetails';
import LessonList from './LessonList';
import LessonEdit from './LessonEdit';

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { fetching, selectCourse, selectedCourse } = useContext(TeacherContext);

  useEffect(() => {
    !fetching && selectCourse(courseId);
  }, [fetching]);

  if (fetching) return null;

  if (!selectedCourse) return null;

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
