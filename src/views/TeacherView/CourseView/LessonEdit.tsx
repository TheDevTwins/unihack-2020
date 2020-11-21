import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { TeacherContext } from 'contexts';

import { TextEditor } from 'components';

const LessonEdit: React.FC = () => {
  const { getLessonById, updateLesson } = useContext(TeacherContext);
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = getLessonById(lessonId);

  return (
    <div>
      {lesson.title}
      <TextEditor
        initialValue={lesson.content}
        onSave={(content) => updateLesson(lessonId, { content })}
      />
    </div>
  );
};

export default LessonEdit;
