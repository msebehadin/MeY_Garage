import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth";

export const authRoute = Router();

authRoute.all("/*", toNodeHandler(auth));