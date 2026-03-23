"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.me = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const db_1 = require("../config/db");
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
const toAuthUser = (user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
});
const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
        const normalizedName = typeof name === "string" ? name.trim() : null;
        const requestedRole = typeof role === "string" && Object.values(client_1.Role).includes(role)
            ? role
            : client_1.Role.RECEPTIONIST;
        if (!normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password are required",
            });
        }
        const existingUser = await db_1.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "email already in use",
            });
        }
        const passwordHash = await (0, password_1.hashPassword)(password);
        const user = await db_1.prisma.user.create({
            data: {
                email: normalizedEmail,
                name: normalizedName,
                role: requestedRole,
                accounts: {
                    create: {
                        providerId: "credentials",
                        providerAccountId: normalizedEmail,
                        accountId: normalizedEmail,
                        password: passwordHash,
                    },
                },
            },
        });
        const token = (0, jwt_1.signAuthToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        res.cookie(jwt_1.AUTH_COOKIE_NAME, token, jwt_1.AUTH_COOKIE_OPTIONS);
        return res.status(201).json({
            success: true,
            token,
            user: toAuthUser(user),
        });
    }
    catch (error) {
        console.error("register failed", error);
        return res.status(500).json({
            success: false,
            message: "failed to register user",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;
        const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
        if (!normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password are required",
            });
        }
        const account = await db_1.prisma.account.findFirst({
            where: {
                providerId: "credentials",
                user: {
                    email: normalizedEmail,
                },
            },
            include: {
                user: true,
            },
        });
        const isValidPassword = await (0, password_1.verifyPassword)(password, account?.password);
        if (!account?.user || !isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "invalid email or password",
            });
        }
        const role = account.user.role || client_1.Role.RECEPTIONIST;
        const token = (0, jwt_1.signAuthToken)({
            id: account.user.id,
            email: account.user.email,
            role,
        });
        const cookieOptions = rememberMe
            ? jwt_1.AUTH_COOKIE_OPTIONS
            : { ...jwt_1.AUTH_COOKIE_OPTIONS, maxAge: undefined };
        res.cookie(jwt_1.AUTH_COOKIE_NAME, token, cookieOptions);
        return res.status(200).json({
            success: true,
            token,
            user: toAuthUser(account.user),
        });
    }
    catch (error) {
        console.error("login failed", error);
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
