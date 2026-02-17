import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Group } from "./Group.js";

export const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING, allowNull: false },
  seen: { type: DataTypes.BOOLEAN, defaultValue: false },
  cleared_by_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Notification.belongsTo(User, { foreignKey: "user_id" });
Notification.belongsTo(Group, { foreignKey: "group_id", allowNull: true });
