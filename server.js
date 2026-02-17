import express from "express";
import { sequelize } from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config({
  path: "./.env",
});

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User registered online:", userId);
  });

  socket.on("disconnect", () => {
    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) onlineUsers.delete(key);
    }

    console.log("User disconnected:", socket.id);
  });
});


import { adminRouter } from "./routes/adminRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { groupRouter } from "./routes/groupRoutes.js";
import { messageRouter } from "./routes/messageRoutes.js";
import { notificationRouter } from "./routes/notificationRoutes.js";
import { mediaRouter } from "./routes/mediaRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

import { seedRoles } from "./utils/seedRoles.js";

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);

app.use("/api/messages", (req, res, next) => {
  req.app.set("io", io);
  req.app.set("onlineUsers", onlineUsers);
  next();
}, messageRouter);

app.use("/api/notifications", notificationRouter);
app.use("/api/media", mediaRouter);
app.use("/api/admin", adminRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: true }).then(() => {
  seedRoles();

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
