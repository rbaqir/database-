import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./Role.js";
import { Department } from "./Department.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class User extends Model {
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  generateAccessToken() {
    return jwt.sign(
      { id: this.id, role_id: this.role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
  }

  generateRefreshToken() {
    return jwt.sign(
      { id: this.id }, 
      process.env.REFRESH_TOKEN_SECRET, 
      {expiresIn: "7d",});
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    department_id: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

User.belongsTo(Role, { foreignKey: "role_id", as: "Role" });
User.belongsTo(Department, { foreignKey: "department_id" });

export { User };
