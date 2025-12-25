// import React, { useState } from "react";
// import { Form, Input, Button, Card, Typography, message, Radio } from "antd";
// import {
//   UserOutlined,
//   LockOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import Head from "next/head";

// const { Title, Text } = Typography;

// const Register: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState<"customer" | "admin">("customer");
//   const router = useRouter();

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: values.name,
//           email: values.email,
//           password: values.password,
//           phone: values.phone,
//           address: values.address,
//           role: userRole,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         message.success("Registration successful! Please login.");
//         router.push("/login");
//       } else {
//         message.error(data.message || "Registration failed");
//       }
//     } catch (error) {
//       message.error("An error occurred during registration");
//       console.error("Registration error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Sign Up - FT Shop</title>
//       </Head>
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//           position: "relative",
//           overflow: "hidden",
//           padding: "40px 20px",
//         }}
//       >
//         {/* Animated Background Elements */}
//         <div
//           style={{
//             position: "absolute",
//             top: "-10%",
//             right: "-5%",
//             width: "500px",
//             height: "500px",
//             background: "rgba(255,255,255,0.1)",
//             borderRadius: "50%",
//             animation: "float 8s ease-in-out infinite",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             bottom: "-10%",
//             left: "-5%",
//             width: "400px",
//             height: "400px",
//             background: "rgba(255,255,255,0.1)",
//             borderRadius: "50%",
//             animation: "float 6s ease-in-out infinite",
//           }}
//         />

//         <Card
//           style={{
//             width: "500px",
//             borderRadius: "16px",
//             boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//             border: "none",
//             zIndex: 1,
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           {/* Logo */}
//           <div style={{ textAlign: "left", marginBottom: "30px" }}>
//             <div
//               style={{
//                 width: "70px",
//                 height: "70px",
//                 background: "linear-gradient(135deg, #0066FF, #00D4B1)",
//                 borderRadius: "12px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "white",
//                 fontWeight: "bold",
//                 fontSize: "32px",
//                 boxShadow: "0 8px 24px rgba(0, 102, 255, 0.3)",
//                 marginBottom: "20px",
//               }}
//             >
//               FT
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ color: "#666", fontSize: "16px" }}>
//                 Join FT Shop today
//               </Text>
//             </div>
//           </div>

//           {/* Role Selection */}
//           <div style={{ marginBottom: "30px" }}>
//             <Text
//               strong
//               style={{ display: "block", marginBottom: "12px", color: "#333" }}
//             >
//               Register as:
//             </Text>
//             <Radio.Group
//               value={userRole}
//               onChange={(e) => setUserRole(e.target.value)}
//               style={{ width: "100%" }}
//             >
//               <Radio.Button
//                 value="customer"
//                 style={{
//                   width: "50%",
//                   textAlign: "center",
//                   height: "45px",
//                   lineHeight: "45px",
//                   fontSize: "16px",
//                   borderRadius: "8px 0 0 8px",
//                   border:
//                     userRole === "customer"
//                       ? "2px solid #0066FF"
//                       : "1px solid #d9d9d9",
//                   background: userRole === "customer" ? "#e6f0ff" : "white",
//                   color: userRole === "customer" ? "#0066FF" : "#666",
//                   fontWeight: userRole === "customer" ? "bold" : "normal",
//                 }}
//               >
//                 <UserOutlined /> Customer
//               </Radio.Button>
//               <Radio.Button
//                 value="admin"
//                 style={{
//                   width: "50%",
//                   textAlign: "center",
//                   height: "45px",
//                   lineHeight: "45px",
//                   fontSize: "16px",
//                   borderRadius: "0 8px 8px 0",
//                   border:
//                     userRole === "admin"
//                       ? "2px solid #0066FF"
//                       : "1px solid #d9d9d9",
//                   background: userRole === "admin" ? "#e6f0ff" : "white",
//                   color: userRole === "admin" ? "#0066FF" : "#666",
//                   fontWeight: userRole === "admin" ? "bold" : "normal",
//                 }}
//               >
//                 <LockOutlined /> Admin
//               </Radio.Button>
//             </Radio.Group>
//           </div>

