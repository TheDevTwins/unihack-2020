import React from 'react';

import { Logo, Menu, AccountDetails } from 'components';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header__container">
          <Logo />
          <Menu />
          <AccountDetails />
        </div>
      </div>
    </div>
  );
};

export default Header;
