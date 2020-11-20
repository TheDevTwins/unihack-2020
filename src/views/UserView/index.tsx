import React from 'react';

import { Logo, Menu } from 'components';

const UserView: React.FC = () => {
  return (
    <div className="userView">
      <div className="header">
        <div className="wrapper">
          <div className="header__container">
            <Logo />
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
