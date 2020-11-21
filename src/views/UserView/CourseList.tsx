import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Select, List, Button } from 'antd';
import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { Course, StudentContext } from 'contexts';

const CourseList: React.FC = () => {
  const { ownCourses } = useContext(StudentContext);

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
          <Button type="primary">
            <Link to={`/courses/${item.id}`}>Enter course</Link>
          </Button>
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
          dataSource={ownCourses}
          renderItem={(item) => <List.Item> {makeListItem(item)} </List.Item>}
        />
      </div>
    </div>
  );
};

export default CourseList;
