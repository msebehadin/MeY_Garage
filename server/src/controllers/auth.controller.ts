import { Request, Response } from "express";
import { auth } from "../config/auth";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  clearAuthCookie,
  signAuthToken,
} from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
    });
    const role = result.user.role || "RECEPTIONIST";

    const token = signAuthToken({
      id: result.user.id,
      email: result.user.email,
      role,
    });

    res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

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
  } catch (error) {
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
