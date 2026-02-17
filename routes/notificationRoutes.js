import express from "express";
import {
  clearNotification,
  getMyNotifications,
  markAsSeen,
} from "../controllers/notificationController.js";
import { authentication } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const notificationRouter = express.Router();

notificationRouter.get("/", authentication, getMyNotifications);
notificationRouter.put("/:id/seen", authentication, markAsSeen);

notificationRouter.put(
  "/:id/clear",
  authentication,
  authorize("admin"),
  clearNotification,
);

export { notificationRouter };
