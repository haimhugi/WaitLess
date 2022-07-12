import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Card from '../../shared/components/UIElements/Card';

import LoggedInContext from '../../store/loggedIn-context';
import CategoryContext from '../../store/category-context';
import RegisterContext from '../../store/register-context';





const Login = () => {

    const CartCtx = useContext(CategoryContext);
    const history = useHistory();
    const LoggedInCtx = useContext(LoggedInContext);
    const RegisterCtx = useContext(RegisterContext);


    const onFinish = (values) => {
        //do validation on values
        LoggedInCtx.changeLoggedIn(true);
        CartCtx.changeCategory('הכל');
        history.push("/meals");
    };

    const changeRegisterToTrue = () => {
        RegisterCtx.changeRegister(true);
        console.log('changeRegisterToTrue run');
    };

    return (
        <Card>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Button onClick={changeRegisterToTrue}>register now!</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;