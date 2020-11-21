import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Input, Form, Button } from 'antd';

import { TeacherContext } from 'contexts';

const QuizEdit: React.FC = () => {
  const { getQuizById, updateQuiz } = useContext(TeacherContext);
  const { quizId } = useParams<{ quizId: string }>();

  const [form] = Form.useForm();

  const quiz = getQuizById(quizId);

  if (!quiz) return null;

  return (
    <div>
      <Form
        form={form}
        initialValues={quiz}
        onFinish={() => {
          const data = form.getFieldsValue();
          updateQuiz(quizId, data);
        }}
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Button onClick={() => form.submit()}>Save changes</Button>
      </Form>
    </div>
  );
};

export default QuizEdit;
