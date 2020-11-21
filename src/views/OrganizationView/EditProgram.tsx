import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Form, Input, InputNumber, Select } from 'antd';

import { OrganizationContext } from 'contexts';

const CourseDetails: React.FC = () => {
  const { getProgramById, updateProgramDetails } = useContext(OrganizationContext);

  const [form] = Form.useForm();

  const { programId } = useParams<{ programId: string }>();
  const selectedProgram = getProgramById(programId);

  if (!selectedProgram) return <div>Loading...</div>;

  const initialValues = { ...selectedProgram, tags: selectedProgram.tags?.join(',') };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={() => {
        const data = form.getFieldsValue() as any;
        data.tags = data.tags.split(',');
        updateProgramDetails(selectedProgram.id, data);
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
      <Form.Item name="duration" label="Duration (months)" rules={[{ required: true }]}>
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
        Save details
      </Button>
    </Form>
  );
};

export default CourseDetails;
