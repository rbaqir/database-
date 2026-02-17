import { Group } from "../models/Group.js";
import { GroupMember } from "../models/GroupMember.js";
import { User } from "../models/User.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const createGroup = AsyncHandler(async (req, res) => {
  const { name, memberIds } = req.body;
  const creator = req.user;

  if (creator.Role.name === "team_lead") {
    const users = await User.findAll({ where: { id: memberIds } });

    for (const user of users) {
      if (user.department_id !== creator.department_id) {
        return res.status(400).json({
          message:
            "All members must belong to the same department as the creator.",
        });
      }
    }
  }

  const group = await Group.create({
    name,
    creator_id: creator.id,
  });

  await GroupMember.create({
    group_id: group.id,
    user_id: creator.id,
    added_by: creator.id,
  });

  for (const memberId of memberIds) {
    await GroupMember.create({
      group_id: group.id,
      user_id: memberId,
      added_by: creator.id,
    });
  }

  res.json({ message: "Group created successfully", group });
});

const addGroupMember = AsyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;
  await GroupMember.create({
    group_id: groupId,
    user_id: userId,
    added_by: req.user.id,
  });
  res.json({ message: "Member added successfully" });
});

const removeGroupMember = AsyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;
  await GroupMember.destroy({
    where: { group_id: groupId, user_id: userId },
  });
  res.json({ message: "Member removed successfully" });
});

const leaveGroup = AsyncHandler(async (req, res) => {
  await GroupMember.destroy({
    where: { group_id: req.body.groupId, user_id: req.user.id },
  });
  res.json({ message: "Left group successfully" });
});

const deleteGroup = AsyncHandler(async (req, res) => {
  await Group.destroy({
    where: { id: req.body.groupId },
  });
  res.json({ message: "Group deleted successfully" });
});

export {
  createGroup,
  addGroupMember,
  removeGroupMember,
  leaveGroup,
  deleteGroup,
};
