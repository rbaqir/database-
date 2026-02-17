import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Group } from "./Group.js";
import { Media } from "./Media.js";

export const Message = sequelize.define("Message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  read_by: { type: DataTypes.JSON, defaultValue: []}
});

Message.belongsTo(Group, { foreignKey: "group_id" });
Message.belongsTo(User, { as: "sender", foreignKey: "sender_id" });
Message.belongsTo(Media, { foreignKey: "media_id", allowNull: true });
