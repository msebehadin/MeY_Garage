import { Request, Response } from "express";
import { Role } from "@prisma/client";
import { prisma } from "../config/db";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  clearAuthCookie,
  signAuthToken,
} from "../utils/jwt";
import { hashPassword, verifyPassword } from "../utils/password";

const toAuthUser = (user: {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const normalizedName = typeof name === "string" ? name.trim() : null;
    const requestedRole =
      typeof role === "string" && Object.values(Role).includes(role as Role)
        ? (role as Role)
        : Role.RECEPTIONIST;

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "email already in use",
      });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
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

    const token = signAuthToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

    return res.status(201).json({
      success: true,
      token,
      user: toAuthUser(user),
    });
  } catch (error) {
    console.error("register failed", error);

    return res.status(500).json({
      success: false,
      message: "failed to register user",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const account = await prisma.account.findFirst({
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

    const isValidPassword = await verifyPassword(password, account?.password);

    if (!account?.user || !isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const role = account.user.role || Role.RECEPTIONIST;

    const token = signAuthToken({
      id: account.user.id,
      email: account.user.email,
      role,
    });

    const cookieOptions = rememberMe
      ? AUTH_COOKIE_OPTIONS
      : { ...AUTH_COOKIE_OPTIONS, maxAge: undefined };

    res.cookie(AUTH_COOKIE_NAME, token, cookieOptions);

    return res.status(200).json({
      success: true,
      token,
      user: toAuthUser(account.user),
    });
  } catch (error) {
    console.error("login failed", error);

    return res.status(401).json({
      success: false,
      message: "invalid email or password",
    });
  }
};

export const me = async (req: Request, res: Response) => {
  const user = (req as any).user;

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

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie(AUTH_COOKIE_NAME, clearAuthCookie());

  return res.status(200).json({
    success: true,
    message: "logged out",
  });
};
