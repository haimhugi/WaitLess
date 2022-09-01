import React, { useEffect, useState } from "react";

import { Button, Form, Input, Select, InputNumber } from "antd";
import "antd/dist/antd.css";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import Modal from "../../shared/components/UIElements/Modal";
const { Option } = Select;

const EditMeal = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [pageChange, setPageChange] = useState(false);
  const [CATEGORIES, setCATEGORIES] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/meals/categories"
        );
        const responseData = await response.json();
        let arr = [];
        for (let prop in responseData.categories) {
          if (responseData.categories[prop].name !== "הכל") {
            arr.push(responseData.categories[prop].name);
          }
        }
        setCATEGORIES(arr);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
    setPageChange(false);
  }, [pageChange]);

  const onFinish = (values) => {
    console.log("Success:", values);
    props.onSubmit(values);
    props.onClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal onClose={props.onClose}>
      <ErrorModal error={error} onClear={clearError} />
      <Form
        style={{ direction: "rtl" }}
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="קישור תמונה של המנה"
          name="image"
          rules={[
            {
              required: true,
              message: "בבקשה הכנס קישור",
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
              message: "בבקשה הכנס את שם המנה",
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
              message: "בבקשה הכנס את תיאור המנה",
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
              message: "בבקשה הכנס את מחיר המנה",
            },
          ]}
          initialValue={props.price}
        >
          <InputNumber prefix="₪" />
        </Form.Item>
        <Form.Item
          name="category"
          label="קטגוריה"
          rules={[
            {
              required: true,
              message: "בבקשה הכנס את קטגוריית המנה",
            },
          ]}
        >
          <Select placeholder="בחר את הקטגוריה הרצויה">
            {CATEGORIES.map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "1%" }}
            >
              אישור
            </Button>
            <Button type="danger" onClick={props.onClose}>
              סגור
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMeal;
