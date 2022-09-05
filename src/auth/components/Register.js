import React, { useContext } from 'react';

import 'antd/dist/antd.min.css';
import { Button, Checkbox, Form, Input } from 'antd';

import AuthContext from '../../store/auth-context';
import RegisterContext from '../../store/register-context';

import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Register.css';
import validator from 'validator';

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

    const AuthCtx = useContext(AuthContext);
    const RegisterCtx = useContext(RegisterContext);

    const { error, sendRequest, clearError } = useHttpClient();

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
            changeRegisterToFalse();
        } catch (err) { }
    };

    const changeRegisterToFalse = () => {
        RegisterCtx.changeRegister(false);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (validator.isStrongPassword(value, {
                                    minLength: 8, minLowercase: 4,
                                    minUppercase: 0, minNumbers: 4, minSymbols: 0
                                })) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('בבקשה הכנס סיסמה באורך 8 תווים  4 אותיות באנגלית ו4 מספרים'));
                            },
                        })
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

                                return Promise.reject(new Error('שתי הסיסמאות שהכנסת לא תואמות'));
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
                    <Checkbox style={{ color: 'white' }}>
                        I have read the <a style={{ color: 'lightblue' }} href="https://www.law.cornell.edu/wex/agreement" target="_blank" rel="noreferrer noopener">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: 'black', borderColor: '#676767de', borderRadius: '6px', margin: '3px' }}>
                        Register
                    </Button>
                    <Button onClick={changeRegisterToFalse} style={{ backgroundColor: '#e2e2e267', borderColor: '#676767de', color: 'white', borderRadius: '6px', margin: '3px' }}> Login now!</Button>

                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default Register;