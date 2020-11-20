import React, { useState, useContext } from 'react';

import { Button } from 'antd';

import { UserContext } from 'contexts';

const LoginMock: React.FC = () => {
  const { login, loggingIn } = useContext(UserContext);

  const [email, setEmail] = useState('andrei@mail.com');
  const [password, setPassword] = useState('123456');

  return (
    <div>
      email
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      password
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button loading={loggingIn} onClick={() => login(email, password)}>
        login
      </Button>
    </div>
  );
};

export default LoginMock;
