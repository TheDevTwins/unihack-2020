import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { List } from 'antd';
import { BarChartOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { Program, StudentContext } from 'contexts';

const ProgramList: React.FC = () => {
  const { ownPrograms, removeProgram } = useContext(StudentContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makecard = (item: Program) => {
    return (
      <div className="card">
        <div
          style={{ backgroundImage: 'url(' + item.thumbnailUrl + ')' }}
          className="card__image"
        ></div>
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
        <div className="card__actions">
          <div
            className="card__delete"
            onClick={() => {
              removeProgram(item.id);
            }}
          >
            <CloseCircleOutlined />
          </div>
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

export default ProgramList;
