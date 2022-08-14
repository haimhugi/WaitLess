import React, { useState } from 'react';

import { Button, Form, Input } from 'antd';
import "antd/dist/antd.css";
import { useHttpClient } from '../../shared/hooks/http-hook';

import Modal from '../../shared/components/UIElements/Modal';

const AddCategory = props => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const onFinish = async (values) => {
        console.log('Success:', values.name);
        try {
            await sendRequest(
                'http://localhost:5001/api/meals/add-category',
                'POST',
                JSON.stringify({
                    name: values.name
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

            console.log('Received values of form: ', values);
        } catch (err) {
            console.log('add catagory error: ', err);
         }
        props.onClose();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal onClose={props.onClose}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onSubmit={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="שם הקטגוריה"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'בבקשה הכנס את שם הקטגוריה',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button type="danger" onClick={props.onClose}>
                        Close
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCategory;