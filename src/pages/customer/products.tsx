import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  InputNumber,
  message,
  Badge,
  Drawer,
  List,
  Divider,
  Space,
  Empty,
} from "antd";
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  saveCartToLocalStorage,
  getCartFromLocalStorage,
} from "../../../utils/cartHelpers";

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  unit: string;
}

interface CartItem extends Product {
  quantity: number;
}

const CustomerProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartVisible, setCartVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please login to access this page");
      router.push("/login");
      return;
    }

    // Load cart from localStorage
    const savedCart = getCartFromLocalStorage();
    setCart(savedCart);

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let newCart: CartItem[];

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        newCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(newCart);
        saveCartToLocalStorage(newCart);
        message.success("Quantity updated in cart");
      } else {
        message.warning("Not enough stock available");
        return;
      }
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      saveCartToLocalStorage(newCart);
      message.success("Product added to cart");
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && quantity > product.stock) {
      message.warning("Not enough stock available");
      return;
    }
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const newCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      setCart(newCart);
      saveCartToLocalStorage(newCart);
    }
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    saveCartToLocalStorage(newCart);
    message.info("Product removed from cart");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      message.warning("Your cart is empty");
      return;
    }
    saveCartToLocalStorage(cart);
    router.push("/customer/checkout");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Head>
        <title>Products - FT Shop</title>
      </Head>
      <Layout>
        <div
          style={{
            padding: "40px 50px",
            background: "#f8f9fa",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {/* Header with Cart Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Title
              level={2}
              style={{
                margin: 0,
                background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "clamp(20px, 5vw, 32px)",
              }}
            >
              <ShoppingOutlined /> All Products
            </Title>
            <Badge count={totalItems} offset={[10, 0]}>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={() => setCartVisible(true)}
                style={{
                  background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                  border: "none",
                  borderRadius: "8px",
                  height: "50px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0, 102, 255, 0.3)",
                }}
              >
                View Cart
              </Button>
            </Badge>
          </div>

          {/* Products Grid */}
          <Row gutter={[24, 24]}>
            {products.map((product) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <div
                        style={{
                          height: "200px",
                          background: `url(${product.imageUrl}) center/cover`,
                          position: "relative",
                          borderRadius: "12px 12px 0 0",
                        }}
                      >
                        {product.stock < 10 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              background: "rgba(255, 59, 48, 0.9)",
                              color: "white",
                              padding: "4px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            Low Stock
                          </div>
                        )}
                        {cartItem && (
                          <div
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              background: "rgba(0, 102, 255, 0.9)",
                              color: "white",
                              padding: "4px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            In Cart: {cartItem.quantity}
                          </div>
                        )}
                      </div>
                    }
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e8e8e8",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <Meta
                      title={
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#333",
                          }}
                        >
                          {product.name}
                        </div>
                      }
                      description={
                        <div>
                          <Paragraph
                            ellipsis={{ rows: 2 }}
                            style={{
                              color: "#666",
                              fontSize: "14px",
                              marginBottom: "12px",
                            }}
                          >
                            {product.description}
                          </Paragraph>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "12px",
                            }}
                          >
                            <div>
                              <Text
                                strong
                                style={{
                                  fontSize: "20px",
                                  background:
                                    "linear-gradient(135deg, #0066FF, #00D4B1)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }}
                              >
                                Rs. {product.price}
                              </Text>
                              <Text
                                style={{
                                  fontSize: "12px",
                                  color: "#999",
                                  display: "block",
                                }}
                              >
                                per {product.unit}
                              </Text>
                            </div>
                            <Text style={{ fontSize: "14px", color: "#666" }}>
                              Stock: {product.stock}
                            </Text>
                          </div>
                          <Button
                            type="primary"
                            block
                            icon={<PlusOutlined />}
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            style={{
                              background:
                                "linear-gradient(135deg, #0066FF, #00D4B1)",
                              border: "none",
                              borderRadius: "8px",
                              height: "40px",
                              fontWeight: "bold",
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        {/* Cart Drawer */}
        <Drawer
          title={
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              <ShoppingCartOutlined /> Your Cart
            </div>
          }
          placement="right"
          onClose={() => setCartVisible(false)}
          open={cartVisible}
          width={450}
          footer={
            <div style={{ textAlign: "right" }}>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <span>Total:</span>
                  <span
                    style={{
                      background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Rs. {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleCheckout}
                  style={{
                    background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                    border: "none",
                    borderRadius: "8px",
                    height: "50px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Space>
            </div>
          }
        >
          {cart.length === 0 ? (
            <Empty
              description="Your cart is empty"
              style={{ marginTop: "100px" }}
            />
          ) : (
            <List
              dataSource={cart}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  style={{
                    padding: "16px 0",
                    borderBottom: "1px solid #e8e8e8",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          background: `url(${item.imageUrl}) center/cover`,
                          borderRadius: "8px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text
                          strong
                          style={{ fontSize: "16px", display: "block" }}
                        >
                          {item.name}
                        </Text>
                        <Text style={{ color: "#666", fontSize: "14px" }}>
                          Rs. {item.price} / {item.unit}
                        </Text>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Space>
                        <Button
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          style={{ borderRadius: "6px" }}
                        />
                        <InputNumber
                          size="small"
                          min={1}
                          max={item.stock}
                          value={item.quantity}
                          onChange={(value) =>
                            updateQuantity(item.id, value || 1)
                          }
                          style={{ width: "60px" }}
                        />
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          style={{ borderRadius: "6px" }}
                        />
                      </Space>
                      <Space>
                        <Text
                          strong
                          style={{ fontSize: "16px", color: "#0066FF" }}
                        >
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <Button
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => removeFromCart(item.id)}
                          style={{ borderRadius: "6px" }}
                        />
                      </Space>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Drawer>
      </Layout>
    </>
  );
};

export default CustomerProducts;
