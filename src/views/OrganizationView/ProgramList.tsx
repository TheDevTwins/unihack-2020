import React, { useContext } from 'react';

import { OrganizationContext } from 'contexts';

import {CardList} from 'reusable';

const ProgramList: React.FC = () => {
  const { ownPrograms, deleteOwnProgram } = useContext(OrganizationContext);

  return (
    <CardList
      dataSource={ownPrograms}
      cardName="program"
      createUrl={`/create`}
      onDelete={deleteOwnProgram}
      editUrl={(id) => `/programs/${id}`}
    />
  );
};

export default ProgramList;
