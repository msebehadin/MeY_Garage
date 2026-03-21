"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.me = exports.login = void 0;
const auth_1 = require("../config/auth");
const jwt_1 = require("../utils/jwt");
const login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password are required",
            });
        }
        const result = await auth_1.auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe,
            },
        });
        const role = result.user.role || "RECEPTIONIST";
        const token = (0, jwt_1.signAuthToken)({
            id: result.user.id,
            email: result.user.email,
            role,
        });
        res.cookie(jwt_1.AUTH_COOKIE_NAME, token, jwt_1.AUTH_COOKIE_OPTIONS);
        return res.status(200).json({
            success: true,
            token,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                role,
            },
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "invalid email or password",
        });
    }
};
exports.login = login;
const me = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "unauthorized",
        });
    }
    return res.status(200).json({
        success: true,
        user,
    });
};
exports.me = me;
const logout = async (_req, res) => {
    res.clearCookie(jwt_1.AUTH_COOKIE_NAME, (0, jwt_1.clearAuthCookie)());
    return res.status(200).json({
        success: true,
        message: "logged out",
    });
};
exports.logout = logout;
