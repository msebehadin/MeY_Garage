"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateuserRole = exports.getAllUsers = void 0;
const UserService = __importStar(require("../services/user.service"));
const AppError_1 = require("../utils/AppError");
const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "faild to fetch user" });
    }
};
exports.getAllUsers = getAllUsers;
const updateuserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!id || !role) {
            return res.status(400).json({ success: false, message: 'both id and role are required' });
        }
        // System Design: This validation is MANDATORY - it prevents invalid enum values
        // from reaching the service layer. This is "fail fast" validation.
        if (!Object.values(role).includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'invalid role value'
            });
        }
        const actorRole = req.user?.role;
        if (!actorRole) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized:user not authenticated'
            });
        }
        const updateUSer = await UserService.updateUserRole(id, { role }, actorRole);
        res.status(200).json({
            success: true,
            message: 'user role update successfully',
            data: updateUSer
        });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }
        console.error('un');
    }
};
exports.updateuserRole = updateuserRole;
