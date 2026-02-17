import { GroupMember } from "../models/GroupMember.js";
import { Message } from "../models/Message.js";
import { Notification } from "../models/Notification.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const sendMessage = (io, onlineUsers) =>
  AsyncHandler(async (req, res) => {
    const { content, group_id } = req.body;
    const message = await Message.create({
      content,
      group_id,
      sender_id: req.user.id,
    });

    const members = await GroupMember.findAll({
      where: { group_id },
    });

    for (let member of members) {
      if (member.user_id !== req.user.id) {
        await Notification.create({
          message: "New message in group",
          user_id: member.user_id,
          group_id,
        });

        const socketId = onlineUsers.get(member.user_id);
        if(socketId) {
          io.to(socketId).emit("new_message", message)
        }
      }
    }

    res.json({ message: "Message sent successfully", data: message });
  });

const getMessages = AsyncHandler(async (req, res) => {
  const {groupId} = req.params;

  const messages = await Message.findAll({
    where: {group_id: groupId},
    include: ["sender", "Media"],
    order: [["createdAt", "ASC"]],
  });
  res.json(messages);
})

export { sendMessage, getMessages };
