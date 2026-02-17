import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { accessTokenCookieOptions } from "../utils/CookieOptions.js";

export const authentication = AsyncHandler(async (req, res, next) => {
    const {accessToken, refreshToken} = req.cookies;

    if(!accessToken && !refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findByPk(decoded.id, { include: ["Role"] });
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = user;
            return next();
        } catch (err) {
            return res.status(401).json({ message: "Access token is invalid or expired" });
        }
    }

    if(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findByPk(decoded.id);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newAccessToken = jwt.sign(
                { id: user.id, roleId: user.roleId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );
            res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);
            req.user = user;
            return next();
        } catch (err) {
            return res.status(401).json({ message: "Session expired, please login again" });
        }
    }
    
});