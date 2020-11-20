import React, { useState, useContext } from 'react';

import { UserContext } from 'contexts';

const LoginMock: React.FC = () => {
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState('andrei@mail.com');
  const [password, setPassword] = useState('123456');

  return (
    <div>
      email
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      password
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => login(email, password)}>login</button>
    </div>
  );
};

export default LoginMock;
