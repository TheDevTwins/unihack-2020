import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Pagination } from 'antd';

import { StudentContext } from 'contexts';
import QuestionView from './QuestionView';

const QuizView: React.FC = () => {
  const { quizzes } = useContext(StudentContext);
  const { quizId } = useParams<{ quizId: string }>();

  const quiz = quizzes.find((item) => item.id === quizId) || (undefined as any);

  const [answers, setAnswers] = useState(Array<string>(quiz?.questions.length).fill(''));
  const [questionIndex, setQuestionIndex] = useState(0);

  const [finished, setFinished] = useState(false);

  if (!quiz) return <div>Loading...</div>;

  const handleAnswer = (answer: string) => {
    setAnswers([
      ...answers.slice(0, questionIndex),
      answer,
      ...answers.slice(questionIndex + 1, answers.length),
    ]);
  };

  const totalQuestions = quiz.questions.length;
  const correctCount = answers.reduce(
    (acc, curr, index) => acc + Number(curr === quiz.questions[index].correctAnswer),
    0
  );
  const score = ((correctCount / totalQuestions) * 100).toFixed(2);

  return (
    <div className="quiz">
      <h3 className="quiz__title">{quiz.title}</h3>
      <QuestionView
        question={quiz.questions[questionIndex]}
        prevAnswer={answers[questionIndex]}
        answerHandler={handleAnswer}
        finished={finished}
      />
      <Pagination
        current={questionIndex + 1}
        onChange={(page) => setQuestionIndex(page - 1)}
        pageSize={1}
        total={quiz.questions.length}
      />
      <br />
      <Button type="primary" onClick={() => setFinished(true)}>
        Finish Quiz
      </Button>
      {finished && (
        <div>
          Your results: {correctCount}/{totalQuestions} ({score}%)
        </div>
      )}
    </div>
  );
};

export default QuizView;
