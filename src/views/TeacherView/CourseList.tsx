import React, { useContext } from 'react';

import { List, Button } from 'antd';
import {
  BarChartOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { Course, TeacherContext } from 'contexts';
import { Link } from 'react-router-dom';

const CourseList: React.FC = () => {
  const { ownCourses, createCourse, deleteCourse } = useContext(TeacherContext);

  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makecard = (item: Course) => {
    return (
      <div className="card">
        <div
          style={{ backgroundImage: 'url(' + item.thumbnailUrl + ')' }}
          className="card__image"
        ></div>
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
        </div>
        <div className="card__actions">
          <Link className="card__edit" to={`/courses/${item.id}`}>
            <EditOutlined />
          </Link>
          <div
            className="card__delete"
            onClick={() => {
              deleteCourse(item.id);
            }}
          >
            <CloseCircleOutlined />
          </div>
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
