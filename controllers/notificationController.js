import { Notification } from "../models/Notification.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const getMyNotifications = AsyncHandler(async (req, res) => {
  const notifications = await Notification.findAll({
    where: {
      user_id: req.user.id,
    },
    order: [["createdAt", "DESC"]],
  });

  res.json(notifications);
});

const markAsSeen = AsyncHandler(async (req, res) => {
    const {id} = req.params;

    await Notification.update(
        {seen: true},
        {where: {id, user_id: req.user.id}}
    );
    res.json({message: "Notification marked as seen"});
})

const clearNotification = AsyncHandler(async (req, res) => {
    const {id} = req.params;

    await Notification.update(
        {cleared_by_admin: true},
        {where: {id}}
    );
    res.json({message: "Notification cleared by admin"});
})

export { getMyNotifications, markAsSeen, clearNotification };