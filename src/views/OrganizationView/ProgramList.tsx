import { BarChartOutlined, ClockCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { OrganizationContext } from 'contexts';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Program } from 'src/contexts/types';

const ProgramList: React.FC = () => {
  const { ownPrograms, deleteOwnProgram } = useContext(OrganizationContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makecard = (item: Program) => {
    console.log(item.id);
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
          className="card__delete"
          onClick={() => {
            deleteOwnProgram(item.id);
          }}
        >
          Delete
        </div>
      </div>
    );
  };

  return (
    <div>
      <Link className="orgView__addProgram" to={`/create`}>
        Create new program <PlusCircleOutlined />
      </Link>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={ownPrograms}
        renderItem={(item) => <List.Item> {makecard(item)} </List.Item>}
      />
    </div>
  );
};

export default ProgramList;
