"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMIddleware = void 0;
const jwt_1 = require("../utils/jwt");
const getCookieValue = (cookieHeader, key) => {
    if (!cookieHeader) {
        return undefined;
    }
    const cookie = cookieHeader
        .split(";")
        .map((entry) => entry.trim())
        .find((entry) => entry.startsWith(`${key}=`));
    return cookie?.slice(key.length + 1);
};
const authMIddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : undefined;
    const cookieToken = getCookieValue(req.headers.cookie, "auth_token");
    const token = bearerToken || cookieToken;
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    const user = (0, jwt_1.verifyAuthToken)(token);
    if (!user) {
        return res.status(401).json({ message: "unauthorized" });
    }
    req.user = user;
    next();
};
exports.authMIddleware = authMIddleware;
