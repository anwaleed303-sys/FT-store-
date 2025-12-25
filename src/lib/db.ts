import { getDb } from "./mongodb";
import { User, Order, Product } from "../../types/index";
import { MOCK_PRODUCTS } from "../../utils/Constants";
import { ObjectId } from "mongodb";

// Initialize products collection with mock data
export const initializeProducts = async () => {
  const db = await getDb();
  const productsCollection = db.collection("products");

  const count = await productsCollection.countDocuments();
  if (count === 0) {
    await productsCollection.insertMany(MOCK_PRODUCTS);
    console.log("Products initialized with mock data");
  }
};

export const db = {
  // User operations
  users: {
    findByEmail: async (email: string): Promise<any | null> => {
      const database = await getDb();
      return database.collection("users").findOne({ email });
    },

    findById: async (id: string): Promise<User | null> => {
      const database = await getDb();
      const result = await database
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      return result as User | null;
    },

    create: async (user: any): Promise<any> => {
      const database = await getDb();
      const result = await database.collection("users").insertOne(user);
      return { ...user, _id: result.insertedId };
    },

    update: async (id: string, data: Partial<User>): Promise<User | null> => {
      const database = await getDb();
      await database
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: data });
      const result = await database
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      return result as User | null;
    },
  },

  // Product operations
  products: {
    findAll: async (): Promise<Product[]> => {
      const database = await getDb();
      await initializeProducts();
      const results = await database.collection("products").find({}).toArray();
      return results as unknown as Product[];
    },

    findById: async (id: string): Promise<Product | null> => {
      const database = await getDb();
      const result = await database.collection("products").findOne({ id });
      return result as Product | null;
    },

    findByCategory: async (category: string): Promise<Product[]> => {
      const database = await getDb();
      let results;
      if (category === "All") {
        results = await database.collection("products").find({}).toArray();
      } else {
        results = await database
          .collection("products")
          .find({ category })
          .toArray();
      }
      return results as unknown as Product[];
    },

    search: async (query: string): Promise<Product[]> => {
      const database = await getDb();
      const lowerQuery = query.toLowerCase();
      const results = await database
        .collection("products")
        .find({
          $or: [
            { name: { $regex: lowerQuery, $options: "i" } },
            { description: { $regex: lowerQuery, $options: "i" } },
          ],
        })
        .toArray();
      return results as unknown as Product[];
    },
  },

  // Order operations
  orders: {
    create: async (order: Order): Promise<Order> => {
      const database = await getDb();
      const { _id, ...orderWithoutId } = order;

      const result = await database
        .collection("orders")
        .insertOne(orderWithoutId);

      // Return the order with the MongoDB-generated _id converted to string
      return {
        ...orderWithoutId,
        _id: result.insertedId.toString(),
      } as Order;
    },
    findByUserId: async (userId: string): Promise<Order[]> => {
      const database = await getDb();
      const results = await database
        .collection("orders")
        .find({ userId })
        .toArray();
      return results as unknown as Order[];
    },

    findById: async (id: string): Promise<Order | null> => {
      const database = await getDb();
      const result = await database.collection("orders").findOne({ id });
      return result as Order | null;
    },

    updateStatus: async (
      id: string,
      status: Order["status"]
    ): Promise<Order | null> => {
      const database = await getDb();
      await database
        .collection("orders")
        .updateOne({ id }, { $set: { status } });
      const result = await database.collection("orders").findOne({ id });
      return result as Order | null;
    },
  },
};
