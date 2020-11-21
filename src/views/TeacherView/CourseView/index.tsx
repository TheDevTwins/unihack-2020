import React, { useContext } from 'react';

import CourseDetails from './CourseDetails';
import { TeacherContext } from 'contexts';

const CourseView: React.FC = () => {
  const { fetching } = useContext(TeacherContext);

  if (fetching) return null;

  return <div><CourseDetails/></div>
}

export default CourseView
