import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { TeacherContext } from 'contexts';

const PageList: React.FC = () => {
  const { lessons, createNewLesson, selectedCourse } = useContext(TeacherContext);

  const [newTitle, setNewTitle] = useState('');

  return (
    <div>
      <h3>Lessons:</h3>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/lessons/${lesson.id}`}>{lesson.title}</Link>
          </li>
        ))}
      </ul>
      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <button onClick={() => createNewLesson(selectedCourse.id, newTitle)}>Create new</button>
    </div>
  );
};

export default PageList;
