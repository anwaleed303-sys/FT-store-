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
    // Verify token
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const { orderId, items, total, userId } = req.body;

    // Validation
    if (!orderId || !items || !total || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = await getDb();
    const ordersCollection = db.collection("orders");

    // Create order
    const newOrder = {
      id: orderId,
      orderId,
      userId,
      items,
      total,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ordersCollection.insertOne(newOrder);

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
