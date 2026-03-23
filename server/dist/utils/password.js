"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const SCRYPT_KEY_LENGTH = 64;
const scryptAsync = (password, salt) => new Promise((resolve, reject) => {
    crypto_1.default.scrypt(password, salt, SCRYPT_KEY_LENGTH, (error, derivedKey) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(derivedKey);
    });
});
const hashPassword = async (password) => {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const derivedKey = await scryptAsync(password, salt);
    return `${salt}:${derivedKey.toString("hex")}`;
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hashedPassword) => {
    if (!hashedPassword) {
        return false;
    }
    const [salt, storedHash] = hashedPassword.split(":");
    if (!salt || !storedHash) {
        return false;
    }
    const derivedKey = await scryptAsync(password, salt);
    const storedBuffer = Buffer.from(storedHash, "hex");
    if (storedBuffer.length !== derivedKey.length) {
        return false;
    }
    return crypto_1.default.timingSafeEqual(storedBuffer, derivedKey);
};
exports.verifyPassword = verifyPassword;
