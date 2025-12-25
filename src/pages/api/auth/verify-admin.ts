import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists and is an admin
    const admin = await db.users.findByEmail(email);

    if (!admin) {
      return res.status(404).json({ message: "Admin email not found" });
    }

    if (admin.role !== "admin") {
      return res
        .status(403)
        .json({ message: "This email does not belong to an admin" });
    }

    return res.status(200).json({
      message: "Admin verified successfully",
      verified: true,
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
