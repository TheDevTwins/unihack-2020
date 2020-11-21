import { Radio } from 'antd';
import { Question } from 'contexts';
import React from 'react';

type props = {
  question: Question;
  answerHandler: (answer: string) => void;
};

const QuestionView: React.FC<props> = ({ question, answerHandler }) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const answers = [question.correctAnswer, ...question.otherAnswers];
  answers.sort(() => Math.random() - 0.5);

  return (
    <div className="question">
      <div className="question__description">{question.description}</div>

      <Radio.Group className="question__answerList">
        {answers.map((answer, i) => {
          return (
            <Radio key={i} style={radioStyle} value={i} onClick={() => answerHandler(answer)}>
              {answer}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default QuestionView;
