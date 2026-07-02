import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser";
import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import dotenv from "dotenv"
import path from "path"

import authRoutes from './routes/authRoute.js';

import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
}
app.use(express.json())
app.use(rateLimiter)
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});
app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port:${PORT}`)
    })
})

