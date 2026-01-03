
import { auth } from "../src/config/auth"; 

// 1. Give the inferred types unique names so they don't collide
type AuthSession = typeof auth.$Infer.Session;
type AuthUser = typeof auth.$Infer.User;

declare module "better-auth" {
    // 2. This interface name MUST match the library's internal name
    // We are "augmenting" (adding to) the existing User interface
    interface User {
        role: "ADMIN" | "MANAGER" | "MECHANIC" | "RECEPTIONIST" | "CUSTOMER";
    }
}