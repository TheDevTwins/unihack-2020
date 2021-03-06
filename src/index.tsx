import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider, UserTypeContextProvider } from 'contexts';

import 'antd/dist/antd.css';
import 'src/styles/style.scss';

ReactDOM.render(
  <UserProvider>
    <UserTypeContextProvider>
      <App />
    </UserTypeContextProvider>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
