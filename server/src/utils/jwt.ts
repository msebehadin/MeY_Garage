import crypto from "crypto";

type AuthTokenPayload = {
  id: string;
  email: string;
  role: string;
  exp?: number;
};

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret";
const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;

export const AUTH_COOKIE_NAME = "auth_token";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: JWT_EXPIRES_IN_SECONDS * 1000,
  path: "/",
};

const base64UrlEncode = (value: string | Buffer) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const base64UrlDecode = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (normalized.length % 4)) % 4;

  return Buffer.from(normalized + "=".repeat(padding), "base64").toString(
    "utf8"
  );
};

const createSignature = (value: string) =>
  base64UrlEncode(
    crypto.createHmac("sha256", JWT_SECRET).update(value).digest()
  );

export const signAuthToken = (payload: AuthTokenPayload) => {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN_SECONDS,
    })
  );
  const signature = createSignature(`${header}.${body}`);

  return `${header}.${body}.${signature}`;
};

export const verifyAuthToken = (token: string): AuthTokenPayload | null => {
  try {
    const [header, body, signature] = token.split(".");

    if (!header || !body || !signature) {
      return null;
    }

    const expectedSignature = createSignature(`${header}.${body}`);

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(body)) as AuthTokenPayload;

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
};

export const clearAuthCookie = () => ({
  ...AUTH_COOKIE_OPTIONS,
  maxAge: 0,
});
