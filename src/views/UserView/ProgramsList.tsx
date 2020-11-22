import React, { useContext } from 'react';

import { List } from 'antd';
import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { Program, StudentContext } from 'contexts';

const CourseList: React.FC = () => {
  const { ownPrograms, removeProgram } = useContext(StudentContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makecard = (item: Program) => {
    return (
      <div className="card">
        <img src={item.thumbnailUrl} alt="" className="card__img" />
        <div className="card__content">
          <div className="card__tags">{item.tags.join(' - ')}</div>
          <div className="card__title">{item.title}</div>
          <div className="card__stats">
            <div className="card__stat">
              <BarChartOutlined />
              {DIFFICULTIES[item.difficulty]}
            </div>
            <div className="card__stat">
              <ClockCircleOutlined />
              {item.duration}
            </div>
          </div>
          <div className="card__description">{item.description}</div>
        </div>

        <div
          className="card__buy"
          onClick={() => {
            removeProgram(item.id);
          }}
        >
          Remove
        </div>
      </div>
    );
  };

  return (
    <div className="CoursesList">
      <div className="main wrapper">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={ownPrograms}
          renderItem={(item) => <List.Item> {makecard(item)} </List.Item>}
        />
      </div>
    </div>
  );
};

export default CourseList;
