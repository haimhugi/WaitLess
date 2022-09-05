import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import AuthContext from "../../store/auth-context";
import CategoryContext from "../../store/category-context";
import RegisterContext from "../../store/register-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Login.css";

const Login = () => {
    const CartCtx = useContext(CategoryContext);
    const history = useHistory();
    const AuthCtx = useContext(AuthContext);
    const RegisterCtx = useContext(RegisterContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const onFinish = async (values) => {
        try {
            const responseData = await sendRequest(
                "http://localhost:5001/api/users/login",
                "POST",
                JSON.stringify({
                    email: values.username,
                    password: values.password,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            AuthCtx.changeToLoggedIn(responseData.user.id, responseData.user.isAdmin);
            CartCtx.changeCategory("הכל");
            history.push("/meals");
        } catch (err) {
        }
    };

    const changeRegisterToTrue = () => {
        RegisterCtx.changeRegister(true);

    };

    return (
        <React.Fragment>
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
                                message: "Please input your E-Mail!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="E-Mail"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
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

                    <Form.Item className="auth-form-btns">
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "black",
                                borderColor: "#676767de",
                                borderRadius: "6px",
                                margin: "3px",
                            }}
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                        <Button
                            style={{
                                backgroundColor: "#e2e2e267",
                                borderColor: "#676767de",
                                color: "white",
                                borderRadius: "6px",
                                margin: "3px",
                            }}
                            onClick={changeRegisterToTrue}
                        >
                            register now!
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </React.Fragment>
    );
};

export default Login;
