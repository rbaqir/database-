import express from "express";
import { addGroupMember, createGroup, deleteGroup, leaveGroup, removeGroupMember } from "../controllers/groupController.js";
import { authentication } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const groupRouter = express.Router();

groupRouter.post(
  "/create",
  authentication,
  authorize("team_lead", "admin"),
  createGroup,
);

groupRouter.post("/add-member", authentication, authorize("team_lead", "admin"), addGroupMember);
groupRouter.post("/remove-member", authentication, authorize("team_lead", "admin"), removeGroupMember);
groupRouter.post("/leave", authentication, leaveGroup);
groupRouter.post("/delete", authentication, authorize("team_lead", "admin"), deleteGroup);

export { groupRouter };
