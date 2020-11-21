import React, { useContext, useState } from 'react';

import { OrganizationContext } from 'contexts';
import { Button, Input, Select } from 'antd';

const CreateProgram: React.FC = () => {
  const [title, setTitle] = useState('');
  const [courseList, setCourseList] = useState<string[]>([]);

  const { courses, createProgram } = useContext(OrganizationContext);

  return (
    <div className="orgView__create">
      <Input onChange={(e) => setTitle(e.target.value)} placeholder="Program title" />

      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Select courses to include"
        defaultValue={[]}
        value={courseList}
        onChange={setCourseList}
      >
        {courses.map((course) => {
          return (
            <Select.Option key={course.id} value={course.id}>
              {course.title}
            </Select.Option>
          );
        })}
      </Select>

      <Button
        disabled={!(title && courseList.length)}
        className="submit"
        onClick={() => {
          createProgram(title, courseList);
          console.log('works');
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateProgram;
