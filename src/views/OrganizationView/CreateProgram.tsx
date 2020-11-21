import React, { useContext, useState } from 'react';

import { Program, Course, OrganizationContext } from 'contexts';
import { Input, Select } from 'antd';
import { create } from 'domain';

const CreateProgram: React.FC = () => {
  const [title, setTitle] = useState('');
  const [courseList, setCourseList] = useState<string[]>([]);

  const { courses, createProgram } = useContext(OrganizationContext);

  return (
    <div className="orgView__create">
      <Input onChange={(e) => setTitle(e.target.value)} placeholder="Program title"></Input>

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

      {/*  */}
      <button
        disabled={!(title && courseList.length)}
        className="submit"
        onClick={() => {
          createProgram(title, courseList);
          console.log('works');
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateProgram;
