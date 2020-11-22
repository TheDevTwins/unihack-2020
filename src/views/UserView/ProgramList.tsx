import React, { useContext } from 'react';

import { StudentContext } from 'contexts';

import { CardList } from 'reusable';

const ProgramList: React.FC = () => {
  const { ownPrograms, removeProgram } = useContext(StudentContext);

  return (
    <CardList
      dataSource={ownPrograms}
      cardName="program"
      onDelete={removeProgram}
      enterUrl={(id) => `/programs/${id}`}
    />
  );
};

export default ProgramList;
