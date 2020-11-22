import React, { useContext } from 'react';

import { Button, Form, Input, InputNumber, Select } from 'antd';

import { TeacherContext } from 'contexts';

const CourseDetails: React.FC = () => {
  const { selectedCourse, updateCourseDetails } = useContext(TeacherContext);

  const [form] = Form.useForm();

  const initialValues = { ...selectedCourse, tags: selectedCourse.tags?.join(',') };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={() => {
        const data = form.getFieldsValue() as any;
        data.tags = data.tags.split(',');
        updateCourseDetails(selectedCourse.id, data);
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
      <Form.Item name="price" label="Price $" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Button type="primary" onClick={() => form.submit()}>
        Save details
      </Button>
    </Form>
  );
};

export default CourseDetails;
