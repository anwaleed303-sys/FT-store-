import React from "react";
import { Layout as AntLayout, Button, Popover } from "antd";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Content, Footer } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    router.push("/");
  };

  return (
    <AntLayout style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1000,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 102, 255, 0.1)",
          padding: "0 50px",
          height: "70px",
        }}
      >
        {/* Left Side - Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                  boxShadow: "0 4px 12px rgba(0, 102, 255, 0.3)",
                }}
              >
                FT
              </div>
            </div>
          </Link>
        </div>

        {/* Right Side - User Info or Login/Signup */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {user ? (
            // Logged in user view with Popover
            <Popover
              content={
                <div style={{ minWidth: "200px" }}>
                  <div
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid #f0f0f0",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#0066FF",
                        marginBottom: "4px",
                      }}
                    >
                      {user.name}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#666",
                      }}
                    >
                      {user.email}
                    </div>
                    {user.role && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#999",
                          marginTop: "4px",
                          textTransform: "capitalize",
                        }}
                      >
                        Role: {user.role}
                      </div>
                    )}
                  </div>
                  <Button
                    type="text"
                    danger
                    block
                    onClick={handleLogout}
                    style={{
                      height: "36px",
                      fontSize: "14px",
                      fontWeight: "500",
                      borderRadius: "6px",
                    }}
                  >
                    Logout
                  </Button>
                </div>
              }
              trigger="click"
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#0066FF",
                  border: "2px solid transparent",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "2px solid #0066FF";
                  e.currentTarget.style.background = "rgba(0, 102, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "2px solid transparent";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {user.name}
              </Button>
            </Popover>
          ) : (
            // Not logged in view
            <>
              <Button
                type="text"
                icon={<UserOutlined />}
                onClick={() => router.push("/login")}
                style={{
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#0066FF",
                  border: "2px solid transparent",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "2px solid #0066FF";
                  e.currentTarget.style.background = "rgba(0, 102, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "2px solid transparent";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Login
              </Button>
              <Button
                type="primary"
                onClick={() => router.push("/register")}
                style={{
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "500",
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
            </>
          )}
        </div>
      </Header>

      <Content
        style={{
          marginTop: "70px",
          background: "#ffffff",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        {children}
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "#f8f9fa",
          borderTop: "1px solid #e8e8e8",
          padding: "24px 50px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          FT Shop © {new Date().getFullYear()} - Your Premium Grocery Store
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout;
