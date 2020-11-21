import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Form, Input, InputNumber, Select } from 'antd';

import { TeacherContext } from 'contexts';

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, updateCourseDetails, fetching } = useContext(TeacherContext);

  const course = getCourseById(courseId);

  const [form] = Form.useForm();

  if (fetching) return null;

  const initialValues = { ...course, tags: course.tags.join(',') };

  return (
    <div>
      <br />
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={() => {
          const data = form.getFieldsValue() as any;
          data.tags = data.tags.split(',');
          updateCourseDetails(courseId, data);
        }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="tags" label="Tags (comma separated)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="duration" label="Duration (h)" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="difficulty" label="Difficulty" rules={[{ required: true }]}>
          <Select>
            <Select.Option value={0}>Easy</Select.Option>
            <Select.Option value={1}>Medium</Select.Option>
            <Select.Option value={2}>Hard</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="thumbnailUrl" label="Thumbnail URL" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" onClick={() => form.submit()}>
          Finish
        </Button>
      </Form>
    </div>
  );
};

export default CourseView;
