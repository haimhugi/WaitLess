import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';

import AuthContext from '../../store/auth-context';
import PasswordChangedModal from './PasswordChangedModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import { useHttpClient } from '../../shared/hooks/http-hook';
import './UpdatePassword.css';
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

const UpdatePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [passwordChangedModal, setPasswordChangedModal] = useState(false);
    // const [pageChange, setPageChange] = useState(false);
    const history = useHistory();


    const AuthCtx = useContext(AuthContext);

    const { error, sendRequest, clearError } = useHttpClient();

    const [form] = Form.useForm();

    const hidePasswordChangedModal = () => {
        // setPageChange(true);
        setPasswordChangedModal(false);
        history.push("/meals");

    }

    const showPasswordChangedModal = () => {
        // setPageChange(true);
        setPasswordChangedModal(true);
    }

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            await sendRequest(
                `http://localhost:5001/api/users/update-password/${AuthCtx.userId}`,
                'PATCH',
                JSON.stringify({
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            showPasswordChangedModal();
        } catch (err) { console.log(err); }
        setIsLoading(false);

    };



    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
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
                    name="oldPassword"
                    label="הסיסמה הנוכחית"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your current password!',
                        },
                    ]}
                >
                    <Input.Password />

                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="הסיסמה החדשה"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
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
                    label="אימות הסיסמה החדשה"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('שתי הסיסמאות שהכנסת לא תואמות'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        עדכון סיסמה
                    </Button>
                </Form.Item >
            </Form >
            {passwordChangedModal && <PasswordChangedModal onClose={hidePasswordChangedModal} />}
        </React.Fragment>
    );
};

export default UpdatePassword