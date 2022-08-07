import React from 'react';

import { Button, Form, Input } from 'antd';
import "antd/dist/antd.css";

import Modal from '../../shared/components/UIElements/Modal';

const EditMeal = props => {

    const onFinish = (values) => {
        console.log('Success:', values);
        //send Patch to backend
        props.onClose();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal onClose={props.onClose} onSubmit={props.onSubmit}>
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
                onFinish={props.onSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="קישור תמונה של המנה"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: 'בבקשה הכנס קישור',
                        },
                    ]}
                    initialValue={props.image}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="שם המנה"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'בבקשה הכנס את שם המנה',
                        },
                    ]}
                    initialValue={props.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="תיאור המנה"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'בבקשה הכנס את תיאור המנה',
                        },
                    ]}
                    initialValue={props.description}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="מחיר המנה"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'בבקשה הכנס את מחיר המנה',
                        },
                    ]}
                    initialValue={props.price}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="קטגוריית המנה"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'בבקשה הכנס את קטגוריית המנה',
                        },
                    ]}
                    initialValue={props.category}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
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

export default EditMeal;