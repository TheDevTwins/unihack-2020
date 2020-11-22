import React, { useContext } from 'react';
import { ImportOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from 'contexts';

const AccountDetails: React.FC = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="accountDetails">
      <div className="accountDetails__username">{user.displayName}</div>
      <div className="accountDetails__icon">
        <UserOutlined />
      </div>
      <div className="accountDetails__dropdown">
        <div className="accountDetails__dropdownItem" onClick={logout}>
          <ImportOutlined /> logout
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
