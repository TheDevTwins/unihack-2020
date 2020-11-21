import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { List, Select } from 'antd';
import { StudentContext } from 'contexts';
import React, { useContext, useState } from 'react';

import { Course, EASY, HARD, MEDIUM, Program } from '../../contexts/types';

const Browser: React.FC = () => {
  const data = useContext(StudentContext);
  const [dataType, setDataType] = useState('Programs');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(-1);

  const courseTags: string[] = [];
  const programTags: string[] = [];

  [
    { input: data.allCourses, arr: courseTags },
    { input: data.allPrograms, arr: programTags },
  ].forEach((pair) => {
    pair.input.forEach((course: Course | Program) => {
      course.tags.forEach((tag) => {
        if (!pair.arr.includes(tag)) {
          pair.arr.push(tag);
        }
      });
    });
    pair.arr.sort();
  });

  // get current variables
  const currentTags = dataType === 'Programs' ? programTags : courseTags;
  const currentData = dataType === 'Programs' ? data.allPrograms : data.allCourses;

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makeListItem = (item: Course) => {
    return (
      <div className="listItem">
        <img src={item.thumbnailUrl} alt="" className="listItem__img" />
        <div className="listItem__content">
          <div className="listItem__tags">{item.tags.join(' - ')}</div>
          <div className="listItem__title">{item.title}</div>
          <div className="listItem__stats">
            <div className="listItem__stat">
              <BarChartOutlined />
              {DIFFICULTIES[item.difficulty]}
            </div>
            <div className="listItem__stat">
              <ClockCircleOutlined />
              {item.duration}
            </div>
          </div>
          <div className="listItem__description">{item.description}</div>
        </div>
      </div>
    );
  };

  const filterData: any = () => {
    return (currentData as any).filter(
      ({ difficulty, tags }: { difficulty: number; tags: string }) => {
        let result = true;
        if (selectedTag !== '') {
          result = result && tags.includes(selectedTag);
        }
        if (selectedDifficulty !== -1) {
          result = result && difficulty === selectedDifficulty;
        }
        return result;
      }
    );
  };

  return (
    <div className="Browser">
      {/* Select data type */}
      <Select
        defaultValue={dataType}
        showSearch
        style={{ width: 200 }}
        placeholder="Select item type"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={setDataType}
      >
        <Select.Option value={'Programs'}>Programs</Select.Option>
        <Select.Option value={'Courses'}>Courses</Select.Option>
      </Select>

      {/* Select by tag */}
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Sort by tag"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={(a) => setSelectedTag(a as any)}
      >
        {currentTags.map((tag) => {
          return <Select.Option value={tag}>{tag}</Select.Option>;
        })}
      </Select>

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Sort by difficulty"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={(a) => setSelectedDifficulty(a as any)}
      >
        <Select.Option value={EASY}>Easy</Select.Option>
        <Select.Option value={MEDIUM}>Medium</Select.Option>
        <Select.Option value={HARD}>Hard</Select.Option>
      </Select>

      <div className="CoursesList">
        <div className="main wrapper">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={filterData()}
            renderItem={(item) => <List.Item> {makeListItem(item as any)} </List.Item>}
          />
        </div>
      </div>
    </div>
  );
};

export default Browser;
