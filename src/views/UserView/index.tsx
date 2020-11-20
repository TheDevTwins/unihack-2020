import React from 'react';

import { Select, List } from 'antd';
import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { Logo, Menu, AccountDetails } from 'components';

const UserView: React.FC = () => {
  type listItem = {
    title: string;
    description: string;
    tags: string[];
    duration: number;
    difficulty: number;
    thumbnailUrl: string;
  };

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const listItems: listItem[] = [
    {
      title: 'course title',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum consequuntur perferendis eligendi harum repellendus, quidem animi molestias',
      tags: ['Javascript', 'ReactJS'],
      duration: 6,
      difficulty: 1,
      thumbnailUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    },
    {
      title: 'course title',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum consequuntur perferendis eligendi harum repellendus, quidem animi molestias',
      tags: ['Javascript', 'ReactJS'],
      duration: 6,
      difficulty: 1,
      thumbnailUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    },
    {
      title: 'course title',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum consequuntur perferendis eligendi harum repellendus, quidem animi molestias',
      tags: ['Javascript', 'ReactJS'],
      duration: 6,
      difficulty: 1,
      thumbnailUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    },
    {
      title: 'course title',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum consequuntur perferendis eligendi harum repellendus, quidem animi molestias',
      tags: ['Javascript', 'ReactJS'],
      duration: 6,
      difficulty: 1,
      thumbnailUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    },
  ];

  const makeListItem = (item: listItem) => {
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
    <div className="userView">
      <div className="header">
        <div className="wrapper">
          <div className="header__container">
            <Logo />
            <Menu />
            <AccountDetails />
          </div>
        </div>
      </div>

      <div className="main wrapper">
        <Select
          showSearch
          style={{ width: 100 }}
          placeholder="Select a tag"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option value="jack">UPT</Select.Option>
          <Select.Option value="lucy">UVT</Select.Option>
        </Select>
        <Select
          showSearch
          style={{ width: 100 }}
          placeholder="Select a tag"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option value="jack">UPT</Select.Option>
          <Select.Option value="lucy">UVT</Select.Option>
        </Select>

        {/* List of contents */}
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listItems}
          renderItem={(item) => <List.Item> {makeListItem(item)} </List.Item>}
        />
      </div>
    </div>
  );
};

export default UserView;
