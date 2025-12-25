import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Radio } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<"customer" | "admin">("customer");
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          role: userRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        message.success("Login successful!");

        // Redirect based on role
        if (data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/customer/products");
        }
      } else {
        message.error(data.message || "Login failed");
      }
    } catch (error) {
      message.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - FT Shop</title>
      </Head>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0066FF, #00D4B1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "400px",
            height: "400px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          }}
        />

        <Card
          style={{
            width: "450px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            border: "none",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "left", marginBottom: "30px" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "32px",
                boxShadow: "0 8px 24px rgba(0, 102, 255, 0.3)",
                marginBottom: "20px",
              }}
            >
              FT
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#666", fontSize: "16px" }}>
                Login to your account
              </Text>
            </div>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: "30px" }}>
            <Text
              strong
              style={{ display: "block", marginBottom: "12px", color: "#333" }}
            >
              Login as:
            </Text>
            <Radio.Group
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              style={{ width: "100%" }}
            >
              <Radio.Button
                value="customer"
                style={{
                  width: "50%",
                  textAlign: "center",
                  height: "45px",
                  lineHeight: "45px",
                  fontSize: "16px",
                  borderRadius: "8px 0 0 8px",
                  border:
                    userRole === "customer"
                      ? "2px solid #0066FF"
                      : "1px solid #d9d9d9",
                  background: userRole === "customer" ? "#e6f0ff" : "white",
                  color: userRole === "customer" ? "#0066FF" : "#666",
                  fontWeight: userRole === "customer" ? "bold" : "normal",
                }}
              >
                <UserOutlined /> Customer
              </Radio.Button>
              <Radio.Button
                value="admin"
                style={{
                  width: "50%",
                  textAlign: "center",
                  height: "45px",
                  lineHeight: "45px",
                  fontSize: "16px",
                  borderRadius: "0 8px 8px 0",
                  border:
                    userRole === "admin"
                      ? "2px solid #0066FF"
                      : "1px solid #d9d9d9",
                  background: userRole === "admin" ? "#e6f0ff" : "white",
                  color: userRole === "admin" ? "#0066FF" : "#666",
                  fontWeight: userRole === "admin" ? "bold" : "normal",
                }}
              >
                <LockOutlined /> Admin
              </Radio.Button>
            </Radio.Group>
          </div>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#0066FF" }} />}
                placeholder="Email"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e8e8e8",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#0066FF" }} />}
                placeholder="Password"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e8e8e8",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  height: "50px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 102, 255, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0, 102, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 102, 255, 0.3)";
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text style={{ color: "#666" }}>
              Don't have an account?{" "}
              <Link
                href="/register"
                style={{ color: "#0066FF", fontWeight: "bold" }}
              >
                Sign Up
              </Link>
            </Text>
          </div>
        </Card>

        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Login;
