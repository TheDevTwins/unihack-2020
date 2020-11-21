import React from 'react';

import { Logo, Menu, AccountDetails } from 'components';

const Header: React.FC = () => {
  const menuButtons = [
    {
      text: 'Programs',
      url: '/programs',
    },
    {
      text: 'Courses',
      url: '/courses',
    },
    {
      text: 'Discover new',
      url: '/discover',
    },
  ];

  return (
    <div className="header">
      <div className="wrapper">
        <div className="header__container">
          <Logo />
          <Menu buttons={menuButtons} />
          <AccountDetails />
        </div>
      </div>
    </div>
  );
};

export default Header;
