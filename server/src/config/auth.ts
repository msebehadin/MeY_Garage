import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

// System Design Reason: Use Prisma adapter instead of raw Pool connection.

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
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
