import React, { useContext } from 'react';

import { Row, Form, Button, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons/lib';

import { Logo } from 'components';

import { UserContext } from 'contexts';

const Login: React.FC = () => {
  const { login, loggingIn } = useContext(UserContext);

  const [form] = Form.useForm();

  return (
    <Row justify="center" style={{ paddingTop: 100 }}>
      <div style={{ fontSize: 20, width: 500 }}>
        <div style={{ textAlign: 'center', paddingBottom: 50 }}>
          <h1>Welcome to Serapi</h1>
          <h3>Please enter your credentials</h3>
        </div>
        <Form
          form={form}
          initialValues={{ email: '', password: '' }}
          onFinish={() => {
            const email = form.getFieldValue('email');
            const password = form.getFieldValue('password');
            login(email, password);
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loggingIn}
              style={{ width: '30%' }}
            >
              Log in
            </Button>
          </Form.Item>
          <hr />
          <p>Demo accounts:</p>
          <p>demo_user@mail.com - pw1234</p>
          <p>demo_teacher@uni.com - pw1234</p>
          <p>demo_admin@uni.com - pw1234</p>
        </Form>
      </div>
    </Row>
  );
};

export default Login;
