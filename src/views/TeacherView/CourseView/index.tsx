import React, { useContext, useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

import { TeacherContext } from 'contexts';

import CourseDetails from './CourseDetails';
import LessonList from './LessonList';
import LessonEdit from './LessonEdit';
import QuizList from './QuizList';
import QuizEdit from './QuizEdit';

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { fetching, selectCourse, selectedCourse } = useContext(TeacherContext);

  useEffect(() => {
    !fetching && selectCourse(courseId);
  }, [fetching]);

  if (fetching) return null;

  if (!selectedCourse) return null;

  return (
    <div className="wrapper">
      <Switch>
        <Route path={'/courses/:courseId/lessons/:lessonId'}>
          <LessonEdit />
        </Route>
        <Route path={'/courses/:courseId/quizzes/:quizId'}>
          <QuizEdit />
        </Route>
        <Route path={'/courses/:courseId'}>
          <div>
            <CourseDetails /> <LessonList /> <QuizList />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default CourseView;
