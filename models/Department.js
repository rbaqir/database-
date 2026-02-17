import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Department = sequelize.define("Department", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});
