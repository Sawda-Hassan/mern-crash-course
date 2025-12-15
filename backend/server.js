import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"; // ✅ ADD THIS

// Load .env
dotenv.config({ path: path.resolve("./.env") });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Debug
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// ✅ REGISTER PRODUCT ROUTES (THIS FIXES EVERYTHING)
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
