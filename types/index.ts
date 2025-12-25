export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "customer" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  unit: string;
  userId?: string;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  id: string;
  orderId: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface CartItem extends Omit<Product, "createdAt" | "updatedAt"> {
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
