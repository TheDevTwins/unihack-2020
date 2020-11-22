import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { TextViewer } from 'components';

import { StudentContext } from 'contexts';

const LessonView: React.FC = () => {
  const { getLessonById } = useContext(StudentContext);
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = getLessonById(lessonId);

  if (!lesson) return null;

  return (
    <div>
      <h1>{lesson.title}</h1>
      <TextViewer text={lesson.content} />
    </div>
  );
};

export default LessonView;
