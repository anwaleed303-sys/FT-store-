// import type { NextApiRequest, NextApiResponse } from "next";
// import { db } from "../../../lib/db";
// import { hashPassword } from "../../../lib/auth";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { name, email, password, phone, address, role } = req.body;

//     // Validation
//     if (!name || !email || !password || !phone || !address || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 6 characters long" });
//     }

//     // Check if user already exists
//     const existingUser = await db.users.findByEmail(email);
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "User with this email already exists" });
//     }

//     // Hash password
//     const hashedPassword = await hashPassword(password);

//     // Create user
//     const newUser = await db.users.create({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       role,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     // Remove password from response
//     const { password: _, ...userWithoutPassword } = newUser;

//     return res.status(201).json({
//       message: "Registration successful",
//       user: userWithoutPassword,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password, phone, address, role } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Validate role
    if (role !== "customer" && role !== "admin") {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await db.users.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: "Registration successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
