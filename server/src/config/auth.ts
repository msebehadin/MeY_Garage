import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
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

export default auth;
