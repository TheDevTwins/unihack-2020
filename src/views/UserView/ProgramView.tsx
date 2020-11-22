import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { StudentContext } from 'contexts';
import { CardList } from 'reusable';

const ProgramView: React.FC = () => {
  const { allCourses, getProgramById } = useContext(StudentContext);
  const { programId } = useParams<{ programId: string }>();

  const program = getProgramById(programId);

  if (!program) return null;

  const courses = allCourses.filter((item) => program.courseIds.includes(item.id));

  return <CardList dataSource={courses} cardName="course" enterUrl={(id) => `/courses/${id}`} />;
};

export default ProgramView;
