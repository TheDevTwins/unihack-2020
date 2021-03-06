import React, { useState } from 'react';
import RichTextEditor from 'react-rte';

import { Button } from 'antd';

type Props = {
  initialValue: string;
  onSave: (value: string) => void;
};

const TextEditor: React.FC<Props> = ({ initialValue, onSave }) => {
  const [value, setValue] = useState(RichTextEditor.createValueFromString(initialValue, 'html'));

  return (
    <div>
      <Button type="primary" onClick={() => onSave(value.toString('html'))}>
        Save
      </Button>
      <RichTextEditor
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
      />
    </div>
  );
};

export default TextEditor;
