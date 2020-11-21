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
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>{lesson.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
