import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import AuthContext from '../../store/auth-context';
import CategoryContext from '../../store/category-context';
import RegisterContext from '../../store/register-context';

import { useHttpClient } from '../../shared/hooks/http-hook';

import './Login.css';





const Login = () => {

    const CartCtx = useContext(CategoryContext);
    const history = useHistory();
    const AuthCtx = useContext(AuthContext);
    const RegisterCtx = useContext(RegisterContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const onFinish = async values => {
        try {

            const responseData = await sendRequest(
                'http://localhost:5001/api/users/login',
                'POST',
                JSON.stringify({
                    email: values.username,
                    password: values.password
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            console.log(responseData.user);
            AuthCtx.changeToLoggedIn(responseData.user.id, responseData.user.isAdmin);
            CartCtx.changeCategory('הכל');
            history.push("/meals");
            console.log('Success');
        } catch (err) {
            //add Try Again modal(?)
            console.log(err);
        }

    };

    const changeRegisterToTrue = () => {
        RegisterCtx.changeRegister(true);
        console.log('changeRegisterToTrue run');
    };

    return (
        <React.Fragment className="login-main">
            <ErrorModal error={error} onClear={clearError} />
            <Card className="login-main">
                {isLoading && <LoadingSpinner asOverlay />}
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
                                message: 'Please input your E-Mail!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
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
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Button onClick={changeRegisterToTrue}>register now!</Button>
                    </Form.Item>
                </Form>
            </Card>
        </React.Fragment>
    );
};

export default Login;