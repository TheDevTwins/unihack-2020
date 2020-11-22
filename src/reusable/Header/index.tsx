import React from 'react';

import { Logo } from 'components';

import Menu from './Menu';
import AccountDetails from './AccountDetails';

type Props = {
  buttons?: { text: string; url: string }[];
};

const Header: React.FC<Props> = ({ buttons }) => {
  return (
    <div className="header">
      <div className="wrapper wrapper--align">
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
