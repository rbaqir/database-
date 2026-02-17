import { sequelize } from "../config/db.js";
import { Department } from "./Department.js";
import { Group } from "./Group.js";
import { GroupMember } from "./GroupMember.js";
import { Media } from "./Media.js";
import { Message } from "./Message.js";
import { Notification } from "./Notification.js";
import { Role } from "./Role.js";
import { User } from "./User.js";

export const db = sequelize;