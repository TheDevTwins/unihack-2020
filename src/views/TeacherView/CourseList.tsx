import React, { useContext } from 'react';

import { List, Button } from 'antd';
import { BarChartOutlined, ClockCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { Course, TeacherContext } from 'contexts';
import { Link } from 'react-router-dom';

const CourseList: React.FC = () => {
  const { ownCourses, createCourse } = useContext(TeacherContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makecard = (item: Course) => {
    return (
      <div className="card">
        <img src={item.thumbnailUrl} alt="" className="card__img" />
        <div className="card__content">
          <div className="card__tags">{item.tags?.join(' - ')}</div>
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
          <Button>
            <Link to={`/courses/${item.id}`}>Edit course</Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="wrapper">
      <Button
        className="newCourse"
        onClick={() => {
          createCourse();
        }}
      >
        Create new course <PlusCircleOutlined />
      </Button>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={ownCourses}
        renderItem={(item, i) => <List.Item key={i}> {makecard(item)} </List.Item>}
      />
    </div>
  );
};

export default CourseList;
