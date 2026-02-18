import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { authentication } from "../middlewares/auth.js";

const messageRouter = express.Router();

messageRouter.post("/send", authentication, (req, res) =>
  sendMessage(req.app.get("io"), req.app.get("onlineUsers"))(req, res)
);

messageRouter.get("/group/:groupId", authentication, getMessages)

export { messageRouter };
