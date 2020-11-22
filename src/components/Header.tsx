import React from 'react';

import { Logo, Menu, AccountDetails } from 'components';

type Props = {
  buttons?: { text: string; url: string }[];
};

const Header: React.FC<Props> = ({ buttons }) => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header__container">
          <Logo />
          <Menu buttons={buttons} />
          <AccountDetails />
        </div>
      </div>
    </div>
  );
};

export default Header;
