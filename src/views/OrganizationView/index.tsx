import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from 'components';
import ProgramList from './ProgramList';
import CreateProgram from './CreateProgram';

const OrganizationView: React.FC = () => {
  return (
    <div className="OrgView">
      <Header />

      <div className="wrapper">
        <Switch>
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
