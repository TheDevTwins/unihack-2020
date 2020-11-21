import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Pagination } from 'antd';

import { StudentContext } from 'contexts';
import QuestionView from './QuestionView';

const QuizView: React.FC = () => {
  const { getQuizById } = useContext(StudentContext);
  const { quizId } = useParams<{ quizId: string }>();
  const quiz = getQuizById(quizId);

  const [answers, setAnswers] = useState(Array<string>(quiz?.questions.length).fill(''));
  const [questionIndex, setQuestionIndex] = useState(0);

  if (!quiz) return <div>Loading...</div>;

  const handleAnswer = (answer: string) => {
    setAnswers([
      ...answers.slice(0, questionIndex),
      answer,
      ...answers.slice(questionIndex + 1, answers.length),
    ]);
  };

  return (
    <div className="quiz">
      <h3 className="quiz__title">{quiz.title}</h3>
      <QuestionView
        question={quiz.questions[questionIndex]}
        prevAnswer={answers[questionIndex]}
        answerHandler={handleAnswer}
      />
      <Pagination
        current={questionIndex + 1}
        onChange={(page) => setQuestionIndex(page - 1)}
        pageSize={1}
        total={quiz.questions.length}
      />
    </div>
  );
};

export default QuizView;
