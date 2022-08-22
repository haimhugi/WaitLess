import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';

import AuthContext from '../../store/auth-context';
import CategoryContext from '../../store/category-context';
import RegisterContext from '../../store/register-context';


import { useHttpClient } from '../../shared/hooks/http-hook';
import './Register.css';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {
    const CartCtx = useContext(CategoryContext);
    const history = useHistory();
    const AuthCtx = useContext(AuthContext);
    const RegisterCtx = useContext(RegisterContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await sendRequest(
                'http://localhost:5001/api/users/signup',
                'POST',
                JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

            AuthCtx.changeToLoggedOut();
            console.log('Received values of form: ', values);
            //   AuthCtx.changeToLoggedIn(response._id, false);
            //   CartCtx.changeCategory("הכל");
            //   history.push("/meals");
            changeRegisterToFalse();
        } catch (err) { }
    };

    const changeRegisterToFalse = () => {
        RegisterCtx.changeRegister(false);
    };

    return (
        <Form className='register-form'
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="Full Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="https://www.law.cornell.edu/wex/agreement" target="_blank" rel="noreferrer noopener">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                Or <Button onClick={changeRegisterToFalse}> Login now!</Button>

            </Form.Item>
        </Form>
    );
};

export default Register;