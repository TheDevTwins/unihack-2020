import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TeacherContext } from 'contexts';
import { Button } from 'antd';

const QuizList: React.FC = () => {
  const { quizzes, createQuiz, selectedCourse } = useContext(TeacherContext);

  return (
    <div>
      <h3>Quizzes</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/courses/${selectedCourse.id}/quizzes/${quiz.id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
      <Button onClick={() => createQuiz(selectedCourse.id)}>Create new quiz</Button>
    </div>
  );
};

export default QuizList;