import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from 'reusable';
import ProgramList from './ProgramList';
import CreateProgram from './CreateProgram';
import EditProgram from './EditProgram';

const OrganizationView: React.FC = () => {
  return (
    <div className="OrgView">
      <Header
        buttons={[
          {
            text: 'Programs',
            url: '/programs',
          },
        ]}
      />

      <div className="wrapper">
        <Switch>
          <Route path={`/programs/:programId`}>
            <EditProgram />
          </Route>
          <Route path={`/programs`}>
            <ProgramList />
          </Route>
          <Route path={`/create`}>
            <CreateProgram />
          </Route>
          <Redirect to={`/programs`} />
        </Switch>
      </div>
    </div>
  );
};

export default OrganizationView;
