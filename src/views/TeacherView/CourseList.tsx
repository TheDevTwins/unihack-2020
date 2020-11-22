import React, { useContext } from 'react';

import { TeacherContext } from 'contexts';

import { CardList } from 'reusable';

const CourseList: React.FC = () => {
  const { ownCourses, createCourse, deleteCourse } = useContext(TeacherContext);

  return (
    <CardList
      dataSource={ownCourses}
      cardName="course"
      onCreate={createCourse}
      editUrl={(id) => `/courses/${id}`}
      onDelete={deleteCourse}
    />
  );
};

export default CourseList;
