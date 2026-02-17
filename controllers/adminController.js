import { Group } from "../models/Group.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const getAllUsers = AsyncHandler(async (req, res) => {
  const users = await User.findAll({ include: ["Role", "Department"] });
  res.json(users);
});

const getAllGroups = AsyncHandler(async (req, res) => {
  const groups = await Group.findAll({ include: ["creator"] });
  res.json(groups);
});

const getAllMessages = AsyncHandler(async (req, res) => {
  const messages = await Message.findAll({
    include: ["sender", "Group", "Media"],
  });
  res.json(messages);
});

export { getAllUsers, getAllGroups, getAllMessages };
