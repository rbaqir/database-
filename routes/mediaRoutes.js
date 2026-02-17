import express from "express";
import { uploadMedia } from "../controllers/mediaController.js";
import { authentication } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import { upload } from "../utils/multer.js";

const mediaRouter = express.Router();

mediaRouter.post(
  "/upload",
  authentication,
  authorize("basic_user", "team_lead", "admin"),
  upload.single("file"),
  uploadMedia,
);

export { mediaRouter };
