import { Radio } from 'antd';
import { Question } from 'contexts';
import React, { useEffect, useState } from 'react';

type props = {
  question: Question;
  answerHandler: (answer: string) => void;
  prevAnswer: string;
  finished: boolean;
};

const QuestionView: React.FC<props> = ({ question, answerHandler, prevAnswer, finished }) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const { answers } = question;

  let prevAnswerIndex: any = answers.indexOf(prevAnswer);
  prevAnswerIndex = prevAnswerIndex === -1 ? undefined : prevAnswerIndex;

  return (
    <div className="question">
      <div className="question__description">{question.description}</div>

      <Radio.Group className="question__answerList" value={prevAnswerIndex} disabled={finished}>
        {answers.map((answer, i) => {
          const style: any = { ...radioStyle };

          if (finished) {
            if (prevAnswerIndex === i) {
              if (prevAnswer === question.correctAnswer) style['backgroundColor'] = 'green';
              else style['backgroundColor'] = 'red';
            }
            if (answer === question.correctAnswer) style['backgroundColor'] = 'green';
          }

          return (
            <Radio key={i} style={style} value={i} onClick={() => answerHandler(answer)}>
              {answer}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default QuestionView;
