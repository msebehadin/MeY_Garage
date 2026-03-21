"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = exports.updateUserRole = exports.createUser = void 0;
const db_1 = require("../config/db");
const client_1 = require("@prisma/client");
const AppError_1 = require("../utils/AppError");
function toUserResponse(user) {
    return {
        id: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };
}
// create user
const createUser = async (data) => {
    // validation 
    if (!data.name.trim()) {
        throw new AppError_1.AppError('Name is required', 400);
    }
    // Enum validation before DB
    if (!Object.values(client_1.Role).includes(data.role)) {
        throw new AppError_1.AppError('invalid role', 400);
    }
    const existingUser = await db_1.prisma.user.findUnique({
        where: { email: data.email }
    });
    if (existingUser) {
        throw new AppError_1.AppError('email already in use', 409);
    }
    const user = await db_1.prisma.user.create({
        data
    });
    return toUserResponse(user);
};
exports.createUser = createUser;
const updateUserRole = async (userId, data, actorRole) => {
    if (actorRole !== client_1.Role.ADMIN) {
        throw new AppError_1.AppError('the role change only by Admin', 403);
    }
    if (!Object.values(client_1.Role).includes(data.role)) {
        throw new AppError_1.AppError('invalid role', 403);
    }
    const user = await db_1.prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new AppError_1.AppError('user not found', 404);
    }
    const updateUser = await db_1.prisma.user.update({
        where: { id: userId },
        data: { role: data.role }
    });
    return toUserResponse(updateUser);
};
exports.updateUserRole = updateUserRole;
const getUsers = async () => {
    return db_1.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });
};
exports.getUsers = getUsers;
const getUserById = async (userId) => {
    const user = await db_1.prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error('user not found');
    }
    return user;
};
exports.getUserById = getUserById;
