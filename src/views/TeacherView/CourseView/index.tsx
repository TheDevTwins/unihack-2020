import React, { useContext } from 'react';

import { TeacherContext } from 'contexts';

import CourseDetails from './CourseDetails';
import LessonList from './LessonList';

const CourseView: React.FC = () => {
  const { fetching } = useContext(TeacherContext);

  if (fetching) return null;

  return (
    <div>
      <CourseDetails /> <LessonList />
    </div>
  );
};

export default CourseView;
