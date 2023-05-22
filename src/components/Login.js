import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import login from "../144103-e-v-e.json";

export default function Login() {
  const navigate = useNavigate();

  console.log("Login");
  const onFinish = async (values) => {
    console.log("values: ", values);
    const response = await fetch(
      "https://tony-auth-express-cmylpcdza-nhattruong1811-gmailcom.vercel.app/api/user/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();

    // set token
    window.localStorage.setItem("accessToken", data.token);

    // redirect to home page
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="backGround_login">
      <div>
        <h1 className="login_page">Login Page</h1>
        <Lottie className="lottie" animationData={login} loop={true} />
      </div>

      <div className="login">
        <Form
          className="loginForm"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button className="register">
              <Link to="/register">Register</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
