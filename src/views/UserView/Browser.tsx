import React, { useContext, useState } from 'react';

import { Button, List, Select, Slider, Space } from 'antd';
import { StudentContext } from 'contexts';

import { Course, EASY, HARD, MEDIUM, Program } from 'contexts';

import { CardList } from 'reusable';

const Browser: React.FC = () => {
  const { allCourses, allPrograms, buyCourse, buyProgram } = useContext(StudentContext);
  const [dataType, setDataType] = useState('Programs');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(-1);

  const courseTags: string[] = [];
  const programTags: string[] = [];

  [
    { input: allCourses, arr: courseTags },
    { input: allPrograms, arr: programTags },
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
  const dataTypeIndex = dataType === 'Programs' ? 0 : 1;
  const currentTags = dataTypeIndex ? courseTags : programTags;
  const currentData = dataTypeIndex ? allCourses : allPrograms;

  const currentPrices = {
    min: getRange(currentData, Math.min),
    max: getRange(currentData, Math.max),
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

  const minPrice = currentPrices.min;
  const maxPrice = currentPrices.max;

  const [selectedPrices, setSelectedPrices] = useState([minPrice, maxPrice]);

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
        {currentTags.map((tag, i) => {
          return (
            <Select.Option key={i} value={tag}>
              {tag}
            </Select.Option>
          );
        })}
      </Select>

      <Space>
        <Slider
          style={{ width: 200 }}
          range
          marks={{ [minPrice]: minPrice, [maxPrice]: maxPrice }}
          min={minPrice}
          max={maxPrice}
          value={selectedPrices as any}
          defaultValue={[minPrice, maxPrice]}
          onChange={setSelectedPrices}
        />
      </Space>

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

      <Button
        className="browser__clear"
        danger
        onClick={() => {
          setSelectedPrices([0, 0]);
          setSelectedDifficulty(-1);
          setSelectedTag('');
        }}
      >
        Clear filters
      </Button>

      <CardList dataSource={filterData()} onBuy={dataTypeIndex ? buyCourse : buyProgram} />
    </div>
  );
};

export default Browser;
