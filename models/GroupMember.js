import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Group } from "./Group.js";
import { User } from "./User.js";

export const GroupMember = sequelize.define("GroupMember", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

GroupMember.belongsTo(Group, { foreignKey: "group_id" });
GroupMember.belongsTo(User, { foreignKey: "user_id" });
GroupMember.belongsTo(User, { as: "added_by", foreignKey: "added_id" });
