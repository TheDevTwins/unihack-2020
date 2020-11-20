import React, { useState } from 'react';
import RichTextEditor from 'react-rte';

import { Button } from 'antd';

type Props = {
  initialValue: string;
  onSave: (value: string) => void;
};

const TextEditor: React.FC<Props> = ({ initialValue, onSave }) => {
  const [value, setValue] = useState(RichTextEditor.createValueFromString(initialValue, 'html'));
  const [hasChanged, setHasChanged] = useState(false);

  return (
    <div>
      <Button type="primary" disabled={!hasChanged} onClick={() => onSave(value.toString('html'))}>
        Save
      </Button>
      <RichTextEditor
        value={value}
        onChange={(val) => {
          setValue(val);
          if (!hasChanged) setHasChanged(true);
        }}
      />
    </div>
  );
};

export default TextEditor;
