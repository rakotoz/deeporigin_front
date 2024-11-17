import React from 'react';
import { FormProps, Layout, Typography } from 'antd';
import { Button, Form, Input } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { loginRequest } from '../../api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (values.username !== undefined || values.password !== undefined) {
      const result = await loginRequest(values);
      sessionStorage.setItem('token', result.access_token);
      navigate('/');
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Title style={{ color: 'white' }} level={1}>
          @DeepOrigin
        </Title>
      </Header>
      <Layout
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Content
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '50px',
              }}
            >
              <Title level={2}>Login</Title>
            </div>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ width: 500 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '20px' }}
                >
                  Submit
                </Button>
                <Button variant="outlined" onClick={onRegisterClick}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
