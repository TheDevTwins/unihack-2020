import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { StudentContext } from 'contexts';

const ProgramView: React.FC = () => {
  const { allCourses, getProgramById } = useContext(StudentContext);
  const { programId } = useParams<{ programId: string }>();

  const program = getProgramById(programId);

  if (!program) return null;

  const courses = allCourses.filter((item) => program.courseIds.includes(item.id));

  return (
    <div>
      <h1>{program.title}</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramView;
