import { Media } from "../models/Media.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const uploadMedia = AsyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const media = await Media.create({
    url: `/uploads/${req.file.filename}`,
    type: req.file.mimetype,
    upload_by: req.user.id,
  });

  res.json({ message: "Media uploaded successfully", media });
});
