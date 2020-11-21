import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { StudentContext } from 'contexts';

const LessonList: React.FC = () => {
  const { quizzes, selectedCourse } = useContext(StudentContext);
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div>
      <h1>{selectedCourse.title}</h1>
      <h3>Quizzes:</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/courses/${courseId}/quizzes/${quiz.id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
