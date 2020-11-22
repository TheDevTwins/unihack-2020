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
      <ul className="list">
        {courses.map((course) => (
          <li className="list__item" key={course.id}>
            <Link className="list__link" to={`/courses/${course.id}`}>
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramView;
