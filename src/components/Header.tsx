import React, { useContext } from 'react';

import { Logo, Menu, AccountDetails } from 'components';

import { UserContext } from 'contexts';

type Props = {
  buttons?: { text: string; url: string }[];
};

const Header: React.FC<Props> = ({ buttons }) => {
  const { logout } = useContext(UserContext);

  return (
    <div className="header">
      <div className="wrapper">
        <div className="header__container">
          <Logo />
          <Menu buttons={buttons} />
          <AccountDetails />
          <button onClick={logout}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
