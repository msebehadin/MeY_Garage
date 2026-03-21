"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const db_1 = require("./db");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(db_1.prisma, {
        provider: "postgresql",
    }),
    user: {
        additionalFields: {
            role: {
                type: ["ADMIN", "MANAGER", "MECHANIC", "RECEPTIONIST"],
                required: false,
                defaultValue: 'RECEPTIONIST', // Matches Prisma Role enum default
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Disable for testing
        minPasswordLength: 1, // Set low for testing
    },
});
exports.default = exports.auth;
