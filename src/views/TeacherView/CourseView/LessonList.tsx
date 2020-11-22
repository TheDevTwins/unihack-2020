import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { TeacherContext } from 'contexts';
import { Button } from 'antd';

const LessonList: React.FC = () => {
  const { lessons, createNewLesson, selectedCourse } = useContext(TeacherContext);

  const [newTitle, setNewTitle] = useState('');

  return (
    <div>
      <h3>Lessons:</h3>
      <ul className="list">
        {lessons.map((lesson) => (
          <li className="list__item" key={lesson.id}>
            <Link className="list__link" to={`/courses/${selectedCourse.id}/lessons/${lesson.id}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <Button onClick={() => createNewLesson(selectedCourse.id, newTitle)}>Create new</Button>
    </div>
  );
};

export default LessonList;
