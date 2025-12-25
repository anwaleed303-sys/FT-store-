import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "../../../lib/mongodb";
import { verifyToken } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Verify admin token
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { name, description, price, category, stock, unit, imageUrl } =
      req.body;

    // Validation
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !stock ||
      !unit ||
      !imageUrl
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = await getDb();
    const productsCollection = db.collection("products");

    // Create product with unique ID
    const productId = `prod_${Date.now()}`;
    const newProduct = {
      id: productId,
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      unit,
      imageUrl,
      userId: decoded.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await productsCollection.insertOne(newProduct);

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
