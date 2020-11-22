import React, { useContext } from 'react';

import { StudentContext } from 'contexts';

import { CardList } from 'reusable';

const CourseList: React.FC = () => {
  const { ownCourses, removeCourse } = useContext(StudentContext);

  return (
    <CardList
      dataSource={ownCourses}
      cardName="course"
      onDelete={removeCourse}
      enterUrl={(id) => `/courses/${id}`}
    />
  );
};

export default CourseList;
