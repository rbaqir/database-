import { Role } from "../models/Role.js";
import { User } from "../models/User.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../utils/CookieOptions.js";

const makeTeamLead = AsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const teamLeadRole = await Role.findOne({ where: { name: "team_lead" } });
  if (!teamLeadRole) {
    return res.status(400).json({ message: "Team Lead role not found" });
  }
  await User.update({ role_id: teamLeadRole.id }, { where: { id: userId } });

  res.json({ message: "User promoted to Team Lead successfully " });
});

const getOnlineUsers = AsyncHandler(async (req, res) => {
  const onlineIds = Array.from(req.app.get("onlineUsers").key());
  res.json({ onlineUsers: onlineIds });
});

const registerUser = AsyncHandler(async (req, res) => {
  console.log("Register route hit");
  const { username, email, password, role_id, department_id } = req.body;

  const basicRole = await Role.findOne({ where: { name: "basic_user" } });

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
    role_id: basicRole.id,
    department_id,
  });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await user.update({ refreshToken }, { hooks: false });

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  res.json({ message: "User registered successfully", user });
});

const updateProfile = AsyncHandler(async (req, res) => {
  const { username, email } = req.body;
  await User.update({ username, email }, { where: { id: req.user.id } });
  res.json({ message: "Profile updated successfully" });
});

export { makeTeamLead, getOnlineUsers, registerUser, updateProfile };
