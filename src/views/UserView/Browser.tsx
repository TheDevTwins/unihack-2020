import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { List, Select, Slider } from 'antd';
import { StudentContext } from 'contexts';
import React, { useContext, useState } from 'react';

import { Course, EASY, HARD, MEDIUM, Program } from '../../contexts/types';

const Browser: React.FC = () => {
  const data = useContext(StudentContext);
  const [dataType, setDataType] = useState('Programs');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(-1);
  const [selectedPrices, setSelectedPrices] = useState([0, 0]);

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

  const getRange: (arr: Course[] | Program[], comp: (a: number, b: number) => number) => number = (
    arr,
    comp
  ) => {
    return (arr as any).reduce((acc: number, crt: { price: number }) => {
      return comp(acc, crt.price);
    }, 0);
  };

  // get current variables
  const currentTags = dataType === 'Programs' ? programTags : courseTags;
  const currentData = dataType === 'Programs' ? data.allPrograms : data.allCourses;

  const currentPrices = {
    min: getRange(currentData, Math.min),
    max: getRange(currentData, Math.max),
  };

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
      ({ difficulty, tags, price }: { difficulty: number; tags: string; price: number }) => {
        let result = true;
        if (selectedTag !== '') {
          result = result && tags.includes(selectedTag);
        }
        if (selectedPrices[0] < selectedPrices[1]) {
          result = result && price >= selectedPrices[0] && price <= selectedPrices[1];
        }
        if (selectedDifficulty !== -1) {
          result = result && difficulty === selectedDifficulty;
        }
        return result;
      }
    );
  };

  return (
    <div className="browser">
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
        value={selectedTag || undefined}
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

      <Slider
        range
        min={currentPrices.min}
        max={currentPrices.max}
        value={selectedPrices as any}
        defaultValue={[currentPrices.min, currentPrices.max]}
        onChange={setSelectedPrices}
      />

      <Select
        showSearch
        style={{ width: 200 }}
        value={selectedDifficulty === -1 ? undefined : selectedDifficulty}
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

      <div
        className="browser__clear"
        onClick={() => {
          setSelectedPrices([0, 0]);
          setSelectedDifficulty(-1);
          setSelectedTag('');
        }}
      >
        Clear
      </div>

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
