import express from "express";
import { login, logout } from "../controllers/authController.js";
import { authentication } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);

export { authRouter};
