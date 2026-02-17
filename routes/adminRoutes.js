import express from "express";
import { authentication } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import {
  getAllGroups,
  getAllMessages,
  getAllUsers,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/users", authentication, authorize("admin"), getAllUsers);
adminRouter.get("/groups", authentication, authorize("admin"), getAllGroups);
adminRouter.get(
  "/messages",
  authentication,
  authorize("admin"),
  getAllMessages,
);

export { adminRouter };
