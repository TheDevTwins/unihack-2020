import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { List } from 'antd';
import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { Program, StudentContext } from 'contexts';

const ProgramList: React.FC = () => {
  const { ownPrograms, removeProgram } = useContext(StudentContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makeListItem = (item: Program) => {
    return (
      <div className="listItem">
        <img src={item.thumbnailUrl} alt="" className="listItem__img" />
        <div className="listItem__content">
          <div className="listItem__tags">{item.tags?.join(' - ')}</div>
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
          <Link to={`/programs/${item.id}`}>Enter me daddy</Link>
        </div>

        <div
          className="listItem__buy"
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
          renderItem={(item) => <List.Item> {makeListItem(item)} </List.Item>}
        />
      </div>
    </div>
  );
};

export default ProgramList;
