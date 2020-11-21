import React, { useContext } from 'react';

import { List, Button } from 'antd';
import { BarChartOutlined, ClockCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { Course, TeacherContext } from 'contexts';
import { Link } from 'react-router-dom';

const CourseList: React.FC = () => {
  const { ownCourses, createCourse } = useContext(TeacherContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makeListItem = (item: Course) => {
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
        renderItem={(item, i) => <List.Item key={i}> {makeListItem(item)} </List.Item>}
      />
    </div>
  );
};

export default CourseList;