//           <Form
//             name="register"
//             onFinish={onFinish}
//             layout="vertical"
//             size="large"
//           >
//             <Form.Item
//               name="name"
//               rules={[{ required: true, message: "Please input your name!" }]}
//             >
//               <Input
//                 prefix={<UserOutlined style={{ color: "#0066FF" }} />}
//                 placeholder="Full Name"
//                 style={{
//                   borderRadius: "8px",
//                   border: "2px solid #e8e8e8",
//                 }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="email"
//               rules={[
//                 { required: true, message: "Please input your email!" },
//                 { type: "email", message: "Please enter a valid email!" },
//               ]}
//             >
//               <Input
//                 prefix={<MailOutlined style={{ color: "#0066FF" }} />}
//                 placeholder="Email"
//                 style={{
//                   borderRadius: "8px",
//                   border: "2px solid #e8e8e8",
//                 }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               rules={[
//                 { required: true, message: "Please input your password!" },
//                 { min: 6, message: "Password must be at least 6 characters!" },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined style={{ color: "#0066FF" }} />}
//                 placeholder="Password"
//                 style={{
//                   borderRadius: "8px",
//                   border: "2px solid #e8e8e8",
//                 }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="confirmPassword"
//               dependencies={["password"]}
//               rules={[
//                 { required: true, message: "Please confirm your password!" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error("Passwords do not match!"));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined style={{ color: "#0066FF" }} />}
//                 placeholder="Confirm Password"
//                 style={{
//                   borderRadius: "8px",
//                   border: "2px solid #e8e8e8",
//                 }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="phone"
//               rules={[
//                 { required: true, message: "Please input your phone number!" },
//               ]}
//             >
//               <Input
//                 prefix={<PhoneOutlined style={{ color: "#0066FF" }} />}
//                 placeholder="Phone Number"
//                 style={{
//                   borderRadius: "8px",
//                   border: "2px solid #e8e8e8",
//                 }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="address"
//               rules={[
//                 { required: true, message: "Please input your address!" },
//               ]}
//             >
//               <Input.TextArea
//                 // prefix={<HomeOutlined style={{ color: "#0066FF" }} />}
//                 placeholder="Address"
//                 rows={3}
//                 style={{
//                   borderRadius: "8px",
//                   border: "2px solid #e8e8e8",
//                 }}
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 block
//                 style={{
//                   height: "50px",
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                   background: "linear-gradient(135deg, #0066FF, #00D4B1)",
//                   border: "none",
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 12px rgba(0, 102, 255, 0.3)",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.boxShadow =
//                     "0 6px 16px rgba(0, 102, 255, 0.4)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 12px rgba(0, 102, 255, 0.3)";
//                 }}
//               >
//                 Sign Up
//               </Button>
//             </Form.Item>
//           </Form>

//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Text style={{ color: "#666" }}>
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 style={{ color: "#0066FF", fontWeight: "bold" }}
//               >
//                 Login
//               </Link>
//             </Text>
//           </div>
//         </Card>

