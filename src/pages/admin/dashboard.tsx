import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Table,
  Space,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  ShopOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import type { UploadFile } from "antd/es/upload/interface";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

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

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      message.error("Please login to access this page");
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== "admin") {
      message.error("Access denied. Admin only.");
      router.push("/customer/products");
      return;
    }

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

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setModalVisible(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        message.success("Product deleted successfully");
        fetchProducts();
      } else {
        message.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("An error occurred while deleting the product");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products/create";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(
          editingProduct
            ? "Product updated successfully"
            : "Product added successfully"
        );
        setModalVisible(false);
        form.resetFields();
        fetchProducts();
      } else {
        message.error("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      message.error("An error occurred while saving the product");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => (
        <div
          style={{
            width: "60px",
            height: "60px",
            background: `url(${url}) center/cover`,
            borderRadius: "8px",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number, record: Product) =>
        `Rs. ${price} / ${record.unit}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
            style={{
              background: "linear-gradient(135deg, #0066FF, #00D4B1)",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.id)}
            style={{ borderRadius: "6px" }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard - FT Shop</title>
      </Head>
      <Layout>
        <div
          style={{
            padding: "40px 50px",
            background: "#f8f9fa",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Title
              level={2}
              style={{
                margin: 0,
                background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <ShopOutlined /> Admin Dashboard
            </Title>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleAddProduct}
              style={{
                background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                border: "none",
                borderRadius: "8px",
                height: "50px",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0, 102, 255, 0.3)",
              }}
            >
              Add New Product
            </Button>
          </div>

          {/* Statistics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: "30px" }}>
            <Col xs={24} sm={12} md={8}>
              <Card
                style={{
                  borderRadius: "12px",
                  border: "2px solid #0066FF",
                  background:
                    "linear-gradient(135deg, rgba(0, 102, 255, 0.05), rgba(0, 212, 177, 0.05))",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <AppstoreOutlined
                    style={{
                      fontSize: "40px",
                      color: "#0066FF",
                      marginBottom: "12px",
                    }}
                  />
                  <Title level={2} style={{ margin: 0, color: "#0066FF" }}>
                    {products.length}
                  </Title>
                  <Text style={{ fontSize: "16px", color: "#666" }}>
                    Total Products
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                style={{
                  borderRadius: "12px",
                  border: "2px solid #00D4B1",
                  background:
                    "linear-gradient(135deg, rgba(0, 212, 177, 0.05), rgba(0, 102, 255, 0.05))",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <ShopOutlined
                    style={{
                      fontSize: "40px",
                      color: "#00D4B1",
                      marginBottom: "12px",
                    }}
                  />
                  <Title level={2} style={{ margin: 0, color: "#00D4B1" }}>
                    {products.filter((p) => p.stock > 0).length}
                  </Title>
                  <Text style={{ fontSize: "16px", color: "#666" }}>
                    In Stock
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                style={{
                  borderRadius: "12px",
                  border: "2px solid #FF6B6B",
                  background: "rgba(255, 107, 107, 0.05)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <DeleteOutlined
                    style={{
                      fontSize: "40px",
                      color: "#FF6B6B",
                      marginBottom: "12px",
                    }}
                  />
                  <Title level={2} style={{ margin: 0, color: "#FF6B6B" }}>
                    {products.filter((p) => p.stock < 10).length}
                  </Title>
                  <Text style={{ fontSize: "16px", color: "#666" }}>
                    Low Stock
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Products Table */}
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Title level={4} style={{ marginBottom: "20px" }}>
              All Products
            </Title>
            <Table
              columns={columns}
              dataSource={products}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </div>

        {/* Add/Edit Product Modal */}
        <Modal
          title={
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </div>
          }
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ marginTop: "20px" }}
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input
                placeholder="Enter product name"
                style={{ borderRadius: "8px", border: "2px solid #e8e8e8" }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Enter product description"
                style={{ borderRadius: "8px", border: "2px solid #e8e8e8" }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Price (Rs.)"
                  rules={[{ required: true, message: "Please enter price" }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="0"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "2px solid #e8e8e8",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="stock"
                  label="Stock Quantity"
                  rules={[
                    { required: true, message: "Please enter stock quantity" },
                  ]}
                >
                  <InputNumber
                    min={0}
                    placeholder="0"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "2px solid #e8e8e8",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please select category" },
                  ]}
                >
                  <Select
                    placeholder="Select category"
                    style={{ borderRadius: "8px" }}
                  >
                    <Option value="Vegetables">Vegetables</Option>
                    <Option value="Fruits">Fruits</Option>
                    <Option value="Dairy">Dairy</Option>
                    <Option value="Meat">Meat</Option>
                    <Option value="Bakery">Bakery</Option>
                    <Option value="Beverages">Beverages</Option>
                    <Option value="Snacks">Snacks</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="unit"
                  label="Unit"
                  rules={[{ required: true, message: "Please select unit" }]}
                >
                  <Select
                    placeholder="Select unit"
                    style={{ borderRadius: "8px" }}
                  >
                    <Option value="kg">Kilogram (kg)</Option>
                    <Option value="g">Gram (g)</Option>
                    <Option value="L">Liter (L)</Option>
                    <Option value="ml">Milliliter (ml)</Option>
                    <Option value="pcs">Pieces (pcs)</Option>
                    <Option value="dozen">Dozen</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="imageUrl"
              label="Image URL"
              rules={[{ required: true, message: "Please enter image URL" }]}
            >
              <Input
                placeholder="https://example.com/image.jpg"
                style={{ borderRadius: "8px", border: "2px solid #e8e8e8" }}
              />
            </Form.Item>

            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => {
                    setModalVisible(false);
                    form.resetFields();
                  }}
                  style={{ borderRadius: "8px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default AdminDashboard;
