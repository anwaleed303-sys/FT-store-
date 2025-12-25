import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Row,
  Col,
  Typography,
  Carousel,
  Spin,
  message,
} from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";

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

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const carouselItems = [
    {
      title: "Welcome to FT Shop",
      description: "Your Premium Grocery Store - Fresh Quality Every Day",
      gradient: "linear-gradient(135deg, #0066FF, #00D4B1)",
    },
    {
      title: "Fresh Vegetables",
      description: "Farm Fresh Vegetables Delivered to Your Door",
      gradient: "linear-gradient(135deg, #00D4B1, #0066FF)",
    },
    {
      title: "Organic Fruits",
      description: "Hand-Picked Organic Fruits for Healthy Living",
      gradient: "linear-gradient(135deg, #0066FF, #7B2FFF)",
    },
    {
      title: "Daily Essentials",
      description: "All Your Daily Needs in One Place",
      gradient: "linear-gradient(135deg, #FF6B6B, #0066FF)",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.description.toLowerCase().includes(value.toLowerCase()) ||
          product.category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductClick = (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning(
        "Please login or signup to view product details and place orders"
      );
      router.push("/login");
    } else {
      router.push(`/customer/products?selected=${productId}`);
    }
  };

  return (
    <>
      <Head>
        <title>FT Shop - Premium Grocery Store</title>
      </Head>
      <Layout>
        {/* Hero Carousel Section */}
        <div style={{ background: "#f8f9fa", padding: "40px 0" }}>
          <Carousel autoplay autoplaySpeed={3000}>
            {carouselItems.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    height: "350px",
                    background: item.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      color: "white",
                      zIndex: 2,
                      padding: "0 20px",
                    }}
                  >
                    <Title
                      level={1}
                      style={{
                        color: "white",
                        marginBottom: "20px",
                        fontSize: "48px",
                        fontWeight: "bold",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      {item.title}
                    </Title>
                    <Paragraph
                      style={{
                        color: "white",
                        fontSize: "20px",
                        margin: 0,
                        textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      {item.description}
                    </Paragraph>
                  </div>
                  {/* Animated Background Elements */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      right: "-10%",
                      width: "500px",
                      height: "500px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      animation: "float 6s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-30%",
                      left: "-5%",
                      width: "400px",
                      height: "400px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      animation: "float 8s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Search Bar Section */}
        <div style={{ padding: "40px 50px", background: "#ffffff" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Input
              size="large"
              placeholder="Search for products, categories..."
              prefix={
                <SearchOutlined
                  style={{ color: "#0066FF", fontSize: "20px" }}
                />
              }
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                borderRadius: "12px",
                border: "2px solid #e8e8e8",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                fontSize: "16px",
                padding: "12px 20px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#0066FF";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(0, 102, 255, 0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e8e8e8";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.05)";
              }}
            />
          </div>
        </div>

        {/* Products Section */}
        <div style={{ padding: "40px 50px", background: "#f8f9fa" }}>
          <Title
            level={2}
            style={{
              textAlign: "center",
              marginBottom: "40px",
              background: "linear-gradient(135deg, #0066FF, #00D4B1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            All Products
          </Title>

          {loading ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {filteredProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    hoverable
                    onClick={() => handleProductClick(product.id)}
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
                      </div>
                    }
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "2px solid transparent",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = "2px solid #0066FF";
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0, 102, 255, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "2px solid transparent";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.08)";
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
                            }}
                          >
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
                            <ShoppingCartOutlined
                              style={{
                                fontSize: "20px",
                                color: "#0066FF",
                              }}
                            />
                          </div>
                          <Text style={{ fontSize: "12px", color: "#999" }}>
                            per {product.unit}
                          </Text>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <Title level={3} style={{ color: "#999" }}>
                No products found
              </Title>
              <Text style={{ color: "#666" }}>
                Try adjusting your search criteria
              </Text>
            </div>
          )}
        </div>

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
      </Layout>
    </>
  );
};

export default MainPage;
