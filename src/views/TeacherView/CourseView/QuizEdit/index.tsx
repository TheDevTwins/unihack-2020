import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Input, Form, Button, Space } from 'antd';

import { TeacherContext } from 'contexts';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons/lib';

const QuizEdit: React.FC = () => {
  const { getQuizById, updateQuiz } = useContext(TeacherContext);
  const { quizId } = useParams<{ quizId: string }>();

  const [form] = Form.useForm();

  const quiz = getQuizById(quizId);

  if (!quiz) return null;

  const initialValues = {
    ...quiz,
    questions: quiz.questions?.map((q) => {
      const [wrongAnswer1, wrongAnswer2, wrongAnswer3] = q.otherAnswers;
      return { ...q, wrongAnswer1, wrongAnswer2, wrongAnswer3 };
    }),
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={() => {
          const data = form.getFieldsValue();
          data.questions = data.questions.map((q: any) => {
            const obj = {
              ...q,
              otherAnswers: [q.wrongAnswer1, q.wrongAnswer2, q.wrongAnswer3].filter((el) => !!el),
            };
            delete obj.wrongAnswer1;
            delete obj.wrongAnswer2;
            delete obj.wrongAnswer3;

            return obj;
          });
          updateQuiz(quizId, data);
        }}
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.List name="questions">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field) => (
                  <Space key={field.key}>
                    <Form.Item
                      name={[field.name, 'description']}
                      label="Description"
                      rules={[{ required: true }]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'correctAnswer']}
                      label="Correct answer"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'wrongAnswer1']}
                      label="Wrong answer"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name={[field.name, 'wrongAnswer2']} label="Wrong answer">
                      <Input />
                    </Form.Item>
                    <Form.Item name={[field.name, 'wrongAnswer3']} label="Wrong answer">
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button onClick={() => add()}>
                    <PlusOutlined />
                    Add question
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Button onClick={() => form.submit()}>Save changes</Button>
      </Form>
    </div>
  );
};

export default QuizEdit;
