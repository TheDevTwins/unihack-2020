import React from 'react';

import { Logo } from 'components';

const UserView: React.FC = () => {
  return (
    <div className="userView">
      <div className="header">
        <Logo />
        {/* <Menu /> */}
      </div>
    </div>
  );
};

export default UserView;
