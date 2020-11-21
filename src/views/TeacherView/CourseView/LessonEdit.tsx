import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TeacherContext } from 'contexts';

import { TextEditor } from 'components';

const LessonEdit: React.FC = () => {
  const { getLessonById, updateLesson, selectedCourse } = useContext(TeacherContext);
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = getLessonById(lessonId);

  const [newTitle, setNewTitle] = useState(lesson.title);

  return (
    <div>
      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <TextEditor
        initialValue={lesson.content}
        onSave={(content) => updateLesson(lessonId, { content, title: newTitle })}
      />
    </div>
  );
};

export default LessonEdit;
