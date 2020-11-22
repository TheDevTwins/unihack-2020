import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Select, List, Button } from 'antd';
import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { Course, StudentContext } from 'contexts';

const CourseList: React.FC = () => {
  const { ownCourses, removeCourse } = useContext(StudentContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makecard = (item: Course) => {
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
          <Button type="primary">
            <Link to={`/courses/${item.id}`}>Enter course</Link>
          </Button>
        </div>

        <div
          className="card__buy"
          onClick={() => {
            removeCourse(item.id);
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
          dataSource={ownCourses}
          renderItem={(item) => <List.Item> {makecard(item)} </List.Item>}
        />
      </div>
    </div>
  );
};

export default CourseList;
