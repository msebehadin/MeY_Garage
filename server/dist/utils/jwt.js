"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookie = exports.verifyAuthToken = exports.signAuthToken = exports.AUTH_COOKIE_OPTIONS = exports.AUTH_COOKIE_NAME = void 0;
const crypto_1 = __importDefault(require("crypto"));
const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret";
const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;
exports.AUTH_COOKIE_NAME = "auth_token";
exports.AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: JWT_EXPIRES_IN_SECONDS * 1000,
    path: "/",
};
const base64UrlEncode = (value) => Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
const base64UrlDecode = (value) => {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (normalized.length % 4)) % 4;
    return Buffer.from(normalized + "=".repeat(padding), "base64").toString("utf8");
};
const createSignature = (value) => base64UrlEncode(crypto_1.default.createHmac("sha256", JWT_SECRET).update(value).digest());
const signAuthToken = (payload) => {
    const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = base64UrlEncode(JSON.stringify({
        ...payload,
        exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN_SECONDS,
    }));
    const signature = createSignature(`${header}.${body}`);
    return `${header}.${body}.${signature}`;
};
exports.signAuthToken = signAuthToken;
const verifyAuthToken = (token) => {
    try {
        const [header, body, signature] = token.split(".");
        if (!header || !body || !signature) {
            return null;
        }
        const expectedSignature = createSignature(`${header}.${body}`);
        if (signature !== expectedSignature) {
            return null;
        }
        const payload = JSON.parse(base64UrlDecode(body));
        if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role,
            exp: payload.exp,
        };
    }
    catch {
        return null;
    }
};
exports.verifyAuthToken = verifyAuthToken;
const clearAuthCookie = () => ({
    ...exports.AUTH_COOKIE_OPTIONS,
    maxAge: 0,
});
exports.clearAuthCookie = clearAuthCookie;
