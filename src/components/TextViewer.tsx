import React from 'react';
import RichTextEditor from 'react-rte';

type Props = {
  text: string;
};

const TextViewer: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <RichTextEditor
        value={RichTextEditor.createValueFromString(text, 'html')}
        onChange={() => {}}
        readOnly
      />
    </div>
  );
};

export default TextViewer;
