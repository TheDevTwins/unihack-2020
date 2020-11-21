import React, { useContext } from 'react';

import { UserContext } from 'contexts';

const AccountDetails: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="accountDetails">
      <div className="accountDetails__username">{user.displayName}</div>
      <div className="accountDetails__icon"></div>
      <div className="accountDetails__dropdown"></div>
    </div>
  );
};

export default AccountDetails;
