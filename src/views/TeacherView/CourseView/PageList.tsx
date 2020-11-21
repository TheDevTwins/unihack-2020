import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TeacherContext } from 'contexts';

const PageList: React.FC = () => {
  const { lessons } = useContext(TeacherContext);

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
      <button>Create new</button>
    </div>
  );
};

export default PageList;
