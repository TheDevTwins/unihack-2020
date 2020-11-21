import React, { useContext } from 'react';

import { TeacherContext } from 'contexts';

import CourseDetails from './CourseDetails';
import PageList from './PageList';

const CourseView: React.FC = () => {
  const { fetching } = useContext(TeacherContext);

  if (fetching) return null;

  return (
    <div>
      <CourseDetails /> <PageList />
    </div>
  );
};

export default CourseView;