//         <style jsx global>{`
//           @keyframes float {
//             0%,
//             100% {
//               transform: translateY(0) rotate(0deg);
//             }
//             50% {
//               transform: translateY(-20px) rotate(5deg);
//             }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default Register;

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Radio,
  Modal,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<"customer" | "admin">("customer");
  const [isAdminVerifyModalOpen, setIsAdminVerifyModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [verifyingAdmin, setVerifyingAdmin] = useState(false);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const router = useRouter();

  const handleRoleChange = (e: any) => {
    const newRole = e.target.value;

    if (newRole === "admin") {
      // Show admin verification modal
      setIsAdminVerifyModalOpen(true);
    } else {
      setUserRole(newRole);
      setIsAdminVerified(false);
    }
  };

  const handleAdminVerification = async () => {
    if (!adminEmail) {
      message.error("Please enter admin email");
      return;
    }

    setVerifyingAdmin(true);
    try {
      const response = await fetch("/api/auth/verify-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Admin verified! You can now register as admin.");
        setIsAdminVerified(true);
        setUserRole("admin");
        setIsAdminVerifyModalOpen(false);
        setAdminEmail("");
      } else {
        message.error(
          data.message || "Admin verification failed. Invalid admin email."
        );
      }
    } catch (error) {
      message.error("An error occurred during admin verification");
      console.error("Admin verification error:", error);
    } finally {
      setVerifyingAdmin(false);
    }
  };

  const handleModalCancel = () => {
    setIsAdminVerifyModalOpen(false);
    setAdminEmail("");
    setUserRole("customer");
  };

  const onFinish = async (values: any) => {
    if (userRole === "admin" && !isAdminVerified) {
      message.error("Please verify admin email first");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          address: values.address,
          role: userRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Registration successful! Please login.");
        router.push("/login");
      } else {
        message.error(data.message || "Registration failed");
      }
    } catch (error) {
      message.error("An error occurred during registration");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - FT Shop</title>
      </Head>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #00D4B1, #0066FF)",
          position: "relative",
          overflow: "hidden",
          padding: "40px 20px",
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
            width: "500px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            border: "none",
            zIndex: 1,
            maxHeight: "90vh",
            overflowY: "auto",
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
                display: "flex",
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
                Join FT Shop today
              </Text>
            </div>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: "30px" }}>
            <Text
              strong
              style={{ display: "block", marginBottom: "12px", color: "#333" }}
            >
              Register as:
            </Text>
            <Radio.Group
              value={userRole}
              onChange={handleRoleChange}
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
            {isAdminVerified && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <Text style={{ color: "#52c41a", fontSize: "14px" }}>
                  ✓ Admin verified
                </Text>
              </div>
            )}
          </div>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#0066FF" }} />}
                placeholder="Full Name"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e8e8e8",
                }}
              />
            </Form.Item>

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
                { min: 6, message: "Password must be at least 6 characters!" },
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

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#0066FF" }} />}
                placeholder="Confirm Password"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e8e8e8",
                }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: "#0066FF" }} />}
                placeholder="Phone Number"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e8e8e8",
                }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea
                // prefix={<HomeOutlined style={{ color: "#0066FF" }} />}
                placeholder="Address"
                rows={3}
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
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text style={{ color: "#666" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ color: "#0066FF", fontWeight: "bold" }}
              >
                Login
              </Link>
            </Text>
          </div>
        </Card>

        {/* Admin Verification Modal */}
        <Modal
          title={
            <div style={{ textAlign: "center" }}>
              <LockOutlined
                style={{
                  fontSize: "24px",
                  color: "#0066FF",
                  marginBottom: "10px",
                }}
              />
              <div
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                Admin Verification Required
              </div>
            </div>
          }
          open={isAdminVerifyModalOpen}
          onCancel={handleModalCancel}
          footer={null}
          centered
          width={450}
        >
          <div style={{ padding: "20px 0" }}>
            <Text
              style={{
                display: "block",
                marginBottom: "20px",
                color: "#666",
                textAlign: "center",
              }}
            >
              To register as an admin, please enter an existing admin's email
              address for verification.
            </Text>

            <Input
              prefix={<MailOutlined style={{ color: "#0066FF" }} />}
              placeholder="Existing Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              size="large"
              style={{
                borderRadius: "8px",
                border: "2px solid #e8e8e8",
                marginBottom: "20px",
              }}
              onPressEnter={handleAdminVerification}
            />

            <Button
              type="primary"
              block
              size="large"
              loading={verifyingAdmin}
              onClick={handleAdminVerification}
              style={{
                height: "45px",
                fontSize: "16px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 102, 255, 0.3)",
              }}
            >
              Verify Admin
            </Button>

            <Button
              block
              size="large"
              onClick={handleModalCancel}
              style={{
                height: "45px",
                fontSize: "16px",
                marginTop: "10px",
                borderRadius: "8px",
                border: "2px solid #e8e8e8",
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal>

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

export default Register;
