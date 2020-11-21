import { BarChartOutlined, ClockCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { OrganizationContext } from 'contexts';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Program } from 'src/contexts/types';

const ProgramList: React.FC = () => {
  const { ownPrograms } = useContext(OrganizationContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makeListItem = (item: Program) => {
    console.log(item.id);
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

  return (
    <div>
      <Link className="orgView__addProgram" to={`/create`}>
        Create new program <PlusCircleOutlined />
      </Link>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={ownPrograms}
        renderItem={(item) => <List.Item> {makeListItem(item)} </List.Item>}
      />
    </div>
  );
};

export default ProgramList;
