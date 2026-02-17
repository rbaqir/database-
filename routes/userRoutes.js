import express from "express";
import { getOnlineUsers, makeTeamLead, registerUser, updateProfile } from "../controllers/userController.js";
import { authentication } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const userRouter = express.Router();

userRouter.post("/make-teamlead", 
    authentication,
    authorize("admin"),
    makeTeamLead
)

userRouter.get("/online-users", authentication, getOnlineUsers)
userRouter.post("/register", registerUser);
userRouter.put("/update-profile", authentication, updateProfile);
export {userRouter}