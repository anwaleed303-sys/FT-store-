import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "../../../lib/mongodb";
import { verifyToken } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Verify admin token
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  const db = await getDb();
  const productsCollection = db.collection("products");

  if (req.method === "PUT") {
    try {
      const { name, description, price, category, stock, unit, imageUrl } =
        req.body;

      const updateData = {
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        unit,
        imageUrl,
        updatedAt: new Date(),
      };

      const result = await productsCollection.updateOne(
        { id },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: "Product updated successfully",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await productsCollection.deleteOne({ id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
