import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  List,
  Divider,
  Space,
  message,
  Result,
} from "antd";
import {
  CheckCircleOutlined,
  DownloadOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import jsPDF from "jspdf";

const { Title, Text } = Typography;

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      message.error("Please login to access this page");
      router.push("/login");
      return;
    }

    // Get cart from localStorage or session
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      message.warning("Your cart is empty");
      router.push("/customer/products");
    }

    setUser(JSON.parse(userData));
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header with gradient effect (simulated with colors)
    doc.setFillColor(0, 102, 255);
    doc.rect(0, 0, pageWidth, 40, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("FT SHOP", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("Premium Grocery Store", pageWidth / 2, 30, { align: "center" });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Order Details
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("ORDER BILL", 20, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${orderId}`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 77);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 84);

    // Customer Details
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details:", 20, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${user?.name}`, 20, 107);
    doc.text(`Email: ${user?.email}`, 20, 114);
    doc.text(`Phone: ${user?.phone}`, 20, 121);

    // Table Header
    let yPos = 140;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos - 7, pageWidth - 40, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Item", 25, yPos);
    doc.text("Qty", 110, yPos);
    doc.text("Price", 135, yPos);
    doc.text("Total", 165, yPos);

    // Table Content
    yPos += 10;
    doc.setFont("helvetica", "normal");
    cart.forEach((item) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(item.name, 25, yPos);
      doc.text(`${item.quantity} ${item.unit}`, 110, yPos);
      doc.text(`Rs. ${item.price}`, 135, yPos);
      doc.text(`Rs. ${(item.price * item.quantity).toFixed(2)}`, 165, yPos);
      yPos += 8;
    });

    // Total
    yPos += 10;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("TOTAL:", 135, yPos);
    doc.setTextColor(0, 102, 255);
    doc.text(`Rs. ${getTotalPrice().toFixed(2)}`, 165, yPos);
    doc.setTextColor(0, 0, 0);

    // Payment Details
    yPos += 20;
    doc.setFillColor(245, 250, 255);
    doc.rect(20, yPos - 5, pageWidth - 40, 40, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details:", 25, yPos + 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("JazzCash Number: 03216674889", 25, yPos + 15);
    doc.text("Account Name: Amana Shahzad", 25, yPos + 22);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Please transfer the amount to the above JazzCash number",
      25,
      yPos + 32
    );

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for shopping with FT Shop!", pageWidth / 2, footerY, {
      align: "center",
    });
    doc.text(
      "For support: support@ftshop.com | +92 3216674889",
      pageWidth / 2,
      footerY + 5,
      { align: "center" }
    );

    // Save PDF
    doc.save(`FT-Shop-Order-${orderId}.pdf`);
    message.success("Bill PDF downloaded successfully!");
  };

  const handlePlaceOrder = async () => {
    try {
      const generatedOrderId = `ORD-${Date.now()}`;
      setOrderId(generatedOrderId);

      // Save order to backend (you can implement this API)
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          orderId: generatedOrderId,
          items: cart,
          total: getTotalPrice(),
          userId: user._id,
        }),
      });

      if (response.ok) {
        setOrderPlaced(true);
        localStorage.removeItem("cart");
        message.success("Order placed successfully!");
      } else {
        message.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      message.error("An error occurred while placing the order");
    }
  };

  if (orderPlaced) {
    return (
      <>
        <Head>
          <title>Order Placed - FT Shop</title>
        </Head>
        <Layout>
          <div
            style={{
              padding: "80px 50px",
              background: "#f8f9fa",
              minHeight: "calc(100vh - 70px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                maxWidth: "600px",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Result
                status="success"
                icon={
                  <CheckCircleOutlined
                    style={{
                      fontSize: "80px",
                      background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                }
                title={
                  <Title level={2} style={{ margin: "20px 0" }}>
                    Order Placed Successfully!
                  </Title>
                }
                subTitle={
                  <div>
                    <Text
                      style={{
                        fontSize: "16px",
                        color: "#666",
                        display: "block",
                        marginBottom: "20px",
                      }}
                    >
                      Your order ID: <strong>{orderId}</strong>
                    </Text>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        display: "block",
                      }}
                    >
                      Please download your bill and make payment to complete the
                      order.
                    </Text>
                  </div>
                }
                extra={
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      key="download"
                      type="primary"
                      size="large"
                      icon={<DownloadOutlined />}
                      onClick={generatePDF}
                      style={{
                        background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                        border: "none",
                        borderRadius: "8px",
                        height: "50px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Download Bill PDF
                    </Button>
                    <Button
                      key="continue"
                      size="large"
                      icon={<ShoppingOutlined />}
                      onClick={() => router.push("/customer/products")}
                      style={{
                        borderRadius: "8px",
                        height: "50px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "2px solid #0066FF",
                        color: "#0066FF",
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                }
              />
            </Card>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - FT Shop</title>
      </Head>
      <Layout>
        <div
          style={{
            padding: "40px 50px",
            background: "#f8f9fa",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Title
              level={2}
              style={{
                marginBottom: "30px",
                background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Checkout
            </Title>

            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                marginBottom: "24px",
              }}
            >
              <Title level={4}>Order Summary</Title>
              <List
                dataSource={cart}
                renderItem={(item) => (
                  <List.Item>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Text strong>{item.name}</Text>
                        <Text
                          style={{
                            color: "#666",
                            display: "block",
                            fontSize: "14px",
                          }}
                        >
                          {item.quantity} {item.unit} × Rs. {item.price}
                        </Text>
                      </div>
                      <Text
                        strong
                        style={{ fontSize: "16px", color: "#0066FF" }}
                      >
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                }}
              >
                <Text strong>Total:</Text>
                <Text
                  strong
                  style={{
                    fontSize: "24px",
                    background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Rs. {getTotalPrice().toFixed(2)}
                </Text>
              </div>
            </Card>

            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                background:
                  "linear-gradient(135deg, rgba(0, 102, 255, 0.05), rgba(0, 212, 177, 0.05))",
              }}
            >
              <Title level={4} style={{ textAlign: "center" }}>
                Payment Information
              </Title>{" "}
              <br />
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "18px",
                      color: "#0066FF",
                    }}
                  >
                    <strong>Number:</strong> 03216674889
                  </Text>
                  <Text style={{ fontSize: "16px" }}>
                    <strong>Account Holder:</strong> Amana Shahzad
                  </Text>
                </div>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  After placing the order, you'll receive a PDF bill. Please
                  transfer the amount to the above JazzCash number and keep the
                  transaction receipt for your records.
                </Text>
              </Space>
            </Card>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button
                type="primary"
                size="large"
                onClick={handlePlaceOrder}
                style={{
                  background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                  border: "none",
                  borderRadius: "8px",
                  height: "60px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  boxShadow: "0 4px 16px rgba(0, 102, 255, 0.3)",
                }}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
