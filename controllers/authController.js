import { User } from "../models/User.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/CookieOptions.js";

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await user.update({ refreshToken }, { hooks: false });

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  res.json({ message: "Login successful", user });
});

const logout = AsyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.json({ message: "Logout successful" });
});

export { login, logout };
