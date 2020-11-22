import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { StudentContext } from 'contexts';

const LessonList: React.FC = () => {
  const { lessons, selectedCourse } = useContext(StudentContext);
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div>
      <h1>{selectedCourse.title}</h1>
      <h3>Lessons:</h3>
      <ul className="list">
        {lessons.map((lesson) => (
          <li className="list__item" key={lesson.id}>
            <Link className="list__link" to={`/courses/${courseId}/lessons/${lesson.id}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
